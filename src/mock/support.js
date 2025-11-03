// Mock data for support

export const faqData = [
  {
    id: 1,
    category: "General",
    question: "What is PTE Academic?",
    answer: "PTE Academic is a computer-based English language test trusted by universities, colleges and governments around the world. It tests Reading, Writing, Listening and Speaking in a single 3-hour test session."
  },
  {
    id: 2,
    category: "General", 
    question: "How long is the PTE Academic test?",
    answer: "The PTE Academic test takes approximately 3 hours to complete, including optional breaks. The test is divided into three main parts: Speaking & Writing (77-93 minutes), Reading (32-41 minutes), and Listening (45-57 minutes)."
  },
  {
    id: 3,
    category: "Registration",
    question: "How do I register for the PTE Academic test?",
    answer: "You can register for PTE Academic through our Services page. Select your preferred test center, date, and time slot. Complete the registration form with your personal details and make payment to confirm your booking."
  },
  {
    id: 4,
    category: "Registration",
    question: "What documents do I need for registration?",
    answer: "You need a valid passport that will not expire before your test date. The name on your passport must exactly match the name you use when registering for the test."
  },
  {
    id: 5,
    category: "Registration",
    question: "Can I reschedule or cancel my test?",
    answer: "Yes, you can reschedule or cancel your test up to 24 hours before your scheduled test time. Rescheduling fees may apply. Cancellations made more than 14 days in advance are eligible for a full refund."
  },
  {
    id: 6,
    category: "Test Preparation",
    question: "How should I prepare for the PTE Academic test?",
    answer: "Use our comprehensive study materials including practice tests, mock questions, and skill-specific exercises. We recommend taking at least 2-3 practice tests to familiarize yourself with the test format and timing."
  },
  {
    id: 7,
    category: "Test Preparation",
    question: "What is the difference between Mini, Progress, and Final tests?",
    answer: "Mini tests (15-20 minutes) focus on specific skills, Progress tests (45-60 minutes) cover multiple skills to track improvement, and Final tests (3 hours) simulate the complete PTE Academic experience."
  },
  {
    id: 8,
    category: "Test Preparation",
    question: "How accurate are the practice test scores?",
    answer: "Our practice tests use the same scoring algorithms as the actual PTE Academic test, providing highly accurate score predictions. Most students score within 5-10 points of their practice test results."
  },
  {
    id: 9,
    category: "Scoring",
    question: "How is PTE Academic scored?",
    answer: "PTE Academic uses automated scoring with scores ranging from 10-90. You'll receive an overall score and individual scores for Communicative Skills (Listening, Reading, Speaking, Writing) and Enabling Skills (Grammar, Oral Fluency, Pronunciation, Spelling, Vocabulary, Written Discourse)."
  },
  {
    id: 10,
    category: "Scoring",
    question: "When will I receive my results?",
    answer: "PTE Academic results are typically available within 5 business days of taking your test. You'll receive an email notification when your results are ready, and you can view them in your account."
  },
  {
    id: 11,
    category: "Technical",
    question: "What if I experience technical issues during the test?",
    answer: "If you experience technical issues during your test, immediately raise your hand to alert the test administrator. They will assist you and ensure any technical problems don't affect your test results."
  },
  {
    id: 12,
    category: "Technical",
    question: "Can I use my own headphones?",
    answer: "No, you must use the headphones provided at the test center. These are calibrated specifically for the PTE Academic test to ensure optimal audio quality and fair testing conditions."
  },
  {
    id: 13,
    category: "APEUni",
    question: "What is APEUni Premium?",
    answer: "APEUni Premium is our comprehensive PTE preparation platform offering unlimited practice tests, AI-powered feedback, real exam predictions, and personalized study plans. Premium access is included with your enrollment."
  },
  {
    id: 14,
    category: "APEUni",
    question: "How do I access APEUni Premium features?",
    answer: "Your APEUni Premium access is automatically activated with your student account. Simply log in to access all premium features including unlimited practice tests, detailed analytics, and AI feedback."
  },
  {
    id: 15,
    category: "Account",
    question: "I forgot my password. How can I reset it?",
    answer: "Click on 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link within a few minutes. If you don't see the email, check your spam folder."
  }
]

export const contactInfo = {
  email: "support@dla-lms.com",
  phone: "+61 2 8123 4567",
  address: "Level 10, 123 Education Street, Sydney NSW 2000, Australia",
  businessHours: {
    weekdays: "9:00 AM - 6:00 PM (AEST)",
    weekends: "10:00 AM - 4:00 PM (AEST)"
  },
  responseTime: {
    email: "Within 24 hours",
    phone: "Immediate",
    chat: "Within 5 minutes"
  }
}

export const supportCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "registration", label: "Test Registration" },
  { value: "billing", label: "Billing & Payment" },
  { value: "preparation", label: "Test Preparation" },
  { value: "results", label: "Results & Scores" },
  { value: "apeuni", label: "APEUni Platform" },
  { value: "other", label: "Other" }
]

export const chatResponses = [
  {
    id: 1,
    message: "Hello! I'm Sarah from DLA LMS support. How can I help you today?",
    timestamp: new Date(),
    sender: "agent",
    typing: false
  },
  {
    id: 2,
    message: "I can help you with test registration, technical issues, study materials, or any other questions you might have.",
    timestamp: new Date(Date.now() + 2000),
    sender: "agent", 
    typing: false
  }
]

export const quickActions = [
  {
    title: "Book a Test",
    description: "Register for PTE Academic",
    icon: "📝",
    action: "register"
  },
  {
    title: "Technical Help",
    description: "Get technical support",
    icon: "🔧",
    action: "technical"
  },
  {
    title: "Study Materials",
    description: "Access practice tests",
    icon: "📚",
    action: "materials"
  },
  {
    title: "Check Results",
    description: "View your test scores",
    icon: "📊",
    action: "results"
  }
]

export const supportStats = {
  averageResponseTime: "4.2 minutes",
  satisfactionRate: "98.7%",
  resolvedTickets: 1456,
  activeAgents: 12
}