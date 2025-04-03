import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onPress?: () => void;
}

export function StatsCard({ title, value, trend, onPress }: StatsCardProps) {
  const getIcon = () => {
    switch (title) {
      case 'Active Exams':
        return 'file-document-outline';
      case 'Students Online':
        return 'account-group';
      case 'Completed Today':
        return 'checkbox-marked-circle-outline';
      case 'Pending Review':
        return 'clock-outline';
      default:
        return 'chart-box-outline';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex-1 min-w-[160px]"
    >
      <Stack.Screen options={{title: "ExamLock"}} />
      <View className="flex-row justify-between items-start mb-2">
        <View className="bg-blue-50 dark:bg-blue-900/30 rounded-full p-2">
          <MaterialCommunityIcons
            name={getIcon()}
            size={20}
            color="#4f85e5"
          />
        </View>
        {trend && (
          <View className={`flex-row items-center rounded-full px-2 py-1 
            ${trend.isPositive ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}
          >
            <MaterialCommunityIcons
              name={trend.isPositive ? 'trending-up' : 'trending-down'}
              size={16}
              color={trend.isPositive ? '#4ade80' : '#f87171'}
            />
            <Text
              className={`text-xs font-medium ml-1
                ${trend.isPositive ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}
            >
              {Math.abs(trend.value)}%
            </Text>
          </View>
        )}
      </View>

      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 ">
        {value}
      </Text>

      <Text className="text-sm text-gray-600 dark:text-gray-400">
        {title}
      </Text>
    </Pressable>
  );
}
