"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, UserCircle, BookOpen } from "lucide-react"
import 'aos/dist/aos.css';
import Aos from "aos";
export default function TeacherClassDetails() {
  const [classData, setClassData] = useState(null)
  const [expandedClass, setExpandedClass] = useState(null)

  // Empty function to fetch class details
  const fetchClassDetails = () => {
    // This will be implemented later
    // For now, using dummy data
    const dummyData = [
      {
        classId: "CLS-001",
        className: "Class 10-A",
        students: [
          { studentId: "STD-001", studentName: "John Doe", assignedClassId: "CLS-001" },
          { studentId: "STD-002", studentName: "Jane Smith", assignedClassId: "CLS-001" },
        ],
      },
      {
        classId: "CLS-002",
        className: "Class 10-B",
        students: [
          { studentId: "STD-003", studentName: "Alice Johnson", assignedClassId: "CLS-002" },
          { studentId: "STD-004", studentName: "Bob Wilson", assignedClassId: "CLS-002" },
        ],
      },
    ]
    setClassData(dummyData)
  }
  useEffect(() => {
    handelGetDetails();
    Aos.init({ duration: 1000 });
  }, []);
  // Call fetchClassDetails when component mounts
  useState(() => {
    fetchClassDetails()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 data-aos="fade-up" className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Class Details
          </h1>
          <p className="text-gray-600 mt-2" data-aos="fade-up">View all your assigned classes and students</p>
        </div>

        <div className="space-y-6">
          {classData ? (
            classData.map((classItem) => (
              <div key={classItem.classId} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div data-aos="fade-up"
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedClass(expandedClass === classItem.classId ? null : classItem.classId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{classItem.className}</h2>
                        <p className="text-gray-600">Class ID: {classItem.classId}</p>
                      </div>
                    </div>
                    {expandedClass === classItem.classId ? (
                      <ChevronUp className="h-6 w-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                </div>

                {expandedClass === classItem.classId && (
                  <div className="border-t border-gray-100" data-aos="fade-up">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Students ({classItem.students.length})
                      </h3>
                      <div className="grid gap-4">
                        {classItem.students.map((student) => (
                          <div
                            key={student.studentId}
                            className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50"
                          >
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                              <UserCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{student.studentName}</h4>
                              <p className="text-sm text-gray-600">Student ID: {student.studentId}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12" >
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading class details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

