import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const mockQuestions = [
  {
    id: 1,
    type: 'Speaking',
    question: 'Which of the following best describes the main purpose of academic writing?',
    options: [
      'To entertain readers with creative stories',
      'To present research findings and arguments clearly',
      'To sell products or services',
      'To express personal emotions'
    ],
    correct: 1
  },
  {
    id: 2,
    type: 'Reading',
    question: 'In the sentence "The research methodology was comprehensive and rigorous," what does "rigorous" mean?',
    options: [
      'Simple and easy',
      'Thorough and strict',
      'Quick and efficient',
      'Creative and flexible'
    ],
    correct: 1
  },
  {
    id: 3,
    type: 'Speaking',
    question: 'What is the most appropriate way to conclude a formal presentation?',
    options: [
      'Thank you for listening, any questions?',
      'That\'s all folks!',
      'I\'m done now',
      'See you later'
    ],
    correct: 0
  },
  {
    id: 4,
    type: 'Reading',
    question: 'Which transition word best shows contrast between two ideas?',
    options: [
      'Furthermore',
      'Similarly',
      'However',
      'Therefore'
    ],
    correct: 2
  },
  {
    id: 5,
    type: 'Speaking',
    question: 'In academic discussions, which phrase is most appropriate for disagreeing politely?',
    options: [
      'You\'re wrong about that',
      'I see your point, but I think...',
      'That\'s stupid',
      'No way!'
    ],
    correct: 1
  }
]

export default function PlacementTest() {
  const [step, setStep] = useState(1) // 1: Intro, 2: Questions, 3: Result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const calculateScore = () => {
    let correct = 0
    mockQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correct++
      }
    })
    return Math.round((correct / mockQuestions.length) * 90)
  }

  const handleStart = () => {
    setStep(2)
  }

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex })
  }

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep(3)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const score = showResult ? calculateScore() : 0
  const getRecommendation = (score) => {
    if (score >= 75) return 'Advanced Speaking Course'
    if (score >= 50) return 'Intermediate Speaking Course'
    return 'Foundation Speaking Course'
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 mt-10">
      {/* Step 1: Intro */}
      {step === 1 && (
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
            <CheckCircle className="h-10 w-10 text-brand" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Free PTE Placement Test
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover your current English proficiency level with our comprehensive placement test. 
            Get personalized course recommendations based on your results.
          </p>
          
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <Clock className="mx-auto mb-3 h-8 w-8 text-brand" />
              <h3 className="font-semibold text-gray-900 dark:text-white">5 Minutes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quick assessment</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <Users className="mx-auto mb-3 h-8 w-8 text-brand" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Speaking & Reading</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Core skills focus</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <CheckCircle className="mx-auto mb-3 h-8 w-8 text-brand" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Instant Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get immediate feedback</p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
          >
            Start Test
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Step 2: Questions */}
      {step === 2 && (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Placement Test
              </h1>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-2 rounded-full bg-brand transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                {mockQuestions[currentQuestion].type}
              </span>
            </div>
            
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              {mockQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full rounded-lg border p-4 text-left transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-brand bg-brand/5 text-brand'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              className="rounded-lg bg-brand px-6 py-2 font-medium text-white hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === mockQuestions.length - 1 ? 'Finish Test' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 3 && (
        <div className="text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Test Complete!
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Here are your results and personalized recommendations
          </p>

          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6">
              <div className="text-4xl font-bold text-brand">{score}/90</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Your PTE Score</div>
            </div>

            <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-900/50">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Recommended Course
              </h3>
              <p className="text-lg font-medium text-brand">
                {getRecommendation(score)}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Based on your performance, this course will help you improve your speaking and reading skills effectively.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">Speaking</h4>
                <div className="mt-2 text-2xl font-bold text-brand">
                  {Math.round(score * 0.6)}/90
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">Reading</h4>
                <div className="mt-2 text-2xl font-bold text-brand">
                  {Math.round(score * 0.8)}/90
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
            >
              Upgrade Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}