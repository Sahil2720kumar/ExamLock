import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'semester', label: 'This Semester' },
    { id: 'year', label: 'This Year' },
  ];

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'cs', label: 'Computer Science' },
    { id: 'ee', label: 'Electrical' },
    { id: 'me', label: 'Mechanical' },
    { id: 'ce', label: 'Civil' },
  ];

  const performanceData = {
    labels: ['CS', 'EE', 'ME', 'CE', 'CH', 'PH'],
    datasets: [
      {
        data: [85, 78, 82, 75, 80, 77],
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent', 'Leave'],
    data: [0.75, 0.15, 0.10],
    colors: ['#22c55e', '#ef4444', '#f59e0b'],
  };

  const ReportCard = ({ title, value, trend, icon, color }) => (
    <View className="flex-1 min-w-[160px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <View className={`w-12 h-12 ${color} rounded-full items-center justify-center mb-3`}>
        <FontAwesome name={icon} size={24} color="white" />
      </View>
      <Text className="text-gray-600 dark:text-gray-400">{title}</Text>
      <View className="flex-row items-center justify-between mt-2">
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </Text>
        <Text className={`
          ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}
        `}>
          {trend}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text className="text-3xl font-bold text-white mb-2">
          Reports & Analytics
        </Text>
        <Text className="text-gray-200 text-lg">
          Comprehensive institution insights
        </Text>
      </View>

      {/* Filters */}
      <View className="p-6">
        <View className="flex-row justify-between mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-3"
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                className={`
                  px-4 py-2 rounded-lg
                  ${selectedPeriod === period.id 
                    ? 'bg-[#1a367b]' 
                    : 'bg-white dark:bg-gray-800'}
                `}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text className={
                  selectedPeriod === period.id 
                    ? 'text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Stats */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          <ReportCard
            title="Total Students"
            value="1,234"
            trend="+5.2%"
            icon="users"
            color="bg-blue-500"
          />
          <ReportCard
            title="Attendance Rate"
            value="85%"
            trend="+2.1%"
            icon="calendar-check-o"
            color="bg-green-500"
          />
          <ReportCard
            title="Pass Rate"
            value="92%"
            trend="-1.4%"
            icon="graduation-cap"
            color="bg-purple-500"
          />
          <ReportCard
            title="Active Courses"
            value="48"
            trend="+3.8%"
            icon="book"
            color="bg-orange-500"
          />
        </View>

        {/* Performance Chart */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Department Performance
          </Text>
          <BarChart
            data={performanceData}
            width={340}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 54, 123, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        {/* Attendance Distribution */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Attendance Distribution
          </Text>
          <PieChart
            data={attendanceData.data.map((value, index) => ({
              name: attendanceData.labels[index],
              population: value * 100,
              color: attendanceData.colors[index],
              legendFontColor: '#6b7280',
            }))}
            width={340}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 54, 123, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        {/* Key Metrics */}
        <View className="space-y-4 mb-6">
          {[
            { title: 'Student-Teacher Ratio', value: '15:1', icon: 'users' },
            { title: 'Average GPA', value: '3.42', icon: 'star' },
            { title: 'Course Completion Rate', value: '94%', icon: 'check-circle' },
            { title: 'Student Satisfaction', value: '4.2/5', icon: 'smile-o' },
          ].map((metric, index) => (
            <View 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 flex-row items-center"
            >
              <View className="w-10 h-10 bg-[#1a367b]/10 rounded-full items-center justify-center">
                <FontAwesome name={metric.icon} size={20} color="#1a367b" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-gray-600 dark:text-gray-400">
                  {metric.title}
                </Text>
                <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {metric.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Export Options */}
        <View className="flex-row gap-4">
          <TouchableOpacity 
            className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl flex-row items-center justify-center"
            onPress={() => {/* Handle PDF export */}}
          >
            <FontAwesome name="file-pdf-o" size={20} color="#ef4444" />
            <Text className="ml-2 text-gray-700 dark:text-gray-300">
              Export PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl flex-row items-center justify-center"
            onPress={() => {/* Handle Excel export */}}
          >
            <FontAwesome name="file-excel-o" size={20} color="#22c55e" />
            <Text className="ml-2 text-gray-700 dark:text-gray-300">
              Export Excel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
