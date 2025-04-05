import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const exam = {
  id: 1,
  title: 'Final Mathematics Examination',
  subject: 'Mathematics',
  date: '2024-01-01',
  duration: 120,
  students: 100,
  status: 'active',
  room: 'Room 301',
  startTime: '09:00 AM',
  endTime: '11:00 AM',
};

export default function ExamDetails() {
  const { id } = useLocalSearchParams();
  
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header Banner */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        className="px-6 pt-12 pb-8 rounded-b-3xl"
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full"
          >
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg ml-4">Exam Details</Text>
        </View>
        
        <Text className="text-3xl font-bold text-white mb-2">
          {exam.title}
        </Text>
        <Text className="text-blue-100 text-lg">{exam.subject}</Text>
      </LinearGradient>

      {/* Status Badge */}
      <View className="px-6">
        <View className={`${getStatusBackgroundColor(exam.status)} self-start px-4 py-2 rounded-full -mt-4 mb-6 shadow-sm`}>
          <Text className={`${getStatusTextColor(exam.status)} font-semibold`}>
            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
          </Text>
        </View>

        {/* Main Content Cards */}
        <View className="space-y-6">
          {/* Time & Location Card */}
          <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Time & Location
            </Text>
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full">
                  <FontAwesome name="calendar" size={20} color="#3B82F6" />
                </View>
                <View className="ml-3">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Date</Text>
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {new Date(exam.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full">
                  <FontAwesome name="clock-o" size={20} color="#3B82F6" />
                </View>
                <View className="ml-3">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Time</Text>
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {exam.startTime} - {exam.endTime} ({exam.duration} minutes)
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full">
                  <FontAwesome name="map-marker" size={20} color="#3B82F6" />
                </View>
                <View className="ml-3">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Location</Text>
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {exam.room}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Participants Card */}
          <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Participants
            </Text>
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <FontAwesome name="users" size={20} color="#3B82F6" />
              </View>
              <View className="ml-3">
                <Text className="text-sm text-gray-500 dark:text-gray-400">Total Students</Text>
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  {exam.students} students registered
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-6 mb-8 space-x-4">
          <TouchableOpacity 
            className="bg-white flex-1 px-6 py-4 rounded-2xl shadow-lg border border-blue-500"
            onPress={() => router.push(`/(teachers)/exam/edit?id=${id}`)}
          >
            <View className="flex-row items-center justify-center">
              <FontAwesome name="edit" size={20} color="#3B82F6" />
              <Text className="text-blue-500 font-bold ml-2 text-lg">Edit Exam</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-red-500 flex-1 px-6 py-4 rounded-2xl shadow-lg"
            onPress={() => {
              Alert.alert(
                "Cancel Exam",
                "Are you sure you want to cancel this exam? This action cannot be undone.",
                [
                  { text: "No", style: "cancel" },
                  { 
                    text: "Yes, Cancel", 
                    style: "destructive",
                    onPress: () => router.push(`/(teachers)/exam/cancel-exam?id=${id}`)
                  }
                ]
              );
            }}
          >
            <View className="flex-row items-center justify-center">
              <FontAwesome name="trash" size={20} color="white" />
              <Text className="text-white font-bold ml-2 text-lg">Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Helper functions for status styling
const getStatusBackgroundColor = (status: string) => {
  const colors = {
    draft: 'bg-gray-100',
    scheduled: 'bg-blue-100',
    active: 'bg-green-100',
    completed: 'bg-purple-100',
  };
  return colors[status as keyof typeof colors] || colors.draft;
};

const getStatusTextColor = (status: string) => {
  const colors = {
    draft: 'text-gray-700',
    scheduled: 'text-blue-700',
    active: 'text-green-700',
    completed: 'text-purple-700',
  };
  return colors[status as keyof typeof colors] || colors.draft;
};