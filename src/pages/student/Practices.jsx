import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, FileText, LineChart as LineIcon, TrendingUp, ArrowRight } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { practices as practiceRows, scoresTrendData } from '../../mock/center'
import { practiceTests, testResults, studyTips } from '../../mock/practice'

export default function Practices() {
  const [selected, setSelected] = useState(null)

  const rows = useMemo(() => {
    return [...practiceRows].sort((a,b) => new Date(b.date) - new Date(a.date))
  }, [])

  const weakestSkill = useMemo(() => {
    if (!rows.length) return 'reading'
    const latest = rows[0].skills
    const entries = Object.entries(latest)
    entries.sort((a,b) => a[1] - b[1])
    return entries[0][0] // listening | reading | writing | speaking
  }, [rows])

  const recommended = useMemo(() => {
    const skillMap = {
      listening: 'listening', reading: 'reading', writing: 'writing', speaking: 'speaking'
    }
    const skill = skillMap[weakestSkill]
    const tests = practiceTests.filter(t => t.skill === skill && (t.status === 'available' || t.completed === false))
    const tips = studyTips.filter(s => s.skill === skill)
    return { tests, tips }
  }, [weakestSkill])

  const detail = useMemo(() => {
    if (!selected) return null
    const res = testResults.find(r => r.testId === selected.id)
    return res || null
  }, [selected])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Practices</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Review your practice history, scores by skill, and feedback.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <TrendingUp className="w-4 h-4" /> Weakest skill: <span className="font-semibold capitalize text-gray-900 dark:text-white">{weakestSkill}</span>
        </div>
      </div>

      {/* Practices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Practices</h2>
          <BarChart3 className="w-5 h-5 text-gray-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Overall</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Listening</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reading</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Writing</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Speaking</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map(p => (
                <tr key={p.id}>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{p.date}</td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">{p.overallScore}%</td>
                  <td className="px-4 py-2 text-sm">{p.skills.listening}%</td>
                  <td className="px-4 py-2 text-sm">{p.skills.reading}%</td>
                  <td className="px-4 py-2 text-sm">{p.skills.writing}%</td>
                  <td className="px-4 py-2 text-sm">{p.skills.speaking}%</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => setSelected(p)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-brand text-white hover:opacity-90"
                    >
                      <FileText className="w-4 h-4" /> View Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Practice #{selected.id} — {selected.date}</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >Close</button>
            </div>
            {detail ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Feedback</div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
                    <li><span className="font-medium">Strengths:</span> {detail.feedback.strengths.join(', ')}</li>
                    <li><span className="font-medium">Improvements:</span> {detail.feedback.improvements.join(', ')}</li>
                    <li><span className="font-medium">Next Steps:</span> {detail.feedback.nextSteps.join(', ')}</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Answers</div>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {detail.answers.map(a => (
                      <div key={a.questionId} className="flex items-center justify-between">
                        <span>Question {a.questionId}</span>
                        <span className={a.correct ? 'text-green-600' : 'text-red-600'}>{a.correct ? 'Correct' : 'Wrong'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-700 dark:text-gray-300">
                No detailed results available. Try a full mock test to get AI feedback.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Score Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Score Trend</h2>
          <LineIcon className="w-5 h-5 text-gray-500" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoresTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={false} name="Overall" />
              <Line type="monotone" dataKey="listening" stroke="#0ea5e9" strokeWidth={1.5} dot={false} name="Listening" />
              <Line type="monotone" dataKey="reading" stroke="#22c55e" strokeWidth={1.5} dot={false} name="Reading" />
              <Line type="monotone" dataKey="writing" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Writing" />
              <Line type="monotone" dataKey="speaking" stroke="#ef4444" strokeWidth={1.5} dot={false} name="Speaking" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommended Practices */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Practices</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recommended.tests.slice(0,3).map(t => (
            <div key={t.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="font-medium text-gray-900 dark:text-white">{t.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.description}</div>
              <div className="mt-3">
                <Link to="/placement-test" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-brand text-white hover:opacity-90">
                  Practice now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
          {recommended.tips.slice(0,2).map(t => (
            <div key={t.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="font-medium text-gray-900 dark:text-white">{t.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.description}</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {t.tips.slice(0,3).map((tip,idx) => (<li key={idx}>{tip}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}