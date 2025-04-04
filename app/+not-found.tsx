import { Link, router, Stack } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ 
        title: 'Oops!',
        headerShown: false 
      }} />
      
      <View className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Header Background */}
        <View className="absolute top-0 w-full h-60 bg-[#1a367b] dark:bg-[#0f1f4d]" />

        {/* Content */}
        <View className="flex-1 items-center justify-center px-6">
          {/* 404 Icon/Image */}
          <View className="w-60 h-60 bg-white dark:bg-gray-800 rounded-full items-center justify-center mb-8 shadow-lg">
            <FontAwesome name="compass" size={100} color="#1a367b" />
          </View>

          {/* Error Message */}
          <Text className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
            Oops!
          </Text>
          <Text className="text-xl text-gray-600 dark:text-gray-400 text-center mb-2">
            Page Not Found
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-500 text-center mb-8 max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </Text>

          {/* Navigation Links */}
          <View className="gap-y-4 w-full max-w-xs">
            <TouchableOpacity onPress={() => router.back()} className="bg-[#1a367b] py-3 px-6 rounded-xl">
              <Text className="text-white text-center font-semibold">
                Go Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/help')} className="bg-white dark:bg-gray-800 py-3 px-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <Text className="text-gray-700 dark:text-gray-300 text-center">
                Visit Help Center
              </Text>
            </TouchableOpacity>
          </View>

          {/* Additional Help */}
          <View className="mt-12 items-center">
            <Text className="text-gray-500 dark:text-gray-500 text-center mb-2">
              Need assistance?
            </Text>
            <Link href="/contact" asChild>
              <Text className="text-[#1a367b] dark:text-blue-400 font-medium">
                Contact Support
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}
