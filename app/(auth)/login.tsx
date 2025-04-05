import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Pressable
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '@/components/InputField';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    router.push('/(administrators)');
  };


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Header with Logo */}
        <LinearGradient
          colors={['#1a367b', '#1E40AF']}
          className="pt-16 pb-12 rounded-b-[40px]"
        >
          <View className="items-center">
            <View className="flex-row items-center justify-center">
              <Text style={{fontFamily: 'Poppins_700Bold'}} className="text-3xl font-bold text-white mt-4">
                ExamLock
              </Text>
            </View>
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-blue-100 text-base mt-2">
              Secure Online Examination Platform
            </Text>
          </View>
        </LinearGradient>

        {/* Login Form */}
        <View className="px-6 pt-8">
          <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
            <Text style={{fontFamily: 'Poppins_700Bold'}} className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome Back
            </Text>

            <View className="space-y-4">
              <InputField
                label="Username"
                value={formData.username}
                onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
                placeholder="Enter your username"
                required
                leftIcon={
                  <MaterialCommunityIcons 
                    name="account" 
                    size={20} 
                    color="#6B7280"
                  />
                }
              />

              <InputField
                label="Password"
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                required
                leftIcon={
                  <MaterialCommunityIcons 
                    name="lock" 
                    size={20} 
                    color="#6B7280"
                  />
                }
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                }
              />

              {/* Remember Me & Forgot Password */}
              <View className="flex-row items-center justify-between mb-2">
                <TouchableOpacity 
                  className="flex-row items-center"
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View className={`w-5 h-5 rounded border ${
                    rememberMe 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  } mr-2 items-center justify-center`}>
                    {rememberMe && (
                      <MaterialCommunityIcons name="check" size={16} color="white" />
                    )}
                  </View>
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 dark:text-gray-400">
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                  <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-blue-600 dark:text-blue-400">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className="bg-[#1a367b] py-4 rounded-xl mt-4"
                onPress={handleLogin}
              >
                <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white text-center font-semibold text-lg">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Alternative Login Methods */}
          {/* <View className="mt-8 mb-6">
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
              <Text className="mx-4 text-gray-500 dark:text-gray-400">
                Or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
            </View>

            <View className="flex-row justify-center gap-x-4">
              {['google', 'apple', 'microsoft'].map((provider) => (
                <TouchableOpacity
                  key={provider}
                  className="bg-white dark:bg-gray-800 w-14 h-14 rounded-full items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <MaterialCommunityIcons 
                    name={provider as any}
                    size={24}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View> */}

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8 mb-8">
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-blue-600 dark:text-blue-400 font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 