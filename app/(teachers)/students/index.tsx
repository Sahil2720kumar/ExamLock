import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Student {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: string;
  examsTaken: number;
  avgScore: number;
  status: 'active' | 'inactive';
  imageUrl: string;
}

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filters = [
    { id: 'all', label: 'All Students' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      rollNumber: 'CS2024001',
      department: 'Computer Science',
      year: '2nd Year',
      examsTaken: 12,
      avgScore: 85,
      status: 'active',
      imageUrl: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      rollNumber: 'CS2024002',
      department: 'Computer Science',
      year: '2nd Year',
      examsTaken: 10,
      avgScore: 92,
      status: 'active',
      imageUrl: 'https://ui-avatars.com/api/?name=Jane+Smith',
    },
    // Add more student data as needed
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-3xl font-bold text-white">
            Students
          </Text>
          <TouchableOpacity
            className="bg-white/20 px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push('/students/add')}
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
      </View>

      <View className="p-6">

        {/* Quick Stats */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-semibold  text-gray-900 dark:text-gray-100">
            Quick Stats
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-4 ">
          {[
            { title: 'Total Students', value: '156', icon: 'users', color: 'bg-blue-500' },
            { title: 'Avg. Performance', value: '78%', icon: 'line-chart', color: 'bg-purple-500' },
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
        {/* Filters and Sort */}
        {/* <View className="flex-row justify-between items-center mb-6">
           <View className="flex-row bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {filters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                className={`px-4 py-2 rounded-lg ${
                  selectedFilter === filter.id 
                    ? 'bg-[#1a367b]' 
                    : 'bg-transparent'
                }`}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text className={
                  selectedFilter === filter.id 
                    ? 'text-white' 
                    : 'text-gray-600 dark:text-gray-400'
                }>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View> 

          <TouchableOpacity 
            className="flex-row items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm"
            onPress={() => { Handle sort options }}
          >
            <FontAwesome name="sort" size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-600 dark:text-gray-400">Sort</Text>
          </TouchableOpacity>
        </View>*/}

        {/* Students List */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-semibold  text-gray-900 dark:text-gray-100">
              Students
            </Text>
          </View>
          {students.map(student => (
            <TouchableOpacity
              key={student.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
              onPress={() => {/* Navigate to student details */ }}
            >
              <View className="flex-row items-center">
                <Image
                  source={{ uri: student.imageUrl }}
                  className="w-12 h-12 rounded-full bg-gray-300"
                  style={{ width: 48, height: 48 }}
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
                    <View className={`
                      px-2 py-1 rounded-full
                      ${student.status === 'active' ? 'bg-green-100' : 'bg-gray-100'}
                    `}>
                      {/* <Text className={`
                        text-sm capitalize
                        ${student.status === 'active' ? 'text-green-700' : 'text-gray-700'}
                      `}>
                        {student.status}
                      </Text> */}
                    </View>
                  </View>

                  <View className="flex-row mt-2">
                    <View className="flex-row items-center mr-4">
                      <FontAwesome name="graduation-cap" size={14} color="#6b7280" />
                      <Text className="ml-1 text-gray-600 dark:text-gray-400">
                        {student.department}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <FontAwesome name="calendar" size={14} color="#6b7280" />
                      <Text className="ml-1 text-gray-600 dark:text-gray-400">
                        {student.year}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <View className="flex-row items-center">
                  <FontAwesome name="file-text" size={14} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 dark:text-gray-400">
                    {student.examsTaken} Exams Taken
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome name="star" size={14} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 dark:text-gray-400">
                    {student.avgScore}% Avg. Score
                  </Text>
                </View>
                <TouchableOpacity className="flex-row items-center">
                  <FontAwesome name="ellipsis-h" size={14} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>


      </View>
    </ScrollView>
  );
}
