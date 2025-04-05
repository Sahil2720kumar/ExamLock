import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import InputField from '@/components/InputField';

interface StudentForm {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    profileImage?: string | null;
  };
  academic: {
    rollNumber?: string;
    year?: string;
    class?: string;
    section?: string;
    batch?: string;
    admissionDate?: string;
    college?: string;
  };
  guardian: {
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    guardianRelation?: string;
    guardianPhone?: string;
    guardianEmail?: string;
    guardianOccupation?: string;
    guardianAddress?: string;
  };
  account: {
    username: string;
    password: string;
  };

}

export default function EditProfile() {
  const [formData, setFormData] = useState<StudentForm>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      profileImage: null,
    },
    academic: {
      rollNumber: '',
      year: '',
      class: '',
      section: '',
      batch: '',
      admissionDate: '',
      college: '',
    },
    guardian: {
      fatherName: '',
      motherName: '',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianOccupation: '',
      guardianAddress: '',
    },
    account: {
      username: '',
      password: '',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        personal: { ...prev.personal, profileImage: result.assets[0].uri }
      }));
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        className="px-6 pt-12 pb-8"
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            // className="bg-white/20 p-2 rounded-full"
          >
            {/* <FontAwesome name="arrow-left" size={20} color="white" /> */}
          </TouchableOpacity>
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}    className="text-white text-lg font-semibold">Edit Profile</Text>
          <View className="w-10" /> {/* Spacer for alignment */}
        </View>
      </LinearGradient>

      {/* Profile Image Section */}
      <View className="items-center -mt-16 mb-6">
        <TouchableOpacity 
          onPress={pickImage}
          className="relative"
        >
          <View className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            {formData.personal.profileImage ? (
              <Image
                source={{ uri: formData.personal.profileImage }}
                className="w-full h-full"
              />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <FontAwesome name="user" size={50} color="#9CA3AF" />
              </View>
            )}
          </View>
          <View className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full shadow-lg">
            <FontAwesome name="camera" size={16} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <View className="px-6">
        {/* Personal Information Card */}
        <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}    className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </Text>
          
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
              <InputField
                label="First Name"
                value={formData.personal.firstName}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, firstName: text }
                }))}
                placeholder="Enter first name"
                required
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Last Name"
                value={formData.personal.lastName}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, lastName: text }
                }))}
                placeholder="Enter last name"
                required
              />
            </View>
          </View>

          <InputField
            label="Email"
            value={formData.personal.email}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              personal: { ...prev.personal, email: text }
            }))}
            placeholder="Enter email address"
            keyboardType="email-address"
            required
          />

          <InputField
            label="Phone Number"
            value={formData.personal.phone}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              personal: { ...prev.personal, phone: text }
            }))}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            required
          />

          {/* Gender Selection */}
          <View className="mb-4">
            <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Gender
            </Text>
            <View className="flex-row gap-3">
              {(['male', 'female', 'other'] as const).map((gender) => (
                <TouchableOpacity
                  key={gender}
                  className={`flex-1 py-3 rounded-xl border ${
                    formData.personal.gender === gender
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-gray-200 dark:border-gray-700'
                  }`}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, gender }
                  }))}
                >
                  <Text style={{fontFamily: 'Poppins_400Regular'}}    className={`text-center capitalize ${
                    formData.personal.gender === gender
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Academic Information Card */}
        <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}    className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Academic Information
          </Text>

          <InputField
            label="Roll Number"
            value={formData.academic.rollNumber}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              academic: { ...prev.academic, rollNumber: text }
            }))}
            placeholder="Enter roll number"
            required
          />

          <InputField
            label="College"
            value={formData.academic.college}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              academic: { ...prev.academic, college: text }
            }))}
            placeholder="Enter college/school name"
            required
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <InputField
                label="Class"
                value={formData.academic.class}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  academic: { ...prev.academic, class: text }
                }))}
                placeholder="Enter class"
                required
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Section"
                value={formData.academic.section}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  academic: { ...prev.academic, section: text }
                }))}
                placeholder="Enter section"
                required
              />
            </View>
          </View>
        </View>

        {/* Guardian Information Card */}
        <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}    className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Guardian Information
          </Text>

          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
              <InputField
                label="Father's Name"
                value={formData.guardian.fatherName}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  guardian: { ...prev.guardian, fatherName: text }
                }))}
                placeholder="Enter father's name"
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Mother's Name"
                value={formData.guardian.motherName}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  guardian: { ...prev.guardian, motherName: text }
                }))}
                placeholder="Enter mother's name"
              />
            </View>
          </View>

          <InputField
            label="Guardian Name"
            value={formData.guardian.guardianName}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              guardian: { ...prev.guardian, guardianName: text }
            }))}
            placeholder="Enter guardian's name"
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <InputField
                label="Relation with Guardian"
                value={formData.guardian.guardianRelation}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  guardian: { ...prev.guardian, guardianRelation: text }
                }))}
                placeholder="Enter relation"
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Guardian Phone"
                value={formData.guardian.guardianPhone}
                onChangeText={(text: string) => setFormData(prev => ({
                  ...prev,
                  guardian: { ...prev.guardian, guardianPhone: text }
                }))}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <InputField
            label="Guardian Email"
            value={formData.guardian.guardianEmail}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              guardian: { ...prev.guardian, guardianEmail: text }
            }))}
            placeholder="Enter guardian's email"
            keyboardType="email-address"
          />

          <InputField
            label="Guardian Occupation"
            value={formData.guardian.guardianOccupation}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              guardian: { ...prev.guardian, guardianOccupation: text }
            }))}
            placeholder="Enter guardian's occupation"
          />

          <InputField
            label="Guardian Address"
            value={formData.guardian.guardianAddress}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              guardian: { ...prev.guardian, guardianAddress: text }
            }))}
            placeholder="Enter guardian's address"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Account Information Card */}
        <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}    className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </Text>

          <InputField
            label="Username"
            disabled={true}
            value={formData.account.username}
            onChangeText={(text: string) => setFormData(prev => ({
              ...prev,
              account: { ...prev.account, username: text }
            }))}
            placeholder="Enter username"
            required
          />

          <View className="mb-4">
            <InputField
              label="Password"
              value={formData.account.password}
              onChangeText={(text: string) => setFormData(prev => ({
                ...prev,
                account: { ...prev.account, password: text }
              }))}
              placeholder="Enter new password"
              secureTextEntry
            />
            <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-xs text-gray-500 mt-1">
              Leave blank if you don't want to change password
            </Text>
          </View>

          {/* Password Requirements Info */}
          {formData.account.password && (
            <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
              <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Password Requirements:
              </Text>
              <View className="space-y-1">
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-xs text-blue-700 dark:text-blue-300">
                  • Minimum 8 characters
                </Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-xs text-blue-700 dark:text-blue-300">
                  • At least one uppercase letter
                </Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-xs text-blue-700 dark:text-blue-300">
                  • At least one number
                </Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}    className="text-xs text-blue-700 dark:text-blue-300">
                  • At least one special character
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          className="bg-blue-600 py-4 px-6 rounded-2xl shadow-lg mb-8"
          onPress={() => {
            // Handle save profile logic here
            router.back();
          }}
        >
          <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-white text-center font-semibold text-lg">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
