// Mock data for admin panel

export const adminUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@dla.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 14:30:00",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@dla.com",
    role: "Instructor",
    status: "Active",
    lastLogin: "2024-01-15 09:15:00",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@dla.com",
    role: "Student",
    status: "Active",
    lastLogin: "2024-01-14 16:45:00",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@dla.com",
    role: "Student",
    status: "Locked",
    lastLogin: "2024-01-10 11:20:00",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@dla.com",
    role: "Instructor",
    status: "Active",
    lastLogin: "2024-01-15 13:00:00",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@dla.com",
    role: "Student",
    status: "Active",
    lastLogin: "2024-01-15 10:30:00",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
]

export const adminStudents = [
  {
    id: 1,
    name: "Mike Chen",
    email: "mike.chen@dla.com",
    class: "PTE Academic Intensive",
    progress: 85,
    completedLessons: 17,
    totalLessons: 20,
    lastActivity: "2024-01-15",
    status: "Active",
    enrollmentDate: "2024-01-01",
    targetScore: 79,
    currentScore: 72
  },
  {
    id: 2,
    name: "Lisa Anderson",
    email: "lisa.anderson@dla.com",
    class: "PTE Academic Standard",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    lastActivity: "2024-01-15",
    status: "Active",
    enrollmentDate: "2024-01-05",
    targetScore: 65,
    currentScore: 58
  },
  {
    id: 3,
    name: "James Rodriguez",
    email: "james.rodriguez@dla.com",
    class: "PTE Academic Intensive",
    progress: 92,
    completedLessons: 18,
    totalLessons: 20,
    lastActivity: "2024-01-14",
    status: "Active",
    enrollmentDate: "2023-12-15",
    targetScore: 79,
    currentScore: 76
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.garcia@dla.com",
    class: "PTE Academic Standard",
    progress: 45,
    completedLessons: 9,
    totalLessons: 20,
    lastActivity: "2024-01-12",
    status: "At Risk",
    enrollmentDate: "2024-01-08",
    targetScore: 65,
    currentScore: 45
  },
  {
    id: 5,
    name: "Alex Kim",
    email: "alex.kim@dla.com",
    class: "PTE Academic Premium",
    progress: 78,
    completedLessons: 23,
    totalLessons: 30,
    lastActivity: "2024-01-15",
    status: "Active",
    enrollmentDate: "2023-12-20",
    targetScore: 85,
    currentScore: 68
  }
]

export const attendanceData = [
  {
    id: 1,
    studentId: 1,
    studentName: "Mike Chen",
    date: "2024-01-15",
    status: "Present",
    lesson: "Speaking Practice - Describe Image"
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Lisa Anderson",
    date: "2024-01-15",
    status: "Present",
    lesson: "Speaking Practice - Describe Image"
  },
  {
    id: 3,
    studentId: 3,
    studentName: "James Rodriguez",
    date: "2024-01-15",
    status: "Absent",
    lesson: "Speaking Practice - Describe Image"
  },
  {
    id: 4,
    studentId: 4,
    studentName: "Maria Garcia",
    date: "2024-01-15",
    status: "Present",
    lesson: "Speaking Practice - Describe Image"
  },
  {
    id: 5,
    studentId: 5,
    studentName: "Alex Kim",
    date: "2024-01-15",
    status: "Present",
    lesson: "Speaking Practice - Describe Image"
  }
]

export const adminCourses = [
  {
    id: 1,
    title: "PTE Academic Intensive Course",
    instructor: "Sarah Johnson",
    status: "Active",
    students: 15,
    duration: "8 weeks",
    price: 899,
    createdDate: "2023-12-01",
    lastUpdated: "2024-01-10",
    category: "PTE Preparation",
    level: "Intermediate to Advanced"
  },
  {
    id: 2,
    title: "PTE Academic Standard Course",
    instructor: "David Wilson",
    status: "Active",
    students: 22,
    duration: "6 weeks",
    price: 699,
    createdDate: "2023-11-15",
    lastUpdated: "2024-01-08",
    category: "PTE Preparation",
    level: "Beginner to Intermediate"
  },
  {
    id: 3,
    title: "PTE Academic Premium Course",
    instructor: "Sarah Johnson",
    status: "Draft",
    students: 0,
    duration: "12 weeks",
    price: 1299,
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-12",
    category: "PTE Preparation",
    level: "All Levels"
  },
  {
    id: 4,
    title: "IELTS Preparation Course",
    instructor: "David Wilson",
    status: "Pending Approval",
    students: 0,
    duration: "10 weeks",
    price: 799,
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-14",
    category: "IELTS Preparation",
    level: "Intermediate"
  },
  {
    id: 5,
    title: "English Speaking Masterclass",
    instructor: "Sarah Johnson",
    status: "Inactive",
    students: 8,
    duration: "4 weeks",
    price: 399,
    createdDate: "2023-10-20",
    lastUpdated: "2023-12-15",
    category: "General English",
    level: "Advanced"
  }
]

export const revenueData = [
  {
    month: "Jul 2023",
    revenue: 12500,
    students: 18,
    courses: 3
  },
  {
    month: "Aug 2023",
    revenue: 15800,
    students: 23,
    courses: 3
  },
  {
    month: "Sep 2023",
    revenue: 18200,
    students: 28,
    courses: 4
  },
  {
    month: "Oct 2023",
    revenue: 22100,
    students: 32,
    courses: 4
  },
  {
    month: "Nov 2023",
    revenue: 25600,
    students: 38,
    courses: 5
  },
  {
    month: "Dec 2023",
    revenue: 28900,
    students: 42,
    courses: 5
  },
  {
    month: "Jan 2024",
    revenue: 31200,
    students: 45,
    courses: 5
  }
]

export const enrollmentTrend = [
  {
    month: "Jul 2023",
    newEnrollments: 8,
    totalEnrollments: 18
  },
  {
    month: "Aug 2023",
    newEnrollments: 12,
    totalEnrollments: 23
  },
  {
    month: "Sep 2023",
    newEnrollments: 15,
    totalEnrollments: 28
  },
  {
    month: "Oct 2023",
    newEnrollments: 10,
    totalEnrollments: 32
  },
  {
    month: "Nov 2023",
    newEnrollments: 14,
    totalEnrollments: 38
  },
  {
    month: "Dec 2023",
    newEnrollments: 16,
    totalEnrollments: 42
  },
  {
    month: "Jan 2024",
    newEnrollments: 18,
    totalEnrollments: 45
  }
]

export const completionRates = [
  {
    course: "PTE Intensive",
    completed: 85,
    inProgress: 12,
    dropped: 3,
    completionRate: 85
  },
  {
    course: "PTE Standard",
    completed: 78,
    inProgress: 18,
    dropped: 4,
    completionRate: 78
  },
  {
    course: "PTE Premium",
    completed: 92,
    inProgress: 6,
    dropped: 2,
    completionRate: 92
  },
  {
    course: "IELTS Prep",
    completed: 72,
    inProgress: 20,
    dropped: 8,
    completionRate: 72
  }
]

export const adminStats = {
  totalUsers: 156,
  totalStudents: 45,
  totalInstructors: 8,
  totalCourses: 12,
  activeStudents: 42,
  monthlyRevenue: 31200,
  averageScore: 68.5,
  completionRate: 82
}

export const recentActivities = [
  {
    id: 1,
    type: "enrollment",
    message: "New student enrolled in PTE Academic Intensive",
    user: "Alex Kim",
    timestamp: "2024-01-15 14:30:00"
  },
  {
    id: 2,
    type: "completion",
    message: "Student completed Speaking Practice module",
    user: "Mike Chen",
    timestamp: "2024-01-15 13:45:00"
  },
  {
    id: 3,
    type: "course",
    message: "New course submitted for approval",
    user: "David Wilson",
    timestamp: "2024-01-15 11:20:00"
  },
  {
    id: 4,
    type: "payment",
    message: "Payment received for Premium Course",
    user: "Lisa Anderson",
    timestamp: "2024-01-15 10:15:00"
  },
  {
    id: 5,
    type: "achievement",
    message: "Student achieved target score of 79",
    user: "James Rodriguez",
    timestamp: "2024-01-14 16:30:00"
  }
]