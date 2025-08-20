
export const studentData = {
  todayClasses: [
    { time: "9:00 AM", subject: "Mathematics", room: "101", color: "bg-blue-500" },
    { time: "11:00 AM", subject: "Science", room: "102", color: "bg-green-500" },
  ],
  attendance: {
    overall: 85,
    subjects: [
      { name: "Mathematics", percentage: 90 },
      { name: "Science", percentage: 80 },
      { name: "English", percentage: 85 },
    ],
  },
  assignments: [
    { title: "Math Homework", subject: "Mathematics", daysLeft: 3 },
    { title: "Science Report", subject: "Science", daysLeft: 1 },
  ],
  notifications: [
    { type: "announcement", title: "Holiday", message: "No class tomorrow", time: "2h ago" },
    { type: "assignment", title: "Homework Due", message: "Math homework due Friday", time: "1d ago" },
  ],
};

// Teacher Data
export const teacherData = {
  name: "Mrs. Sarah Smith",
  employeeId: "TCH2024015",
  department: "Science",
  classes: [
    { name: "Class X-A", students: 25, schedule: "9:00 AM - 10:00 AM" },
    { name: "Class IX-B", students: 20, schedule: "11:00 AM - 12:00 PM" },
    { name: "Class VIII-C", students: 22, schedule: "1:00 PM - 2:00 PM" }
  ],
  assignments: [
    { title: "Physics Lab Report", class: "Class X-A", submissions: 20 },
    { title: "Chemistry Worksheet", class: "Class IX-B", submissions: 15 },
    { title: "Biology Diagram Project", class: "Class VIII-C", submissions: 10 }
  ],
  performance: [
    { class: "Class X-A", average: 78, change: +5 },
    { class: "Class IX-B", average: 72, change: -3 },
    { class: "Class VIII-C", average: 80, change: +2 }
  ]
};

// Admin Data
export const adminData = {
  stats: [
    { name: "Total Students", value: 500, change: +2 },
    { name: "Total Teachers", value: 30, change: 0 },
    { name: "Attendance Today", value: "92%", change: +1 },
    { name: "Pending Admissions", value: 15, change: -2 }
  ],
  fees: {
    collected: "₹75,000",
    total: "₹1,00,000",
    recent: [
      { student: "John Doe", class: "X-A", amount: "₹5,000" },
      { student: "Jane Smith", class: "IX-B", amount: "₹4,500" },
      { student: "Aarav Patel", class: "VIII-C", amount: "₹6,000" }
    ]
  },
  announcements: [
    { title: "Sports Meet", message: "Sports meet on Feb 25th", date: "2024-02-20" },
    { title: "Holiday", message: "School closed on Mar 1st", date: "2024-02-22" },
    { title: "Exam Schedule", message: "Mid-term exams start from Mar 5th", date: "2024-02-25" }
  ]
};