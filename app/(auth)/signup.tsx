import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '@/components/InputField';



interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'teacher' | null;
}

export default function SignupScreen() {
  const [formData, setFormData] = useState<SignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Add your signup logic here
    router.push('/login');
  };

  const renderStepIndicator = () => (
    <View className="flex-row justify-center space-x-2 mb-6">
      {[1, 2].map((step) => (
        <View
          key={step}
          className={`w-16 h-1 rounded-full ${step <= currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View className="space-y-4">

      <InputField
        label="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
        placeholder="Enter first name"
        required
        leftIcon={
          <MaterialCommunityIcons name="account" size={20} color="#6B7280" />
        }
      />

      <InputField
        label="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
        placeholder="Enter last name"
        required
        leftIcon={
          <MaterialCommunityIcons name="account" size={20} color="#6B7280" />
        }
      />

      <InputField
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        placeholder="Enter your email"
        keyboardType="email-address"
        required
        leftIcon={
          <MaterialCommunityIcons name="email" size={20} color="#6B7280" />
        }
      />

      <InputField
        label="Phone Number"
        value={formData.phone}
        onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        required
        leftIcon={
          <MaterialCommunityIcons name="phone" size={20} color="#6B7280" />
        }
      />

      <TouchableOpacity
        className="bg-[#1a367b] py-4 rounded-xl mt-4"
        onPress={() => setCurrentStep(2)}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View className="space-y-4">
      {/* Role Selection */}
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Role <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row gap-4">
          {[
            { value: 'student', icon: 'school', label: 'Student' },
            { value: 'teacher', icon: 'account-group', label: 'Teacher' },
            // { value: 'administrator', icon: 'account-group', label: 'Admin' },
          ].map((role) => (
            <TouchableOpacity
              key={role.value}
              className={`flex-1 p-4 rounded-xl border ${formData.role === role.value
                ? 'bg-blue-50 border-blue-600 dark:bg-blue-900/20 dark:border-blue-500'
                : 'border-gray-200 dark:border-gray-700'
                }`}
              onPress={() => setFormData(prev => ({ ...prev, role: role.value as 'student' | 'teacher' }))}
            >
              <View className="items-center">
                <MaterialCommunityIcons
                  name={role.icon as any}
                  size={24}
                  color={formData.role === role.value ? '#2563EB' : '#6B7280'}
                />
                <Text className={`mt-2 font-medium ${formData.role === role.value
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
                  }`}>
                  {role.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <InputField
        label="Password"
        value={formData.password}
        onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
        placeholder="Create password"
        secureTextEntry={!showPassword}
        required
        leftIcon={
          <MaterialCommunityIcons name="lock" size={20} color="#6B7280" />
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

      <InputField
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
        placeholder="Confirm your password"
        secureTextEntry={!showPassword}
        required
        leftIcon={
          <MaterialCommunityIcons name="lock-check" size={20} color="#6B7280" />
        }
      />

      {/* Password Requirements */}
      <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
        <Text className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          Password Requirements:
        </Text>
        <View className="space-y-1">
          <Text className="text-xs text-blue-700 dark:text-blue-300">
            • Minimum 8 characters
          </Text>
          <Text className="text-xs text-blue-700 dark:text-blue-300">
            • At least one uppercase letter
          </Text>
          <Text className="text-xs text-blue-700 dark:text-blue-300">
            • At least one number
          </Text>
          <Text className="text-xs text-blue-700 dark:text-blue-300">
            • At least one special character
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 mt-4">
        <TouchableOpacity
          className="flex-1 bg-gray-200 dark:bg-gray-700 py-4 rounded-xl"
          onPress={() => setCurrentStep(1)}
        >
          <Text className="text-gray-700 dark:text-gray-200 text-center font-semibold text-lg">
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-[#1a367b] py-4 rounded-xl"
          onPress={handleSignup}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <LinearGradient
          colors={['#1a367b', '#1E40AF']}
          className="pt-16 pb-12 rounded-b-[40px]"
        >
          <View className="items-center">
            <TouchableOpacity
              className="absolute left-6 top-0"
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-white">
              Create Account
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              Join ExamLock today
            </Text>
          </View>
        </LinearGradient>

        {/* Form Content */}
        <View className="px-6 pt-8">
          <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
            {renderStepIndicator()}
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </View>

          {/* Sign In Link */}
          <View className="flex-row justify-center my-8">
            <Text className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-blue-600 dark:text-blue-400 font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}