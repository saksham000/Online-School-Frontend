import React, { useEffect } from "react";
import { Users, GraduationCap, School, BookOpen, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';

const Dashboard = () => {
  const stats = [
    { icon: UserCog, label: "Admins", count: 5, path: "/admin-management" },
    { icon: Users, label: "Teachers", count: 25, path: "/manage-teachers" },
    {
      icon: GraduationCap,
      label: "Students",
      count: 350,
      path: "/manage-students",
    },
    { icon: BookOpen, label: "Subjects", count: 12, path: "/manage-subjects" },
    { icon: School, label: "Classes", count: 15, path: "/manage-classes" },
  ];

  useEffect(() => {
      Aos.init({ duration: 1000 });
    }, []);

  return (
    <div className="min-h-screen ">
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-semibold text-gray-900 mb-8">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link 
                  key={stat.label}
                  to={stat.path} data-aos="fade-up"
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md hover:border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p data-aos="fade-up" className="text-gray-600 text-sm font-medium mb-1">
                        {stat.label}
                      </p>
                      <p data-aos="fade-up" className="text-2xl font-bold text-gray-900">
                        {stat.count}
                      </p>
                    </div>
                    <Icon data-aos="fade-up"  className="w-8 h-8 text-blue-600" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
