// Mock data for services

export const pteExamCenters = [
  {
    id: 1,
    name: "Pearson Test Center - Sydney CBD",
    address: "Level 5, 201 Elizabeth Street, Sydney NSW 2000",
    phone: "+61 2 9286 8300",
    email: "sydney@pearsonpte.com",
    availableDates: [
      "2024-02-15",
      "2024-02-18",
      "2024-02-22",
      "2024-02-25",
      "2024-02-28",
      "2024-03-05",
      "2024-03-08",
      "2024-03-12"
    ],
    timeSlots: [
      "09:00 AM",
      "11:00 AM", 
      "01:00 PM",
      "03:00 PM",
      "05:00 PM"
    ],
    facilities: ["Computer Lab", "Audio Equipment", "Accessibility Support"]
  },
  {
    id: 2,
    name: "Pearson Test Center - Melbourne",
    address: "Level 8, 440 Collins Street, Melbourne VIC 3000",
    phone: "+61 3 9629 5464",
    email: "melbourne@pearsonpte.com",
    availableDates: [
      "2024-02-16",
      "2024-02-19",
      "2024-02-23",
      "2024-02-26",
      "2024-03-01",
      "2024-03-06",
      "2024-03-09",
      "2024-03-13"
    ],
    timeSlots: [
      "09:30 AM",
      "11:30 AM",
      "01:30 PM",
      "03:30 PM",
      "05:30 PM"
    ],
    facilities: ["Computer Lab", "Audio Equipment", "Parking Available"]
  },
  {
    id: 3,
    name: "Pearson Test Center - Brisbane",
    address: "Level 12, 127 Creek Street, Brisbane QLD 4000",
    phone: "+61 7 3221 6044",
    email: "brisbane@pearsonpte.com",
    availableDates: [
      "2024-02-17",
      "2024-02-20",
      "2024-02-24",
      "2024-02-27",
      "2024-03-02",
      "2024-03-07",
      "2024-03-10",
      "2024-03-14"
    ],
    timeSlots: [
      "10:00 AM",
      "12:00 PM",
      "02:00 PM",
      "04:00 PM"
    ],
    facilities: ["Computer Lab", "Audio Equipment", "Public Transport Access"]
  }
]

export const examPricing = {
  standard: {
    price: 440,
    currency: "AUD",
    description: "Standard PTE Academic test",
    includes: [
      "3-hour computer-based test",
      "Score report within 5 business days",
      "Unlimited score sending to institutions",
      "One free rescore if needed"
    ]
  },
  discount: {
    price: 396,
    currency: "AUD", 
    originalPrice: 440,
    discountAmount: 44,
    discountPercentage: 10,
    description: "Student discount applied",
    validUntil: "2024-03-31",
    includes: [
      "3-hour computer-based test",
      "Score report within 5 business days", 
      "Unlimited score sending to institutions",
      "One free rescore if needed",
      "Student discount (10% off)"
    ]
  }
}

export const apeUniServices = {
  premium: {
    status: "granted",
    validUntil: "2024-12-31",
    features: [
      "Unlimited practice tests",
      "Real exam predictions",
      "Detailed score analysis",
      "Speaking practice with AI feedback",
      "Writing correction service",
      "Priority customer support",
      "Mobile app access",
      "Offline practice materials"
    ],
    originalPrice: 299,
    currency: "AUD",
    savedAmount: 299,
    grantedDate: "2024-01-01"
  },
  benefits: [
    {
      title: "Practice Tests",
      description: "Access to 500+ practice questions with detailed explanations",
      icon: "📝"
    },
    {
      title: "AI Feedback",
      description: "Get instant feedback on your speaking and writing performance",
      icon: "🤖"
    },
    {
      title: "Score Prediction",
      description: "Accurate score predictions based on your practice performance",
      icon: "🎯"
    },
    {
      title: "Study Plan",
      description: "Personalized study plan based on your strengths and weaknesses",
      icon: "📅"
    }
  ]
}

export const registrationForm = {
  personalInfo: {
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { name: "nationality", label: "Nationality", type: "select", required: true },
      { name: "passportNumber", label: "Passport Number", type: "text", required: true },
      { name: "passportExpiry", label: "Passport Expiry Date", type: "date", required: true }
    ]
  },
  testDetails: {
    fields: [
      { name: "testCenter", label: "Test Center", type: "select", required: true },
      { name: "testDate", label: "Test Date", type: "date", required: true },
      { name: "testTime", label: "Test Time", type: "select", required: true },
      { name: "purpose", label: "Test Purpose", type: "select", required: true },
      { name: "accommodations", label: "Special Accommodations", type: "textarea", required: false }
    ]
  },
  payment: {
    methods: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"],
    fields: [
      { name: "cardNumber", label: "Card Number", type: "text", required: true },
      { name: "expiryDate", label: "Expiry Date", type: "text", required: true },
      { name: "cvv", label: "CVV", type: "text", required: true },
      { name: "cardholderName", label: "Cardholder Name", type: "text", required: true }
    ]
  }
}

export const serviceStats = {
  examRegistrations: {
    total: 1247,
    thisMonth: 89,
    successRate: 98.5
  },
  apeUniAccess: {
    activeUsers: 2156,
    averageScore: 78,
    completionRate: 94.2
  }
}