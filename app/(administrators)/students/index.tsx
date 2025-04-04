import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  department: string;
  year: string;
  section: string;
  email: string;
  phone: string;
  attendance: number;
  performance: number;
  status: 'active' | 'inactive' | 'suspended';
  imageUrl: string;
  examsTaken: number;
  avgScore: number;
}

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');



  const years = [
    { id: 'all', name: 'All Years' },
    { id: '1', name: '1st Year' },
    { id: '2', name: '2nd Year' },
    { id: '3', name: '3rd Year' },
    { id: '4', name: '4th Year' },
  ];

  const students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'CS20001',
      department: 'Computer Science',
      year: '2nd Year',
      section: 'A',
      email: 'john.doe@university.edu',
      phone: '+1234567890',
      attendance: 85,
      performance: 78,
      status: 'active',
      imageUrl: 'https://ui-avatars.com/api/?name=John+Doe',
      examsTaken: 12,
      avgScore: 82,
    },
    // Add more student data as needed
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'suspended': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-white">
            Students
          </Text>
          <TouchableOpacity 
            className="bg-white/20 px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => {/* Navigate to add student */}}
          >
            <FontAwesome name="plus" size={16} color="white" />
            <Text className="text-white ml-2">Add Student</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white/10 rounded-lg px-4 py-2">
          <FontAwesome name="search" size={16} color="white" />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Search students..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Stats */}
        <View className="flex-row mt-6 gap-4">
          <View className="flex-1 bg-white/10 rounded-lg p-4">
            <Text className="text-white/60">Total Students</Text>
            <Text className="text-white text-2xl font-bold">1,234</Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-lg p-4">
            <Text className="text-white/60">Active</Text>
            <Text className="text-white text-2xl font-bold">1,180</Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-lg p-4">
            <Text className="text-white/60">Avg. Performance</Text>
            <Text className="text-white text-2xl font-bold">76%</Text>
          </View>
        </View>
      </View>

      <View className="p-6">
       
        {/* Year and Status Filters */}
        <View className="flex-row justify-between items-center mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-2"
          >
            {years.map((year) => (
              <TouchableOpacity
                key={year.id}
                className={`
                  px-3 py-1 rounded-lg
                  ${selectedYear === year.id 
                    ? 'bg-[#1a367b]' 
                    : 'bg-gray-100 dark:bg-gray-800'}
                `}
                onPress={() => setSelectedYear(year.id)}
              >
                <Text className={
                  selectedYear === year.id 
                    ? 'text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }>
                  {year.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sort Button */}
          <TouchableOpacity 
            className="flex-row items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-lg"
            onPress={() => {/* Handle sort options */}}
          >
            <FontAwesome name="sort" size={14} color="#6b7280" />
            <Text className="ml-2 text-gray-600 dark:text-gray-400">Sort</Text>
          </TouchableOpacity>
        </View>

        {/* Students List */}
        <View className="space-y-4">
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
              onPress={() => {/* Navigate to student details */}}
            >
              <View className="flex-row items-start">
                <Image
                  source={{ uri: student.imageUrl }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {student.name}
                      </Text>
                      <Text className="text-gray-500 dark:text-gray-400">
                        {student.rollNumber}
                      </Text>
                    </View>
                    {/* <View className={`px-2 py-1 rounded-full ${getStatusColor(student.status)}`}>
                      <Text className="text-sm capitalize">
                        {student.status}
                      </Text>
                    </View> */}
                  </View>

                  <View className="flex-row items-center mt-2">
                    <FontAwesome name="graduation-cap" size={14} color="#6b7280" />
                    <Text className="ml-2 text-gray-600 dark:text-gray-400">
                      {student.department} • {student.year}
                    </Text>
                  </View>

                  {/* <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <View className="flex-row items-center">
                      <FontAwesome name="calendar-check-o" size={14} color="#6b7280" />
                      <Text className="ml-2 text-gray-600 dark:text-gray-400">
                        {student.attendance}% Attendance
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <FontAwesome name="line-chart" size={14} color="#6b7280" />
                      <Text className={`ml-2 ${getPerformanceColor(student.performance)}`}>
                        {student.performance}% Performance
                      </Text>
                    </View>
                  </View> */}
                </View>

                <TouchableOpacity 
                  className="absolute top-4 right-4"
                  onPress={() => {/* Show more options */}}
                >
                  <FontAwesome name="ellipsis-v" size={18} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
