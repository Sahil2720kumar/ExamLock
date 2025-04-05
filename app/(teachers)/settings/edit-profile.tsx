import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface TeacherProfile {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string | null;
    bio: string;
  };
  professional: {
    department: string;
    designation: string;
    employeeId: string;
    specialization: string[];
    experience: string;
    qualification: string;
  };
  social: {
    website: string;
    linkedin: string;
    twitter: string;
  };
}

export default function EditProfile() {
  const [profile, setProfile] = useState<TeacherProfile>({
    personal: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '+1234567890',
      profileImage: null,
      bio: 'Experienced computer science professor with a passion for teaching.',
    },
    professional: {
      department: 'Computer Science',
      designation: 'Associate Professor',
      employeeId: 'EMP001',
      specialization: ['Machine Learning', 'Data Structures'],
      experience: '10',
      qualification: 'Ph.D. in Computer Science',
    },
    social: {
      website: 'https://example.com',
      linkedin: 'linkedin.com/in/johnsmith',
      twitter: '@johnsmith',
    },
  });

  const [activeSection, setActiveSection] = useState('personal');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(prev => ({
        ...prev,
        personal: { ...prev.personal, profileImage: result.assets[0].uri }
      }));
    }
  };

  const InputField = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    multiline = false,
    keyboardType = 'default',
  }) => (
    <View className="mb-4">
      <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </Text>
      <TextInput
        style={{fontFamily: 'Poppins_400Regular'}}
        className={`
          bg-white dark:bg-gray-800 
          px-4 ${multiline ? 'py-4' : 'py-3'}
          rounded-lg border border-gray-200 dark:border-gray-700
          text-gray-900 dark:text-gray-100
          ${multiline ? 'min-h-[100px]' : ''}
        `}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <View>
            {/* Profile Image */}
            <View className="items-center mb-6">
              <TouchableOpacity onPress={pickImage}>
                <View className="relative">
                  {profile.personal.profileImage ? (
                    <Image
                      source={{ uri: profile.personal.profileImage }}
                      className="w-32 h-32 rounded-full"
                    />
                  ) : (
                    <View className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
                      <FontAwesome name="user" size={50} color="#6b7280" />
                    </View>
                  )}
                  <View className="absolute bottom-0 right-0 bg-[#1a367b] rounded-full p-3">
                    <FontAwesome name="camera" size={16} color="white" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <InputField
                  label="First Name"
                  value={profile.personal.firstName}
                  onChangeText={(text) => setProfile(prev => ({
                    ...prev,
                    personal: { ...prev.personal, firstName: text }
                  }))}
                  placeholder="Enter first name"
                />
              </View>
              <View className="flex-1">
                <InputField
                  label="Last Name"
                  value={profile.personal.lastName}
                  onChangeText={(text) => setProfile(prev => ({
                    ...prev,
                    personal: { ...prev.personal, lastName: text }
                  }))}
                  placeholder="Enter last name"
                />
              </View>
            </View>

            <InputField
              label="Email"
              value={profile.personal.email}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                personal: { ...prev.personal, email: text }
              }))}
              placeholder="Enter email"
              keyboardType="email-address"
            />

            <InputField
              label="Phone"
              value={profile.personal.phone}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                personal: { ...prev.personal, phone: text }
              }))}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />

            <InputField
              label="Bio"
              value={profile.personal.bio}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                personal: { ...prev.personal, bio: text }
              }))}
              placeholder="Tell us about yourself"
              multiline
            />
          </View>
        );

      case 'professional':
        return (
          <View>
            <InputField
              label="Department"
              value={profile.professional.department}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                professional: { ...prev.professional, department: text }
              }))}
              placeholder="Enter department"
            />

            <InputField
              label="Designation"
              value={profile.professional.designation}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                professional: { ...prev.professional, designation: text }
              }))}
              placeholder="Enter designation"
            />

            <InputField
              label="Employee ID"
              value={profile.professional.employeeId}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                professional: { ...prev.professional, employeeId: text }
              }))}
              placeholder="Enter employee ID"
            />

            <InputField
              label="Qualification"
              value={profile.professional.qualification}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                professional: { ...prev.professional, qualification: text }
              }))}
              placeholder="Enter qualification"
            />

            <InputField
              label="Years of Experience"
              value={profile.professional.experience}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                professional: { ...prev.professional, experience: text }
              }))}
              placeholder="Enter years of experience"
              keyboardType="numeric"
            />
          </View>
        );

      case 'social':
        return (
          <View>
            <InputField
              label="Website"
              value={profile.social.website}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                social: { ...prev.social, website: text }
              }))}
              placeholder="Enter website URL"
            />

            <InputField
              label="LinkedIn"
              value={profile.social.linkedin}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                social: { ...prev.social, linkedin: text }
              }))}
              placeholder="Enter LinkedIn profile"
            />

            <InputField
              label="Twitter"
              value={profile.social.twitter}
              onChangeText={(text) => setProfile(prev => ({
                ...prev,
                social: { ...prev.social, twitter: text }
              }))}
              placeholder="Enter Twitter handle"
            />
          </View>
        );
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-3xl font-bold text-white mb-2">
          Edit Profile
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-200 text-lg">
          Update your profile information
        </Text>
      </View>

      {/* Section Tabs */}
      <View className="px-6 pt-4">
        <View className="flex-row bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
          {['personal', 'professional', 'social'].map((section) => (
            <TouchableOpacity
              key={section}
              className={`
                flex-1 py-3 rounded-lg
                ${activeSection === section ? 'bg-[#1a367b]' : 'bg-transparent'}
              `}
              onPress={() => setActiveSection(section)}
            >
              <Text style={{fontFamily: 'Poppins_400Regular'}} className={`
                text-center capitalize
                ${activeSection === section ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
              `}>
                {section}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Form Content */}
      <View className="p-6">
        {renderSection()}

        {/* Save Button */}
        <TouchableOpacity
          className="bg-[#1a367b] py-3 rounded-xl mt-6"
          onPress={() => Alert.alert('Success', 'Profile updated successfully!')}
        >
          <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-white text-center font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
