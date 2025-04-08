import React from 'react';
import { View, Text, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useProfileStore } from '@/store/profileStore';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentProfileByEmail } from '@/api/students';
import { supabase } from '@/utils/supabase';
import { useSessionStore } from '@/store/sessionStore';
import { fetchTeacherProfileByEmail } from '@/api/teachers';
type UserRole = 'administrator' | 'teacher' | 'student';

const COLORS = {
  primary: '#1a367b',
  secondary: '#4f85e5',
  accent: '#ff7b25',
  background: '#f5f7fa',
  white: '#ffffff',
  gradient: {
    admin: ['#1a367b', '#2a4694'],
    professor: ['#1a367b', '#2a4694'],
    student: ['#1a367b', '#2a4694']
  },
  dark: {
    primary: '#142a61',
    background: '#1a1a1a',
    surface: '#2d2d2d',
  }
};

export default function Profile() {
  const { username } = useLocalSearchParams();
  const { profile, clearProfile } = useProfileStore();
  const { clearSession } = useSessionStore();

  const signOut = () => {
    supabase.auth.signOut();
    clearProfile();
    clearSession();
    router.dismissAll();
    router.replace('/login');
  }

  // Safely get the role from profile
  const userRole = profile?.role?.toLowerCase() as UserRole || 'student';

  const { data: userProfile, isLoading, error } = useQuery({
    queryKey: [userRole, username],
    queryFn: () => {
      if (userRole === 'student') {
        return fetchStudentProfileByEmail(username as string);
      } else if (userRole === 'administrator') {
        // return fetchAdministratorProfileByEmail(username as string);
        return null;
      } else if (userRole === 'teacher') {
        return fetchTeacherProfileByEmail(username as string);
      }
      return null;
    },
    enabled: !!username && !!profile?.role // Only run query if username and role exist
  });

  console.log("username", username);
  console.log("userRole", userRole);  
  console.log("fetch user", userProfile);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f5f7fa]">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="mt-4">Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f5f7fa] p-6">
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color={COLORS.secondary} />
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg mt-4 text-center">
          Error loading profile
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 text-center mt-2">
          {error?.message || "Something went wrong. Please try again."}
        </Text>
        <Pressable 
          onPress={() => router.back()}
          className="mt-6 bg-[#4f85e5] py-3 px-6 rounded-full"
        >
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // Handle case where user profile couldn't be found
  if (!userProfile) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f5f7fa] p-6">
        <MaterialCommunityIcons name="account-question" size={48} color={COLORS.secondary} />
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg mt-4 text-center">
          Profile Not Found
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 text-center mt-2">
          The requested profile couldn't be loaded or doesn't exist.
        </Text>
        <Pressable 
          onPress={() => router.back()}
          className="mt-6 bg-[#4f85e5] py-3 px-6 rounded-full"
        >
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const getRoleGradient = (role: UserRole): string[] => {
    switch (role) {
      case 'administrator': return COLORS.gradient.admin;
      case 'teacher': return COLORS.gradient.professor;
      case 'student': return COLORS.gradient.student;
      default: return COLORS.gradient.student;
    }
  };

  const getRoleIcon = (role: UserRole): string => {
    switch (role) {
      case 'administrator': return 'shield-crown';
      case 'teacher': return 'teach';
      case 'student': return 'school';
      default: return 'account';
    }
  };

  const getProfileActions = (role: UserRole) => {
    const commonActions = [
      { title: 'Edit Profile', icon: 'account-edit', badge: null },
      { title: 'Settings', icon: 'cog', badge: null },
      { title: 'Help & Support', icon: 'help-circle', badge: null },
      { title: 'Logout', icon: 'logout', badge: null, onPress: () => signOut() },
    ];

    switch (role) {
      case 'administrator':
        return [
          { title: 'User Management', icon: 'account-group', badge: '23' },
          { title: 'System Settings', icon: 'tune', badge: null },
          { title: 'Access Logs', icon: 'clipboard-list', badge: '5' },
          ...commonActions,
        ];
      case 'teacher':
        return [
          { title: 'My Exams', icon: 'file-document', badge: '4' },
          { title: 'Grade Reports', icon: 'chart-box', badge: '12' },
          { title: 'Student List', icon: 'account-group', badge: '156' },
          ...commonActions,
        ];
      case 'student':
      default:
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
        colors={getRoleGradient(userRole)}
        className="h-64 rounded-b-[40px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header content if needed */}
      </LinearGradient>

      {/* Profile Card */}
      <View className="px-6 -mt-32">
        <View className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
          <View className="items-center">
            <Image
              source={{ 
                uri: userProfile.profile_image || 
                     `https://ui-avatars.com/api/?name=${encodeURIComponent(
                       (userProfile.first_name || '') + ' ' + (userProfile.last_name || '')
                     )}`
              }}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md"
            />
            <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
              {`${userProfile.first_name || ''} ${userProfile.last_name || ''}`}
            </Text>
            <View className="flex-row items-center mt-1 bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full">
              <MaterialCommunityIcons
                name={getRoleIcon(userRole)}
                size={16}
                color={COLORS.secondary}
              />
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-2 text-sm text-gray-600 dark:text-gray-400 capitalize">
                {profile?.role || "User"}
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
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-3 text-gray-600 dark:text-gray-400">
                {userProfile.email || "No email available"}
              </Text>
            </View>
            {userProfile.department && (
              <View className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                <MaterialCommunityIcons
                  name="domain"
                  size={20}
                  color={COLORS.secondary}
                />
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-3 text-gray-600 dark:text-gray-400">
                  {userProfile.department}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Actions Section */}
      <View className="p-6">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </Text>
        <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {getProfileActions(userRole).map((action, index) => (
            <Pressable
              key={action.title}
              onPress={action.onPress}
              className={`flex-row items-center px-6 py-4 
                ${index !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}
                active:bg-gray-50 dark:active:bg-gray-700`}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${COLORS.secondary}15` }}
              >
                <MaterialCommunityIcons
                  name={action.icon as any}
                  size={20}
                  color={COLORS.secondary}
                />
              </View>
              <Text style={{fontFamily: 'Poppins_400Regular'}} className="flex-1 ml-3 text-gray-700 dark:text-gray-300 font-medium">
                {action.title}
              </Text>
              {action.badge && (
                <View className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full mr-2">
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-xs text-red-600 dark:text-red-300 font-medium">
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