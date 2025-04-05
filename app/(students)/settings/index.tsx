import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const SettingItem = ({
    icon,
    title,
    description,
    isSwitch,
    value,
    onValueChange,
    onPress
  }: {
    icon: string;
    title: string;
    description?: string;
    isSwitch?: boolean;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl mb-4 shadow-sm"
    >
      <View className="flex-row items-center flex-1">
        <View className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          <FontAwesome name={icon} size={20} color="#3B82F6" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </Text>
          {description && (
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {description}
            </Text>
          )}
        </View>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
          thumbColor={value ? '#3B82F6' : '#9CA3AF'}
        />
      ) : (
        <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        className="px-6 pt-12 pb-6"
      >
        <Text className="text-2xl font-bold text-white">Settings</Text>
      </LinearGradient>

      {/* Settings Groups */}
      <View className="p-6">
        {/* App Preferences */}

        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            App Preferences
          </Text>
          {/*  Settings Warning: Feature Not Implemented*/}
          <View className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
            <Text className="text-yellow-700 dark:text-yellow-300">
              Settings Warning: Feature Not Implemented
            </Text>
          </View>
          <SettingItem
            icon="bell"
            title="Notifications"
            description="Receive exam and updates notifications"
            isSwitch
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingItem
            icon="moon-o"
            title="Dark Mode"
            description="Switch between light and dark themes"
            isSwitch
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingItem
            icon="volume-up"
            title="Sound"
            description="Enable sound effects"
            isSwitch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
          />
          <SettingItem
            icon="mobile"
            title="Vibration"
            description="Enable vibration feedback"
            isSwitch
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
          />
        </View>

        {/* Account Settings */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Settings
          </Text>
          <SettingItem
            icon="user"
            title="Profile"
            description="Manage your personal information"
            onPress={() => router.push('/settings/edit-profile')}
          />
          <SettingItem
            icon="lock"
            title="Password"
            description="Change your password"
            onPress={() => router.push('/settings/password')}
          />
          <SettingItem
            icon="envelope"
            title="Email"
            description="Update your email address"
            onPress={() => router.push('/settings/email')}
          />
        </View>

        {/* Support & About */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Support & About
          </Text>
          <SettingItem
            icon="question-circle"
            title="Help Center"
            description="Get help and support"
            onPress={() => router.push('/settings/help')}
          />
          <SettingItem
            icon="info-circle"
            title="About"
            description="App version and information"
            onPress={() => router.push('/settings/about')}
          />
          <SettingItem
            icon="file-text"
            title="Terms & Privacy"
            description="Read our policies"
            onPress={() => router.push('/settings/terms')}
          />
        </View>

        {/* Danger Zone */}
        <View>
          <TouchableOpacity
            className="bg-red-50 p-4 rounded-2xl border border-red-200"
            onPress={() => router.push('/settings/logout')}
          >
            <View className="flex-row items-center">
              <FontAwesome name="sign-out" size={20} color="#EF4444" />
              <Text className="ml-3 text-red-600 font-semibold">Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
