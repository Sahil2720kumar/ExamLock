import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

type UserRole = 'administrator' | 'professor' | 'student';

const COLORS = {
  primary: '#1a367b',
  secondary: '#4f85e5',
  accent: '#ff7b25',
  background: '#f5f7fa',
  white: '#ffffff',
  gradient: {
    admin: ['#1a367b', '#2a4694'],
    professor: ['#4f85e5', '#2a4694'],
    student: ['#ff7b25', '#ff9f57']
  },
  dark: {
    primary: '#142a61',
    background: '#1a1a1a',
    surface: '#2d2d2d',
  }
};

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    department?: string;
    studentId?: string;
    courseCount?: number;
    examsTaken?: number;
    averageScore?: number;
    lastActive?: string;
    badges?: string[];
  };
}

export default function Profile() {
  const { username } = useLocalSearchParams();
  const user = {
    name: 'John Admin',
    email: 'john.admin@examlock.com',
    role: 'student' as UserRole,
    department: 'IT Administration',
    avatar: 'https://ui-avatars.com/api/?name=John+Admin',
    studentId: '1234567890',
    courseCount: 5,
    examsTaken: 20,
    averageScore: 85,
    lastActive: '2023-01-15',
    badges: ['badge1', 'badge2', 'badge3'],
  };

  const getRoleGradient = (role: UserRole): string[] => {
    switch (role) {
      case 'administrator': return COLORS.gradient.admin;
      case 'professor': return COLORS.gradient.professor;
      case 'student': return COLORS.gradient.student;
    }
  };

  const getRoleIcon = (role: UserRole): string => {
    switch (role) {
      case 'administrator': return 'shield-crown';
      case 'professor': return 'teach';
      case 'student': return 'school';
    }
  };

  const getProfileActions = (role: UserRole) => {
    const commonActions = [
      { title: 'Edit Profile', icon: 'account-edit', badge: null },
      { title: 'Settings', icon: 'cog', badge: null },
      { title: 'Help & Support', icon: 'help-circle', badge: null },
    ];

    switch (role) {
      case 'administrator':
        return [
          { title: 'User Management', icon: 'account-group', badge: '23' },
          { title: 'System Settings', icon: 'tune', badge: null },
          { title: 'Access Logs', icon: 'clipboard-list', badge: '5' },
          ...commonActions,
        ];
      case 'professor':
        return [
          { title: 'My Exams', icon: 'file-document', badge: '4' },
          { title: 'Grade Reports', icon: 'chart-box', badge: '12' },
          { title: 'Student List', icon: 'account-group', badge: '156' },
          ...commonActions,
        ];
      case 'student':
        return [
          { title: 'My Courses', icon: 'book-open-variant', badge: '6' },
          { title: 'Exam History', icon: 'history', badge: '12' },
          { title: 'Performance', icon: 'chart-line', badge: null },
          ...commonActions,
        ];
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#f5f7fa] dark:bg-gray-900">
      {/* Header Section */}

      <LinearGradient
        colors={ ['#1a367b', '#2a4694']}
        className="h-64 rounded-b-[40px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <View className="flex-1 px-6 pt-12">
          <View className="flex-row items-center justify-between">
            <MaterialCommunityIcons name="menu" size={24} color={COLORS.white} />
            <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.white} />
          </View>
        </View> */}
      </LinearGradient>

      {/* Profile Card */}
      <View className="px-6 -mt-32">
        <View className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
          <View className="items-center">
            <Image
              source={{ uri: user.avatar || 'https://ui-avatars.com/api/?name=' + user.name }}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md"
            />
            <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
              {user.name}
            </Text>
            <View className="flex-row items-center mt-1 bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full">
              <MaterialCommunityIcons
                name={getRoleIcon(user.role)}
                size={16}
                color={COLORS.secondary}
              />
              <Text className="ml-2 text-sm text-gray-600 dark:text-gray-400 capitalize">
                {user.role}
              </Text>
            </View>
          </View>

          <View className="mt-6 space-y-3">
            <View className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
              <MaterialCommunityIcons
                name="email"
                size={20}
                color={COLORS.secondary}
              />
              <Text className="ml-3 text-gray-600 dark:text-gray-400">
                {user.email}
              </Text>
            </View>
            {user.department && (
              <View className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                <MaterialCommunityIcons
                  name="domain"
                  size={20}
                  color={COLORS.secondary}
                />
                <Text className="ml-3 text-gray-600 dark:text-gray-400">
                  {user.department}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Stats Section */}
      {user.role === 'student' && (
        <View className="mt-6 px-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Performance Overview
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <View className="flex-row justify-between">
              <View className="items-center">
                <View className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-full items-center justify-center mb-2">
                  <Text className="text-xl font-bold text-[#1a367b] dark:text-blue-300">
                    {user.examsTaken}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Exams
                </Text>
              </View>
              <View className="items-center">
                <View className="bg-green-50 dark:bg-green-900/30 w-12 h-12 rounded-full items-center justify-center mb-2">
                  <Text className="text-xl font-bold text-green-600 dark:text-green-300">
                    {user.averageScore}%
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Average
                </Text>
              </View>
              <View className="items-center">
                <View className="bg-purple-50 dark:bg-purple-900/30 w-12 h-12 rounded-full items-center justify-center mb-2">
                  <Text className="text-xl font-bold text-purple-600 dark:text-purple-300">
                    {user.courseCount}
                  </Text>
                </View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Courses
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Actions Section */}
      <View className="p-6">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {getProfileActions(user.role).map((action, index) => (
            <Pressable
              key={action.title}
              className={`flex-row items-center px-6 py-4 
                ${index !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}
                active:bg-gray-50 dark:active:bg-gray-700`}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${COLORS.secondary}15` }}
              >
                <MaterialCommunityIcons
                  name={action.icon}
                  size={20}
                  color={COLORS.secondary}
                />
              </View>
              <Text className="flex-1 ml-3 text-gray-700 dark:text-gray-300 font-medium">
                {action.title}
              </Text>
              {action.badge && (
                <View className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full mr-2">
                  <Text className="text-xs text-red-600 dark:text-red-300 font-medium">
                    {action.badge}
                  </Text>
                </View>
              )}
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={COLORS.secondary}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}