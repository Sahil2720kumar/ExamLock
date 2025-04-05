import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExamCardProps {
  title: string;
  date: string;
  students: number;
  duration: string;
  status: 'scheduled' | 'draft' | 'in-progress' | 'completed';
  onPress?: () => void;
}

export function ExamCard({ title, date, students, duration, status, onPress }: ExamCardProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'scheduled':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-700 dark:text-blue-300',
          icon: 'calendar-clock'
        };
      case 'draft':
        return {
          bg: 'bg-gray-100 dark:bg-gray-700/30',
          text: 'text-gray-700 dark:text-gray-300',
          icon: 'pencil-outline'
        };
      case 'in-progress':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-700 dark:text-green-300',
          icon: 'play-circle-outline'
        };
      case 'completed':
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          text: 'text-purple-700 dark:text-purple-300',
          icon: 'check-circle-outline'
        };
    }
  };

  const statusStyle = getStatusStyle();
  const examDate = new Date(date);
  const timeUntilExam = getTimeUntilExam(examDate);

  return (
    <TouchableOpacity 
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-start mb-3">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1 mr-3">
          {title}
        </Text>
        <View className={`${statusStyle.bg} rounded-full px-3 py-1 flex-row items-center`}>
          <MaterialCommunityIcons
            name={statusStyle.icon}
            size={16}
            className={statusStyle.text}
          />
          <Text style={{fontFamily: 'Poppins_400Regular'}} className={`${statusStyle.text} text-sm font-medium ml-1 capitalize`}>
            {status}
          </Text>
        </View>
      </View>

      <View className="border-b border-gray-100 dark:border-gray-700 pb-3">
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm font-medium text-[#4f85e5] dark:text-[#6d9eff]">
          {timeUntilExam}
        </Text>
      </View>

      <View className="flex-row items-center mt-3 gap-6">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="account-group"
            size={18}
            color="#64748b"
          />
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm text-gray-600 dark:text-gray-300 ml-2">
            {students} Students
          </Text>
        </View>

        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="clock-outline"
            size={18}
            color="#64748b"
          />
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm text-gray-600 dark:text-gray-300 ml-2">
            {duration} mins
          </Text>
        </View>

        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="calendar"
            size={18}
            color="#64748b"
          />
          <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-sm text-gray-600 dark:text-gray-300 ml-2">
            {examDate.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function getTimeUntilExam(examDate: Date): string {
  const now = new Date();
  const diff = examDate.getTime() - now.getTime();
  
  if (diff < 0) return 'Exam has started';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `Starts in ${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `Starts in ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}
