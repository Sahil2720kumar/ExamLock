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
  startTime: '09:00 AM',
  endTime: '11:00 AM',
  venue: 'Hall A',
  teacher: 'Dr. Smith',
};

export default function ExamDetails() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header Banner */}
      <LinearGradient
        colors={['#1a367b', '#1a367b']}
        className="px-6 pt-12 pb-8 rounded-b-3xl"
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            // onPress={() => router.back()}
            className="bg-white/20 p-2 rounded-full"
          >
            {/* <FontAwesome name="arrow-left" size={20} color="white" /> */}
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
        <View className="gap-y-6">
          {/* Time & Location Card */}
          <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Time & Location
            </Text>
            <View className="gap-y-4">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full">
                  <FontAwesome name="calendar" size={20} color="#1a367b" />
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
                  <FontAwesome name="clock-o" size={20} color="#1a367b" />
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
                  <FontAwesome name="map-marker" size={20} color="#1a367b" />
                </View>
                <View className="ml-3">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Location</Text>
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {exam.venue}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Teacher
            </Text>
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full">
                <FontAwesome name="user" size={20} color="#1a367b" />
                </View>
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                  {exam.teacher}
                </Text>
              </View>
            </View>
            
          </View>
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