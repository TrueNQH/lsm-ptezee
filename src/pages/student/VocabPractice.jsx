import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

// Reuse a small in-file dictionary as fallback for MCQ distractors
const dictionary = {
  grammar: { definition: 'The set of rules for words and sentences' },
  present: { definition: 'Existing or happening now' },
  vocabulary: { definition: 'All the words of a language' },
  advanced: { definition: 'Far on or ahead in development' },
}

const STORAGE_KEY = 'dla_saved_words'
const AI_CACHE_KEY = 'dla_ai_quiz_cache_v1'

export default function VocabPractice() {
  const location = useLocation()
  const [savedWords, setSavedWords] = useState([])
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiGenerated, setAiGenerated] = useState(false)
  const [answers, setAnswers] = useState([])
  const [canUseCachedAi, setCanUseCachedAi] = useState(false)
  const [cachedAiQuestions, setCachedAiQuestions] = useState([])

  // Ưu tiên nhận dữ liệu từ route state nếu có, sau đó fallback localStorage
  useEffect(() => {
    const routeWords = location.state?.words
    if (Array.isArray(routeWords) && routeWords.length > 0) {
      setSavedWords(routeWords)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(routeWords))
      } catch {}
      return
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const list = raw ? JSON.parse(raw) : []
      setSavedWords(Array.isArray(list) ? list : [])
    } catch {
      setSavedWords([])
    }
  }, [location.state])

  // Kiểm tra cache AI khi savedWords sẵn sàng
  useEffect(() => {
    try {
      const payload = savedWords.map(w => ({
        word: w.word,
        definition: w.definition || '',
        examples: Array.isArray(w.examples) ? w.examples : [],
      }))
      const signature = JSON.stringify(payload)
      const raw = localStorage.getItem(AI_CACHE_KEY)
      const cached = raw ? JSON.parse(raw) : null
      if (cached && typeof cached.signature === 'string' && Array.isArray(cached.questions)) {
        setCanUseCachedAi(cached.signature === signature && cached.questions.length > 0)
        setCachedAiQuestions(cached.questions)
      } else {
        setCanUseCachedAi(false)
        setCachedAiQuestions([])
      }
    } catch {
      setCanUseCachedAi(false)
      setCachedAiQuestions([])
    }
  }, [savedWords])

  const shuffle = (arr) => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  const makeQuestions = useMemo(() => {
    const qs = []
    const poolDefs = Object.values(dictionary).map(d => d.definition)
    const allWords = savedWords.map(sw => (sw.word || '').toLowerCase()).filter(Boolean)
    const otherWords = (word) => allWords.filter(w => w !== (word || '').toLowerCase())
    const getOtherWordExamples = () => savedWords.flatMap(sw => Array.isArray(sw.examples) ? sw.examples : [])

    savedWords.forEach((w) => {
      const key = (w.word || '').toLowerCase()
      const def = w.definition || dictionary[key]?.definition

      // 1) Trắc nghiệm nghĩa (definition_mcq) — ưu tiên
      if (def) {
        const distractors = shuffle([
          ...poolDefs.filter(d => d !== def),
          ...savedWords
            .map(sw => sw.definition)
            .filter(Boolean)
            .filter(d => d !== def),
        ]).slice(0, 3)
        const options = shuffle([def, ...distractors])
        qs.push({
          id: `${key}-def-${Math.random()}`,
          type: 'definition_mcq',
          word: w.word,
          prompt: `Chọn nghĩa đúng của "${w.word}"`,
          options,
          correctIndex: options.indexOf(def),
        })
      }

      // 2) Trắc nghiệm đảo ngược: cho nghĩa, chọn từ đúng (reverse_mcq)
      if (def && otherWords(w.word).length >= 3) {
        const distractorWords = shuffle(otherWords(w.word)).slice(0, 3)
        const options = shuffle([w.word, ...distractorWords])
        qs.push({
          id: `${key}-rev-${Math.random()}`,
          type: 'reverse_mcq',
          word: w.word,
          prompt: `Chọn từ phù hợp với nghĩa: "${def}"`,
          options,
          correctIndex: options.indexOf(w.word),
        })
      }

      // 3) Trắc nghiệm ví dụ: chọn câu ví dụ phù hợp với từ (example_mcq)
      const examples = Array.isArray(w.examples) ? w.examples.filter(Boolean) : []
      if (examples.length > 0) {
        const correctExample = examples[0]
        const distractorExamples = shuffle(getOtherWordExamples().filter(ex => ex !== correctExample)).slice(0, 3)
        if (distractorExamples.length === 3) {
          const options = shuffle([correctExample, ...distractorExamples])
          qs.push({
            id: `${key}-ex-${Math.random()}`,
            type: 'example_mcq',
            word: w.word,
            prompt: `Chọn câu ví dụ phù hợp với từ "${w.word}"`,
            options,
            correctIndex: options.indexOf(correctExample),
          })
        }
      }

      // 4) Trắc nghiệm loại từ (pos_mcq) nếu có dữ liệu partOfSpeech
      const pos = (w.partOfSpeech || '').toLowerCase()
      const posOptionsBase = ['noun', 'verb', 'adjective', 'adverb']
      if (pos && posOptionsBase.includes(pos)) {
        const distractors = shuffle(posOptionsBase.filter(p => p !== pos)).slice(0, 3)
        const options = shuffle([pos, ...distractors]).map(p => {
          // Việt hoá nhãn loại từ
          const map = { noun: 'Danh từ', verb: 'Động từ', adjective: 'Tính từ', adverb: 'Trạng từ' }
          return map[p] || p
        })
        const correctLabel = ({ noun: 'Danh từ', verb: 'Động từ', adjective: 'Tính từ', adverb: 'Trạng từ' })[pos]
        qs.push({
          id: `${key}-pos-${Math.random()}`,
          type: 'pos_mcq',
          word: w.word,
          prompt: `Chọn loại từ đúng của "${w.word}"`,
          options,
          correctIndex: options.indexOf(correctLabel),
        })
      }

      // Nếu không có dữ liệu nào để tạo MCQ, fallback tự luận
      if (!def && (!Array.isArray(w.examples) || w.examples.length === 0)) {
        qs.push({
          id: `${key}-free-${Math.random()}`,
          type: 'freeform',
          word: w.word,
          prompt: `Viết một câu có chứa từ "${w.word}"`,
        })
      }
    })
    return qs
  }, [savedWords])

  const start = () => {
    if (makeQuestions.length === 0) {
      toast.error('Chưa có từ vựng được lưu để luyện tập.')
      return
    }
    setQuestions(makeQuestions)
    setIndex(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
    setStarted(true)
    setAiGenerated(false)
    setAnswers([])
  }

  const generateAiQuiz = async () => {
    setAiError('')
    if (!savedWords || savedWords.length === 0) {
      toast.error('Chưa có từ vựng để tạo đề bằng AI.')
      return
    }
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'
    if (!apiKey) {
      toast.error('Chưa cấu hình VITE_OPENAI_API_KEY')
      return
    }
    setAiLoading(true)
    try {
      const payload = savedWords.map(w => ({
        word: w.word,
        definition: w.definition || '',
        examples: Array.isArray(w.examples) ? w.examples : [],
      }))
      const systemPrompt = [
        'Bạn là trợ lý tạo đề ôn tập từ vựng tiếng Anh cho người học tiếng Việt.',
        'Chỉ trả về một JSON duy nhất, KHÔNG thêm giải thích, KHÔNG markdown, KHÔNG text ngoài JSON.',
        'Dạng JSON: { "questions": Question[] } với Question có dạng:',
        '{ id: string, type: "definition_mcq" | "reverse_mcq" | "example_mcq" | "pos_mcq" | "freeform", word: string, prompt: string, options?: string[], correctIndex?: number }.',
        'Quy định bắt buộc:',
        '- Với mỗi từ/cụm trong đầu vào, tạo MỘT câu hỏi.',
        '- ƯU TIÊN các loại trắc nghiệm: "definition_mcq" (chọn nghĩa đúng), "reverse_mcq" (cho nghĩa, chọn từ), "example_mcq" (chọn câu ví dụ phù hợp), "pos_mcq" (chọn loại từ). Chỉ dùng "freeform" khi KHÔNG có dữ liệu để tạo trắc nghiệm.',
        '- Với câu trắc nghiệm: options phải có CHÍNH XÁC 4 lựa chọn, 1 đáp án đúng; correctIndex là số 0..3 trỏ tới đáp án đúng.',
        '- ĐẶC BIỆT cho "reverse_mcq": prompt dạng "Chọn từ phù hợp với nghĩa: \"<nghĩa>\""; options PHẢI là CHÍNH CÁC TỪ/CỤM trong đầu vào (nguyên dạng, KHÔNG dịch), và đáp án đúng là chính "word" tương ứng với nghĩa đã cho.',
        '- Với các loại khác, nếu có nghĩa/giải thích thì dùng Tiếng Việt cho prompt và options. Với reverse_mcq tuyệt đối KHÔNG dùng nghĩa/tiếng Việt làm options.',
        '- prompt phải bằng Tiếng Việt, rõ ràng, ví dụ: "Chọn nghĩa đúng của \"<từ/cụm>\"" hoặc "Chọn từ phù hợp với nghĩa: \"<nghĩa>\"".',
        '- word là nguyên văn từ/cụm đầu vào. KHÔNG thêm, KHÔNG tự tạo từ mới.',
        '- Không sắp xếp lại thứ tự các câu, giữ nguyên thứ tự theo đầu vào.',
      ].join('\n')
      const userPrompt = [
        'Tạo bài ôn tập trắc nghiệm đa dạng cho các từ/cụm sau: ưu tiên "definition_mcq"; có thể dùng "reverse_mcq", "example_mcq" hoặc "pos_mcq" nếu phù hợp dữ liệu. Chỉ dùng "freeform" khi không thể tạo trắc nghiệm.',
        'YÊU CẦU CHẶT CHẼ cho reverse_mcq: options phải là CHÍNH CÁC TỪ/CỤM trong đầu vào, không dịch; đáp án đúng là "word" tương ứng.',
        'Nếu là cụm từ, vẫn tạo câu hỏi trắc nghiệm bằng Tiếng Việt. Mỗi từ/cụm tạo MỘT câu hỏi.',
        'Đầu vào (giữ nguyên thứ tự):',
        JSON.stringify(payload),
      ].join('\n')

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          // Hint to return valid JSON; not all models strictly enforce this.
          response_format: { type: 'json_object' },
        }),
      })
      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText)
      }
      const data = await res.json()
      const content = data?.choices?.[0]?.message?.content?.trim() || ''
      let parsed
      console.log(content)

      try {
        parsed = JSON.parse(content)
      } catch {
        // If model returned plain text with JSON inside, try to extract
        const start = content.indexOf('{')
        const end = content.lastIndexOf('}')
        if (start >= 0 && end >= start) {
          parsed = JSON.parse(content.slice(start, end + 1))
        } else {
          throw new Error('Không thể phân tích JSON từ phản hồi AI')
        }
      }
      const aiQuestions = Array.isArray(parsed?.questions)
        ? parsed.questions
        : Array.isArray(parsed)
          ? parsed
          : []
      if (aiQuestions.length === 0) {
        throw new Error('AI không tạo được câu hỏi hợp lệ')
      }
      // Bản đồ hỗ trợ chuẩn hoá reverse_mcq: mapping definition -> word, và tập các từ đầu vào
      const inputWordsSet = new Set(payload.map(p => (p.word || '').toLowerCase()))
      const defToWord = new Map(
        payload
          .filter(p => (p.definition || '').trim())
          .map(p => [p.definition.trim(), p.word])
      )

      const normalizeReverseOptions = (optsRaw, wordRaw) => {
        const opts = Array.isArray(optsRaw) ? optsRaw.slice(0, 4) : []
        const word = (wordRaw || '').toLowerCase()
        // Nếu options đã chứa từ đầu vào, giữ nguyên
        const hasInputWord = opts.some(o => inputWordsSet.has((o || '').toLowerCase()))
        if (hasInputWord) return opts
        // Nếu options là nghĩa tiếng Việt trùng với định nghĩa trong payload, map về từ gốc
        const mapped = opts.map(o => defToWord.get((o || '').trim()) || o)
        return mapped
      }

      const normalized = aiQuestions.map((q, i) => {
        const opts = Array.isArray(q.options) ? q.options.slice(0, 4) : []
        const hasMcq = opts.length > 0 && typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < opts.length
        const allowedTypes = ['definition_mcq','reverse_mcq','example_mcq','pos_mcq']
        const type = hasMcq ? (allowedTypes.includes(q.type) ? q.type : 'definition_mcq') : 'freeform'
        const word = q.word || (typeof q.term === 'string' ? q.term : '')
        if (type === 'reverse_mcq') {
          const fixedOpts = normalizeReverseOptions(opts, word)
          const fixedCorrectIndex = fixedOpts.findIndex(o => (o || '').toLowerCase() === (word || '').toLowerCase())
          // Nếu sau chuẩn hoá vẫn không tìm thấy từ đúng, rơi về freeform
          if (fixedCorrectIndex < 0) {
            return {
              id: q.id || `ai-${i}-${Math.random()}`,
              type: 'freeform',
              prompt: q.prompt || 'Viết một câu có chứa từ',
              word,
              options: [],
              correctIndex: -1,
            }
          }
          return {
            id: q.id || `ai-${i}-${Math.random()}`,
            type: 'reverse_mcq',
            prompt: q.prompt || 'Chọn từ phù hợp với nghĩa',
            word,
            options: fixedOpts,
            correctIndex: fixedCorrectIndex,
          }
        }
        return {
          id: q.id || `ai-${i}-${Math.random()}`,
          type,
          prompt: q.prompt || 'Câu hỏi',
          word,
          options: opts,
          correctIndex: hasMcq ? q.correctIndex : -1,
        }
      })
      setQuestions(normalized)
      setIndex(0)
      setScore(0)
      setSelected(null)
      setFinished(false)
      setStarted(true)
      setAiGenerated(true)
      setAnswers([])
      toast.success('Đã tạo đề trắc nghiệm bằng AI!')

      // Lưu cache đề AI theo chữ ký nguồn
      try {
        const payloadForSig = savedWords.map(w => ({
          word: w.word,
          definition: w.definition || '',
          examples: Array.isArray(w.examples) ? w.examples : [],
        }))
        const signature = JSON.stringify(payloadForSig)
        const cache = { signature, questions: normalized, createdAt: Date.now() }
        localStorage.setItem(AI_CACHE_KEY, JSON.stringify(cache))
        setCanUseCachedAi(true)
        setCachedAiQuestions(normalized)
      } catch {}
    } catch (e) {
      setAiError(e.message || 'Lỗi không xác định')
      toast.error('Không thể tạo đề bằng AI, dùng chế độ thường.')
      // fallback to local generator
      start()
    } finally {
      setAiLoading(false)
    }
  }

  const startCachedAi = () => {
    if (!canUseCachedAi || !cachedAiQuestions || cachedAiQuestions.length === 0) {
      toast.error('Chưa có đề AI đã lưu phù hợp danh sách từ hiện tại.')
      return
    }
    setQuestions(cachedAiQuestions)
    setIndex(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
    setStarted(true)
    setAiGenerated(true)
    setAnswers([])
    toast.success('Đã tải đề AI đã lưu!')
  }

  const submit = () => {
    const q = questions[index]
    if (!q) return
    const isMcq = Array.isArray(q.options) && q.options.length > 0 && typeof q.correctIndex === 'number' && q.correctIndex >= 0
    if (isMcq) {
      if (selected === null) {
        toast.error('Hãy chọn một đáp án')
        return
      }
      const isCorrect = selected === q.correctIndex
      setAnswers(prev => [
        ...prev,
        {
          id: q.id,
          selected,
          correctIndex: q.correctIndex,
          correct: isCorrect,
          prompt: q.prompt,
          word: q.word,
          options: q.options,
          type: q.type,
        },
      ])
      if (selected === q.correctIndex) {
        setScore(s => s + 1)
        toast.success('Chính xác!')
      } else {
        toast.error('Sai rồi, tiếp tục nào!')
      }
    } else {
      toast.success('Đã ghi nhận câu trả lời!')
      setAnswers(prev => [
        ...prev,
        {
          id: q.id,
          selected: null,
          correctIndex: -1,
          correct: true,
          prompt: q.prompt,
          word: q.word,
          options: [],
          type: q.type,
        },
      ])
    }
    const next = index + 1
    if (next >= questions.length) {
      setFinished(true)
      setStarted(false)
    } else {
      setIndex(next)
      setSelected(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-2">Luyện tập từ vựng</h1>
      <p className="text-sm text-gray-600 mb-4">Nguồn dữ liệu: Từ vựng đã lưu từ các bài học.</p>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-700">Từ đã lưu: {savedWords.length}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={start}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            Bắt đầu (thường)
          </button>
          <button
            onClick={startCachedAi}
            disabled={!canUseCachedAi}
            className={`px-3 py-1.5 text-white text-sm rounded ${canUseCachedAi ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Bắt đầu (AI đã lưu)
          </button>
          <button
            onClick={generateAiQuiz}
            disabled={aiLoading || savedWords.length === 0}
            className={`px-3 py-1.5 text-white text-sm rounded ${aiLoading || savedWords.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {aiLoading ? 'Đang tạo…' : 'Tạo đề bằng AI'}
          </button>
        </div>
        </div>

        {aiError && (
          <div className="mb-3 p-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>Lỗi AI: {aiError}</span>
          </div>
        )}

        {started && questions.length > 0 && (
          <div className="mb-3 flex items-center justify-between">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${aiGenerated ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
              Nguồn: {aiGenerated ? 'AI' : 'Thường'}
            </div>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${Math.round(((index) / questions.length) * 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-1 text-right">Tiến độ: {index}/{questions.length}</div>
            </div>
          </div>
        )}

        {started && questions[index] && (
          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="text-xs text-gray-600 mb-1">Câu {index + 1}/{questions.length}</div>
            <div className="flex items-center gap-2 mb-2">
              {questions[index].word && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">Từ: {questions[index].word}</span>
              )}
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">{(Array.isArray(questions[index].options) && questions[index].options.length > 0 && typeof questions[index].correctIndex === 'number' && questions[index].correctIndex >= 0) ? 'Trắc nghiệm' : 'Tự luận'}</span>
            </div>
            <p className="font-medium text-gray-800 mb-3">{questions[index].prompt}</p>
            {(Array.isArray(questions[index].options) && questions[index].options.length > 0 && typeof questions[index].correctIndex === 'number' && questions[index].correctIndex >= 0) ? (
              <div className="space-y-2">
                {questions[index].options.map((opt, i) => {
                  const isSelected = selected === i
                  return (
                    <label
                      key={i}
                      className={`flex items-center gap-2 p-2 bg-white border rounded cursor-pointer transition-all ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'hover:border-blue-300'}`}
                    >
                      <input
                        type="radio"
                        name="practice"
                        className="accent-blue-600"
                        checked={isSelected}
                        onChange={() => setSelected(i)}
                      />
                      <span className="text-sm text-gray-800">{opt}</span>
                    </label>
                  )
                })}
              </div>
            ) : (
              <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Nhập câu của bạn..." />
            )}
            <div className="flex justify-end mt-3">
              <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Gửi đáp án</button>
            </div>
          </div>
        )}

            {finished && (
              <div className="mt-3 p-4 border rounded bg-green-50 border-green-200">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Hoàn thành bài luyện tập!
                </div>
                <p className="text-sm text-green-800 mt-1">Điểm: {score}/{questions.length}</p>
                {answers.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Xem lại câu hỏi</h3>
                    <div className="space-y-2">
                      {answers.map((a, i) => (
                        <div key={i} className="p-2 bg-white border rounded">
                          <div className="text-xs text-gray-600">Câu {i + 1}: {(Array.isArray(a.options) && a.options.length > 0 && typeof a.correctIndex === 'number' && a.correctIndex >= 0) ? 'Trắc nghiệm' : 'Tự luận'}</div>
                          <div className="text-sm font-medium text-gray-800">{a.prompt}</div>
                          {(Array.isArray(a.options) && a.options.length > 0 && typeof a.correctIndex === 'number' && a.correctIndex >= 0) && (
                            <div className="mt-1 text-sm">
                              <span className="mr-2">Đáp án đúng:</span>
                              <span className="font-semibold text-green-700">{a.options[a.correctIndex]}</span>
                              {typeof a.selected === 'number' && (
                                <span className="ml-4">Bạn chọn: <span className={`font-semibold ${a.correct ? 'text-green-700' : 'text-red-700'}`}>{a.options[a.selected]}</span></span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

        {!started && !finished && (
          <div className="text-xs text-gray-500">Nhấn "Bắt đầu" để tạo bài luyện tập từ danh sách từ đã lưu.</div>
        )}
      </div>
    </div>
  )
}