import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default function Reports() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const filters = [
    { id: 'all', label: 'All Exams' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'semester', label: 'Semester' },
    { id: 'year', label: 'Year' },
  ];

  const recentExams = [
    {
      id: 1,
      title: 'Final Exam - Advanced Mathematics',
      date: '2024-04-15',
      students: 45,
      avgScore: 78,
      passRate: 92,
      status: 'completed',
    },
    {
      id: 2,
      title: 'Midterm - Computer Science',
      date: '2024-04-10',
      students: 32,
      avgScore: 82,
      passRate: 94,
      status: 'completed',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text className="text-3xl font-bold text-white mb-2">
          Reports & Analytics
        </Text>
        <Text className="text-gray-200 text-lg">
          Track exam performance and student progress
        </Text>
      </View>

      <View className="p-6">
        {/* Quick Stats */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          {[
            { title: 'Total Exams', value: '24', icon: 'book', color: 'bg-blue-500' },
            { title: 'Total Students', value: '156', icon: 'users', color: 'bg-green-500' },
            { title: 'Avg. Score', value: '76%', icon: 'line-chart', color: 'bg-purple-500' },
            { title: 'Pass Rate', value: '89%', icon: 'check-circle', color: 'bg-yellow-500' },
          ].map((stat, index) => (
            <View 
              key={index}
              className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <View className={`w-10 h-10 ${stat.color} rounded-full items-center justify-center mb-2`}>
                <FontAwesome name={stat.icon} size={20} color="white" />
              </View>
              <Text className="text-gray-600 dark:text-gray-400">{stat.title}</Text>
              <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Performance Trends */}
        <View className="bg-white dark:bg-gray-800 rounded-xl py-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Performance Trends
            </Text>
            <View className="flex-row bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {periods.map(period => (
                <TouchableOpacity
                  key={period.id}
                  className={`px-3 py-1 rounded-lg ${
                    selectedPeriod === period.id 
                      ? 'bg-[#1a367b]' 
                      : 'bg-transparent'
                  }`}
                  onPress={() => setSelectedPeriod(period.id)}
                >
                  <Text className={
                    selectedPeriod === period.id 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-400'
                  }>
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                data: [65, 72, 68, 78, 82, 80]
              }]
            }}
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
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        {/* Score Distribution */}
        <View className="bg-white dark:bg-gray-800 rounded-xl py-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Score Distribution
          </Text>
          
          <BarChart
            data={{
              labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
              datasets: [{
                data: [5, 12, 28, 35, 20]
              }]
            }}
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

        {/* Recent Exams */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Recent Exams
            </Text>
            <View className="flex-row bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  className={`px-3 py-1 rounded-lg ${
                    activeFilter === filter.id 
                      ? 'bg-[#1a367b]' 
                      : 'bg-transparent'
                  }`}
                  onPress={() => setActiveFilter(filter.id)}
                >
                  <Text className={
                    activeFilter === filter.id 
                      ? 'text-white' 
                      : 'text-gray-600 dark:text-gray-400'
                  }>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {recentExams.map(exam => (
            <TouchableOpacity
              key={exam.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {exam.title}
                </Text>
                <View className={`
                  px-2 py-1 rounded-full
                  ${exam.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}
                `}>
                  <Text className={`
                    text-sm capitalize
                    ${exam.status === 'completed' ? 'text-green-700' : 'text-yellow-700'}
                  `}>
                    {exam.status}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-600 dark:text-gray-400 mb-3">
                {new Date(exam.date).toLocaleDateString()}
              </Text>

              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <FontAwesome name="users" size={14} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 dark:text-gray-400">
                    {exam.students} students
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="star" size={14} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 dark:text-gray-400">
                    Avg: {exam.avgScore}%
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="check-circle" size={14} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 dark:text-gray-400">
                    Pass: {exam.passRate}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
} 