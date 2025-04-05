import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Teacher {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  employeeId: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  subjects: string[];
  imageUrl: string;
  rating: number;
  
}

export default function TeachersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cs', name: 'Computer Science' },
    { id: 'ee', name: 'Electrical Engineering' },
    { id: 'me', name: 'Mechanical Engineering' },
    { id: 'ce', name: 'Civil Engineering' },
  ];


  const teachers: Teacher[] = [
    {
      id: 1,
      name: 'Dr. John Smith',
      email: 'john.smith@university.edu',
      department: 'Computer Science',
      designation: 'Associate Professor',
      employeeId: 'EMP001',
      joinDate: '2020-01-15',
      status: 'active',
      subjects: ['Data Structures', 'Algorithms', 'Machine Learning'],
      imageUrl: 'https://ui-avatars.com/api/?name=John+Smith',
      rating: 4.8,

    },
    {
      id: 2,
      name: 'Dr. Jane Doe',
      email: 'jane.doe@university.edu',
      department: 'Electrical Engineering',
      designation: 'Professor',
      employeeId: 'EMP002',
      joinDate: '2020-02-20',
      status: 'active',
      subjects: ['Electrical Circuits', 'Control Systems', 'Power Electronics'],
      imageUrl: 'https://ui-avatars.com/api/?name=Jane+Doe',
      rating: 4.7,
    }
    // Add more teacher data as needed
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'on_leave': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}  className="text-3xl font-bold text-white">
            Teachers
          </Text>
          <TouchableOpacity 
            className="bg-white/20 px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push('/(administrators)/teachers/add')}
          >
            <FontAwesome name="plus" size={16} color="white" />
            <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-white ml-2">Add Teacher</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white/10 rounded-lg px-4 py-2">
          <FontAwesome name="search" size={16} color="white" />
          <TextInput
            style={{fontFamily: 'Poppins_400Regular'}}    
            className="flex-1 ml-3 text-white"
            placeholder="Search teachers..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View className="p-6">
        {/* Filters */}
        <View className="mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-3"
          >
            {departments.map((dept) => (
              <TouchableOpacity
                key={dept.id}
                className={`
                  px-4 py-2 rounded-lg
                  ${selectedDepartment === dept.id 
                    ? 'bg-[#1a367b]' 
                    : 'bg-white dark:bg-gray-800'}
                `}
                onPress={() => setSelectedDepartment(dept.id)}
              >
                <Text style={{fontFamily: 'Poppins_400Regular'}}   className={
                  selectedDepartment === dept.id 
                    ? 'text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }>
                  {dept.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Status Filters */}
        {/* <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row gap-2">
            {statusFilters.map((status) => (
              <TouchableOpacity
                key={status.id}
                className={`
                  px-3 py-1 rounded-lg
                  ${selectedStatus === status.id 
                    ? 'bg-[#1a367b]' 
                    : 'bg-gray-100 dark:bg-gray-800'}
                `}
                onPress={() => setSelectedStatus(status.id)}
              >
                <Text style={{fontFamily: 'Poppins_400Regular'}}   className={
                  selectedStatus === status.id 
                    ? 'text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }>
                  {status.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

           Sort Button 
          <TouchableOpacity 
            className="flex-row items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-lg"
            onPress={() => { Handle sort options }}
          >
            <FontAwesome name="sort" size={14} color="#6b7280" />
            <Text style={{fontFamily: 'Poppins_400Regular'}}    className="ml-2 text-gray-600 dark:text-gray-400">Sort</Text>
          </TouchableOpacity>
        </View> */}

        {/* Teachers List */}
        <View className="gap-y-4">
          {teachers.map((teacher) => (
            <TouchableOpacity
              key={teacher.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
              onPress={() => {/* Navigate to teacher details */}}
            >
              <View className="flex-row items-start">
                <Image
                  source={{ uri: teacher.imageUrl}}
                  className="w-16 h-16 rounded-full border border-gray-300 bg-gray-200"
                  resizeMode="contain"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text style={{fontFamily: 'Poppins_600SemiBold'}}  className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {teacher.name}
                      </Text>
                      <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-gray-500 dark:text-gray-400">
                        {teacher.designation}
                      </Text>
                    </View>
                    {/* <View className={`px-2 py-1 rounded-full ${getStatusColor(teacher.status)}`}>
                      <Text className="text-sm capitalize">
                        {teacher.status.replace('_', ' ')}
                      </Text>
                    </View> */}
                  </View>

                  <View className="flex-row items-center mt-2">
                    <FontAwesome name="building" size={14} color="#6b7280" />
                    <Text style={{fontFamily: 'Poppins_400Regular'}}  className="ml-2 text-gray-600 dark:text-gray-400">
                      {teacher.department}
                    </Text>
                  </View>

                  <View className="flex-row flex-wrap mt-3">
                    {teacher.subjects.map((subject, index) => (
                      <View 
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 mr-2 mb-2"
                      >
                        <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-xs text-gray-600 dark:text-gray-300">
                          {subject}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                className="absolute top-4 right-4"
                onPress={() => {/* Show more options */}}
              >
                <FontAwesome name="ellipsis-v" size={18} color="#6b7280" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
