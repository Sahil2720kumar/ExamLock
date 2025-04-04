import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

export default function TeacherSettings() {
  const [settings, setSettings] = useState({
    notifications: {
      examReminders: true,
      studentSubmissions: true,
      resultPublished: true,
      systemUpdates: false,
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
      language: 'English',
    },
    privacy: {
      showProfile: true,
      showEmail: true,
      showPhone: false,
    },
    exam: {
      autoGrading: true,
      showResults: true,
      allowRetakes: false,
    },
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const SettingSection = ({ title, children }) => (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
      <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {title}
      </Text>
      {children}
    </View>
  );

  const SettingToggle = ({ label, value, onChange, description = null }) => (
    <View className="mb-4 last:mb-0">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-700 dark:text-gray-300">{label}</Text>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ false: '#d1d5db', true: '#1a367b' }}
          thumbColor={value ? '#ffffff' : '#ffffff'}
        />
      </View>
      {description && (
        <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {description}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text className="text-3xl font-bold text-white mb-2">
          Settings
        </Text>
        <Text className="text-gray-200 text-lg">
          Customize your teaching experience
        </Text>
      </View>

      <View className="p-6">
        {/* Profile Section */}
        <SettingSection title="Profile">
          <View className="items-center mb-6">
            <TouchableOpacity onPress={pickImage}>
              <View className="relative">
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
                    <FontAwesome name="user" size={40} color="#6b7280" />
                  </View>
                )}
                <View className="absolute bottom-0 right-0 bg-[#1a367b] rounded-full p-2">
                  <FontAwesome name="camera" size={14} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
              Dr. John Smith
            </Text>
            <Text className="text-gray-500 dark:text-gray-400">
              Computer Science Department
            </Text>
          </View>

          <TouchableOpacity 
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex-row justify-between items-center"
            onPress={() => router.push('/settings/edit-profile')}
          >
            <Text className="text-gray-700 dark:text-gray-300">Edit Profile</Text>
            <FontAwesome name="chevron-right" size={14} color="#6b7280" />
          </TouchableOpacity>
        </SettingSection>

        {/*  Settings Warning: Feature Not Implemented*/}
        <View className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
          <Text className="text-yellow-700 dark:text-yellow-300">
          Settings Warning: Feature Not Implemented
          </Text>
        </View>

        {/* Notification Settings */}
        <SettingSection title="Notifications">
          <SettingToggle
            label="Exam Reminders"
            value={settings.notifications.examReminders}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, examReminders: value }
            }))}
            description="Get notified about upcoming exams"
          />
          <SettingToggle
            label="Student Submissions"
            value={settings.notifications.studentSubmissions}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, studentSubmissions: value }
            }))}
          />
          <SettingToggle
            label="Result Published"
            value={settings.notifications.resultPublished}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, resultPublished: value }
            }))}
          />
        </SettingSection>

        {/* Exam Settings */}
        <SettingSection title="Exam Preferences">
          <SettingToggle
            label="Auto Grading"
            value={settings.exam.autoGrading}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              exam: { ...prev.exam, autoGrading: value }
            }))}
            description="Automatically grade objective questions"
          />
          <SettingToggle
            label="Show Results Immediately"
            value={settings.exam.showResults}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              exam: { ...prev.exam, showResults: value }
            }))}
          />
          <SettingToggle
            label="Allow Retakes"
            value={settings.exam.allowRetakes}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              exam: { ...prev.exam, allowRetakes: value }
            }))}
          />
        </SettingSection>

        {/* Privacy Settings */}
        <SettingSection title="Privacy">
          <SettingToggle
            label="Show Profile"
            value={settings.privacy.showProfile}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              privacy: { ...prev.privacy, showProfile: value }
            }))}
          />
          <SettingToggle
            label="Show Email"
            value={settings.privacy.showEmail}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              privacy: { ...prev.privacy, showEmail: value }
            }))}
          />
          <SettingToggle
            label="Show Phone Number"
            value={settings.privacy.showPhone}
            onChange={(value) => setSettings(prev => ({
              ...prev,
              privacy: { ...prev.privacy, showPhone: value }
            }))}
          />
        </SettingSection>

        {/* Account Actions */}
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-white dark:bg-gray-800 rounded-xl p-4 flex-row justify-between items-center"
            onPress={() => {/* Handle password change */}}
          >
            <View className="flex-row items-center">
              <FontAwesome name="lock" size={16} color="#6b7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">
                Change Password
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white dark:bg-gray-800 rounded-xl p-4 flex-row justify-between items-center"
            onPress={() => {/* Handle help center */}}
          >
            <View className="flex-row items-center">
              <FontAwesome name="question-circle" size={16} color="#6b7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">
                Help Center
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mt-4"
            onPress={() => Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive' },
              ]
            )}
          >
            <Text className="text-red-600 dark:text-red-400 text-center font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}