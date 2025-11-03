import React, { useState } from 'react'
import {
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Crown,
  Target,
  TrendingUp,
  BookOpen,
  Headphones,
  FileText,
} from 'lucide-react'
import { pteExamCenters, examPricing, apeUniServices, registrationForm, serviceStats } from '../../mock/services'
import toast from 'react-hot-toast'

/** helper: always map safely */
const arr = (v) => (Array.isArray(v) ? v : [])

/** derive pricing safely from nested objects */
const stdPrice = Number(examPricing?.standard?.price ?? 0)
const discPrice = Number(examPricing?.discount?.price ?? stdPrice)
const currency = examPricing?.standard?.currency ?? examPricing?.discount?.currency ?? 'USD'

const Services = () => {
  const [activeTab, setActiveTab] = useState('pte-registration')
  const [selectedCenter, setSelectedCenter] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    address: '',
    city: '',
    postalCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialRequirements: ''
  })

  // ⬇️ Khởi tạo dựa trên mock (status: "granted")
  const [premiumGranted, setPremiumGranted] = useState(apeUniServices?.premium?.status === 'granted')
  const [discountApplied, setDiscountApplied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePTERegistration = (e) => {
    e.preventDefault()
    if (!selectedCenter || !selectedDate || !selectedTime) {
      toast.error('Please select exam center, date, and time')
      return
    }
    setDiscountApplied(true)
    toast.success('PTE Exam registration submitted! Discount applied successfully.')
  }

  const handleAPEUniAccess = () => {
    setPremiumGranted(true)
    toast.success('APEUni Premium access granted! Welcome to premium features.')
  }

  /** ⬇️ Build lại stats để khớp mock: serviceStats has examRegistrations & apeUniAccess */
  const pteStats = [
    { label: 'Total Registrations', value: serviceStats?.examRegistrations?.total ?? 0 },
    { label: 'This Month', value: serviceStats?.examRegistrations?.thisMonth ?? 0 },
    { label: 'Success Rate', value: `${serviceStats?.examRegistrations?.successRate ?? 0}%` },
    { label: 'APEUni Active Users', value: serviceStats?.apeUniAccess?.activeUsers ?? 0 },
  ]

  const renderPTERegistration = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          PTE Academic Exam Registration
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Register for your PTE Academic exam with our partner centers. Get exclusive discounts and priority booking.
        </p>
      </div>

      {/* Stats (fixed) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {arr(pteStats).map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Exam Centers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Select Exam Center
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {arr(pteExamCenters).map((center) => (
            <div
              key={center.id}
              onClick={() => setSelectedCenter(center.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCenter === center.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{center.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{center.address}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                {arr(center.availableDates).length} dates available
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date & Time Selection */}
      {selectedCenter && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Select Date & Time
          </h3>

          {/* Available Dates */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Available Dates</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {arr(pteExamCenters.find(c => c.id === selectedCenter)?.availableDates).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedDate === date
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Available Times */}
          {selectedDate && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Available Times</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {arr(pteExamCenters.find(c => c.id === selectedCenter)?.timeSlots).map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Registration Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Registration Details
        </h3>

        <form onSubmit={handlePTERegistration} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'firstName', label: 'First Name *', type: 'text' },
                { name: 'lastName', label: 'Last Name *', type: 'text' },
                { name: 'email', label: 'Email *', type: 'email' },
                { name: 'phone', label: 'Phone *', type: 'tel' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={(formData)[f.name]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing (fixed for nested structure) */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Exam Fee</h4>
              {discountApplied && (
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  Discount Applied!
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Standard Fee</span>
                <span className={`${discountApplied ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white font-semibold'}`}>
                  {currency} {stdPrice}
                </span>
              </div>

              {discountApplied && (
                <div className="flex justify-between items-center">
                  <span className="text-green-600 dark:text-green-400">Discounted Fee</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {currency} {discPrice}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>You save</span>
                <span>
                  {currency} {Math.max(0, stdPrice - discPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Register for PTE Exam
          </button>
        </form>
      </div>
    </div>
  )

  const renderAPEUniPremium = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="w-8 h-8 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            APEUni Premium Access
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Unlock premium features and accelerate your PTE preparation with exclusive content and tools.
        </p>
      </div>

      {/* Premium Status */}
      {premiumGranted && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Premium Access Granted!
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Congratulations! You now have access to all premium features. Start exploring advanced practice tests, AI scoring, and personalized study plans.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Access Premium Dashboard
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
              Download Premium App
            </button>
          </div>
        </div>
      )}

      {/* Features Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Free Plan — dùng benefits trong mock */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Plan</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$0</div>
            <p className="text-gray-600 dark:text-gray-400">Basic features for getting started</p>
          </div>
          <ul className="space-y-3 mb-6">
            {arr(apeUniServices?.benefits).map((b, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  <b>{b.title}</b> — {b.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Plan — dùng premium.features trong mock */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-700 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Premium Plan
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ${apeUniServices?.premium?.originalPrice ?? 29}
              <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Advanced features for serious learners</p>
          </div>

          <ul className="space-y-3 mb-6">
            {arr(apeUniServices?.premium?.features).map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          {!premiumGranted && (
            <button
              onClick={handleAPEUniAccess}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Get Premium Access
            </button>
          )}
        </div>
      </div>

      {/* Premium Benefits (giữ khối minh hoạ) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          Why Choose Premium?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: 'AI-Powered Scoring',
              description: 'Get instant, accurate scores with detailed feedback on your performance.'
            },
            {
              icon: TrendingUp,
              title: 'Progress Tracking',
              description: 'Monitor your improvement with detailed analytics and performance insights.'
            },
            {
              icon: BookOpen,
              title: 'Unlimited Practice',
              description: 'Access thousands of practice questions and full-length mock tests.'
            },
            {
              icon: Headphones,
              title: 'Expert Support',
              description: '24/7 support from PTE experts and personalized study guidance.'
            }
          ].map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Services</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Register for PTE exams and unlock premium learning features
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-8">
          {[
            { key: 'pte-registration', label: 'PTE Registration', icon: Calendar },
            { key: 'apeuni-premium', label: 'APEUni Premium', icon: Crown }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors font-medium ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'pte-registration' && renderPTERegistration()}
        {activeTab === 'apeuni-premium' && renderAPEUniPremium()}
      </div>
    </div>
  )
}

export default Services