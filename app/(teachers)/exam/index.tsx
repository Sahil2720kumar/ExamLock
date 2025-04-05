import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

interface Exam {
  id: number;
  title: string;
  date: string;
  duration: string;
  students: number;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
}

export default function ExamManagement() {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      title: 'Final Exam - Advanced Mathematics',
      date: '2024-04-15T09:00:00',
      duration: '180',
      students: 45,
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Midterm - Computer Science',
      date: '2024-04-10T14:00:00',
      duration: '120',
      students: 32,
      status: 'draft',
    },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newExam, setNewExam] = useState({
    title: '',
    date: '',
    duration: '',
    students: '',
  });

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-200 text-gray-700',
      scheduled: 'bg-blue-200 text-blue-700',
      active: 'bg-green-200 text-green-700',
      completed: 'bg-purple-200 text-purple-700',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Exam",
      "Are you sure you want to delete this exam?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => setExams(exams.filter(exam => exam.id !== id))
        }
      ]
    );
  };

  const handleEdit = (exam: Exam) => {
    console.log("exam", exam);
    setEditingExam(exam);
    router.push("/exam/edit")
  };
 

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-3xl font-bold text-white mb-2">
          Exam Management
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-200 text-lg">
          Manage all your exams in one place
        </Text>
      </View>

      {/* Search and Add Section */}
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-1 mr-4">
            <TextInput
              style={{fontFamily: 'Poppins_400Regular'}}
              className="bg-white dark:bg-gray-800 dark:text-white px-4 py-2 rounded-lg"
              placeholder="Search exams..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            className="bg-[#1a367b] px-4 py-2 rounded-lg flex-row items-center"
            onPress={() => router.push('/exam/create')}
          >
            <FontAwesome name="plus" size={16} color="white" />
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white ml-2">Add Exam</Text>
          </TouchableOpacity>
        </View>

        {/* Exams List */}
        <View className="gap-4">
          {exams.map((exam) => (
            <View 
              key={exam.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {exam.title}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <FontAwesome name="calendar" size={14} color="#6b7280" />
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-2 text-gray-600 dark:text-gray-400">
                      {new Date(exam.date).toLocaleDateString()}
                    </Text>
                    <FontAwesome name="clock-o" size={14} color="#6b7280" className="ml-4" />
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-2 text-gray-600 dark:text-gray-400">
                      {exam.duration} mins
                    </Text>
                    <FontAwesome name="users" size={14} color="#6b7280" className="ml-4" />
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-2 text-gray-600 dark:text-gray-400">
                      {exam.students} students
                    </Text>
                  </View>
                </View>
                <View className={`px-3 py-1 rounded-full ${getStatusColor(exam.status)}`}>
                  <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-sm capitalize">{exam.status}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-end mt-4 gap-2">
                <TouchableOpacity 
                  className="bg-blue-100 p-2 rounded-lg"
                  onPress={() => handleEdit(exam)}
                >
                  <FontAwesome name="edit" size={16} color="#1d4ed8" />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-red-100 p-2 rounded-lg"
                  onPress={() => handleDelete(exam.id)}
                >
                  <FontAwesome name="trash" size={16} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>


    </ScrollView>
  );
}
