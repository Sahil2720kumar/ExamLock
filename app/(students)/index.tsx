import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { router } from 'expo-router';

export default function StudentDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  const studentInfo = {
    name: 'John Doe',
    rollNumber: 'CS20001',
    department: 'Computer Science',
    year: '2nd Year',
    section: 'A',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  };

  const upcomingExams = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      date: '2024-03-25',
      time: '10:00 AM',
      venue: 'Hall A',
      teacher: 'Dr. Smith',
    },
    {
      id: 2,
      subject: 'Data Structures',
      date: '2024-03-28',
      time: '02:00 PM',
      venue: 'Lab 3',
      teacher: 'Prof. Johnson',
    },
  ];

  const todayExam = [
    {
      id: 1,
      subject: 'Advanced Marketing',
      date: '2024-03-25',
      time: '10:00 AM',
      venue: 'Hall A',
      teacher: 'Dr. Smith',
    },
    {
      id: 2,
      subject: 'Business Management',
      date: '2024-03-28',
      time: '02:00 PM',
      venue: 'Lab 3',
      teacher: 'Prof. Johnson',
    },
  ];

  // const assignments = [
  //   {
  //     id: 1,
  //     subject: 'Database Systems',
  //     title: 'SQL Query Optimization',
  //     dueDate: '2024-03-22',
  //     status: 'pending',
  //   },
  //   {
  //     id: 2,
  //     subject: 'Web Development',
  //     title: 'React Native Project',
  //     dueDate: '2024-03-24',
  //     status: 'submitted',
  //   },
  // ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header with Student Info */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row items-center mb-6">
          <Image
            source={{ uri: studentInfo.avatar }}
            className="w-20 h-20 rounded-full border-4 border-white/20"
          />
          <View className="ml-4 flex-1">
            <Text className="text-2xl font-bold text-white mb-1">
              {studentInfo.name}
            </Text>
            <Text className="text-gray-300">
              {studentInfo.rollNumber}
            </Text>
            <Text className="text-gray-300">
              {studentInfo.department} • {studentInfo.year}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        {/* <View className="flex-row gap-4">
          <View className="flex-1 bg-white/10 rounded-xl p-4">
            <Text className="text-white/60">Attendance</Text>
            <Text className="text-white text-2xl font-bold">85%</Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-xl p-4">
            <Text className="text-white/60">CGPA</Text>
            <Text className="text-white text-2xl font-bold">3.8</Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-xl p-4">
            <Text className="text-white/60">Rank</Text>
            <Text className="text-white text-2xl font-bold">#12</Text>
          </View>
        </View> */}
      </View>

      <View className="p-6">
        {/* Performance Chart */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Academic Performance
          </Text>
          <LineChart
            data={{
              labels: ['Quiz 1', 'Mid', 'Quiz 2', 'Final'],
              datasets: [{
                data: [85, 78, 90, 88]
              }]
            }}
            width={340}
            height={200}
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

        {/* Upcoming Exams */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Upcoming Exams
          </Text>
          {upcomingExams.map((exam) => (
            <TouchableOpacity
              key={exam.id}
              onPress={() => router.push(`/(students)/exam/exam-details?examId=${exam.id}`)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {exam.subject}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-400 mt-1">
                    {exam.teacher}
                  </Text>
                </View>
                <View className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  <Text className="text-blue-600 dark:text-blue-400">
                    {exam.date}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-3">
                <View className="flex-row items-center mr-4">
                  <FontAwesome name="clock-o" size={14} color="#6b7280" />
                  <Text className="text-gray-500 dark:text-gray-400 ml-1">
                    {exam.time}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="map-marker" size={14} color="#6b7280" />
                  <Text className="text-gray-500 dark:text-gray-400 ml-1">
                    {exam.venue}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Assignments */}
        {/* <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Assignments
          </Text>
          {assignments.map((assignment) => (
            <View 
              key={assignment.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-gray-500 dark:text-gray-400">
                    {assignment.subject}
                  </Text>
                  <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {assignment.title}
                  </Text>
                </View>
                <View className={`
                  px-3 py-1 rounded-full
                  ${assignment.status === 'submitted' 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-yellow-50 dark:bg-yellow-900/20'}
                `}>
                  <Text className={`
                    capitalize
                    ${assignment.status === 'submitted' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-yellow-600 dark:text-yellow-400'}
                  `}>
                    {assignment.status}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center mt-3">
                <FontAwesome name="calendar" size={14} color="#6b7280" />
                <Text className="text-gray-500 dark:text-gray-400 ml-2">
                  Due: {assignment.dueDate}
                </Text>
              </View>
            </View>
          ))}
        </View> */}

        {/* Quick Actions */}
        <View className="flex-row mb-6 gap-4">
          {[
            // { title: 'View Attendance', icon: 'calendar-check-o', color: 'bg-blue-500' },
            // { title: 'Subjects', icon: 'book', color: 'bg-purple-500', route: '(students)/subjects' },
            { title: 'View Results', icon: 'line-chart', color: 'bg-green-500', route: '(students)/results-list' },
            { title: 'Time Table', icon: 'calendar', color: 'bg-orange-500', route: '(students)/time-table' },
            { title: 'Settings', icon: 'gear', color: 'bg-orange-500', route: '(students)/settings' },
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(action.route as any)}
              className="bg-white flex-1 dark:bg-gray-800 p-4 rounded-xl"
            >
              <View className={`w-10 h-10 ${action.color} rounded-full items-center justify-center mb-2`}>
                <FontAwesome name={action.icon} size={20} color="white" />
              </View>
              <Text className="text-gray-900 dark:text-gray-100 font-medium">
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      {/* Today Exam */}
      <View className="mb-6 ">
        <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Current/Today Exam
        </Text>
        <View className="flex-col gap-4">
           
           {todayExam.map((exam) => (
            <TouchableOpacity
              key={exam.id}
              onPress={() => router.push(`/(students)/exam?examId=${exam.id}`)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {exam.subject}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-400 mt-1">
                    {exam.teacher}
                  </Text>
                </View>
                <View className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  <Text className="text-blue-600 dark:text-blue-400">
                    {exam.date}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-3">
                <View className="flex-row items-center mr-4">
                  <FontAwesome name="clock-o" size={14} color="#6b7280" />
                  <Text className="text-gray-500 dark:text-gray-400 ml-1">
                    {exam.time}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="map-marker" size={14} color="#6b7280" />
                  <Text className="text-gray-500 dark:text-gray-400 ml-1">
                    {exam.venue}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
           
        </View>
      </View>


        {/* Completed Exams */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Completed Exams
          </Text>
          <View className="grid grid-cols-2 gap-4"> 
            {[
              { 
                title: 'Quiz 1',
                subject: 'Advanced Mathematics',
                score: 85,
                date: 'Jan 15, 2024',
                icon: 'pencil-square-o',
                color: 'bg-blue-500',
                status: 'Excellent'
              },
              { 
                title: 'Mid Term',
                subject: 'Data Structures',
                score: 78,
                date: 'Feb 20, 2024',
                icon: 'book',
                color: 'bg-purple-500',
                status: 'Good'
              },
              { 
                title: 'Quiz 2',
                subject: 'Database Systems',
                score: 92,
                date: 'Mar 10, 2024',
                icon: 'check-circle',
                color: 'bg-green-500',
                status: 'Outstanding'
              },
              { 
                title: 'Final',
                subject: 'Web Development',
                score: 88,
                date: 'Mar 15, 2024',
                icon: 'graduation-cap',
                color: 'bg-orange-500',
                status: 'Excellent'
              },
            ].map((exam, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(`/exam/result`)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className={`w-10 h-10 ${exam.color} rounded-full items-center justify-center`}>
                    <FontAwesome name={exam.icon} size={20} color="white" />
                  </View>
                  <View className={`
                    px-2 py-1 rounded-full
                    ${exam.score >= 90 ? 'bg-green-100 dark:bg-green-900/20' :
                      exam.score >= 80 ? 'bg-blue-100 dark:bg-blue-900/20' :
                      exam.score >= 70 ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                      'bg-red-100 dark:bg-red-900/20'}
                  `}>
                    <Text className={`
                      text-sm font-medium
                      ${exam.score >= 90 ? 'text-green-700 dark:text-green-300' :
                        exam.score >= 80 ? 'text-blue-700 dark:text-blue-300' :
                        exam.score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                        'text-red-700 dark:text-red-300'}
                    `}>
                      {exam.status}
                    </Text>
                  </View>
                </View>

                <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {exam.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {exam.subject}
                </Text>

                <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <View className="flex-row items-center">
                    <FontAwesome name="calendar" size={12} color="#6b7280" />
                    <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      {exam.date}
                    </Text>
                  </View>
                  <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {exam.score}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
