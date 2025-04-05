// components/ExamHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles, COLORS } from '@/styles/headerStyles';

const ExamHeader = ({ 
  isSecure = true, 
  showBack = false,
  title,
  showProfile = false,
  notifications = 0
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <View style={headerStyles.headerContainer}>
      {showBack ? (
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ) : (
        <View style={headerStyles.logoContainer}>
          <Ionicons name="lock-closed" size={24} color={COLORS.white} />
          <Text  style={[headerStyles.logoText,{fontFamily: 'Poppins_600SemiBold'}]}>ExamLock</Text>
        </View>
      )}
      
      {title ? (
        <Text style={[headerStyles.headerTitle,{fontFamily: 'Poppins_600SemiBold'}]}>{title}</Text>
      ) : (
        <View style={headerStyles.secureConnectionIndicator}>
          <View style={[
            headerStyles.statusDot, 
            isSecure ? headerStyles.secureDot : headerStyles.insecureDot
          ]} />
          <Text style={[headerStyles.statusText,{fontFamily: 'Poppins_400Regular'}]}>
            {isSecure ? 'Secure Connection' : 'Unsecure Connection'}
          </Text>
        </View>
      )}
      
      {showProfile && (
        <TouchableOpacity 
          style={headerStyles.avatarContainer}
          onPress={() => router.push('/sahil')}
        >
          <Text style={[headerStyles.avatarText,{fontFamily: 'Poppins_600SemiBold'}]}>JS</Text>
          {notifications > 0 && (
            <View style={headerStyles.notificationBadge}>
              <Text style={[headerStyles.badgeText,{fontFamily: 'Poppins_400Regular'}]}>
                {notifications > 9 ? '9+' : notifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExamHeader;