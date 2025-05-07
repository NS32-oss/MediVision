import React from 'react'

const DashboardStats = ({ stats }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-2 rounded-md ${stat.bgColor}`}>{stat.icon}</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-[#374151]">{stat.value}</p>
              </div>
            </div>
            {stat.change && (
              <div className="mt-2 flex items-center">
                <span className={`text-xs font-medium ${stat.change > 0 ? "text-[#22C55E]" : "text-red-500"}`}>
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
  
  export default DashboardStats
  