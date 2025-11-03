export const user = {
  // Personal Profile
  name: "Nguyen Van A",
  email: "a@demo.com",
  phone: "+84 123 456 789",
  dateOfBirth: "1995-03-15",
  nationality: "Vietnam",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  
  // Account Settings
  loginHistory: [
    {
      id: 1,
      date: "2024-01-15 09:30:00",
      ip: "192.168.1.100",
      device: "Chrome on Windows"
    },
    {
      id: 2,
      date: "2024-01-14 14:22:00",
      ip: "192.168.1.101",
      device: "Safari on iPhone"
    },
    {
      id: 3,
      date: "2024-01-13 20:15:00",
      ip: "192.168.1.100",
      device: "Chrome on Windows"
    },
    {
      id: 4,
      date: "2024-01-12 11:45:00",
      ip: "10.0.0.50",
      device: "Firefox on Mac"
    },
    {
      id: 5,
      date: "2024-01-11 16:30:00",
      ip: "192.168.1.100",
      device: "Chrome on Windows"
    }
  ],
  
  // Privacy & Data Settings
  consentGiven: true,
  
  // Learning Preferences
  skillFocus: ["Speaking", "Writing"], // Multi-select options: Speaking, Writing, Reading, Listening
  studyTime: "Morning", // Radio options: Morning, Evening
  uiLanguage: "English", // Select options: English, Vietnamese, Chinese
  
  // Notification Settings
  emailNotifications: true,
  smsNotifications: false,
  testReminders: true,
  classReminders: true,
  progressReminders: false,
  
  // Linked Services
  linkedServices: {
    apeuni: false,
    googleCalendar: false
  },
  
  // Account Security
  twoFactorEnabled: false
}

export const skillOptions = [
  { id: "speaking", label: "Speaking", value: "Speaking" },
  { id: "writing", label: "Writing", value: "Writing" },
  { id: "reading", label: "Reading", value: "Reading" },
  { id: "listening", label: "Listening", value: "Listening" }
]

export const studyTimeOptions = [
  { id: "morning", label: "Morning (6AM - 12PM)", value: "Morning" },
  { id: "evening", label: "Evening (6PM - 12AM)", value: "Evening" }
]

export const languageOptions = [
  { id: "en", label: "English", value: "English" },
  { id: "vi", label: "Tiếng Việt", value: "Vietnamese" },
  { id: "zh", label: "中文", value: "Chinese" }
]