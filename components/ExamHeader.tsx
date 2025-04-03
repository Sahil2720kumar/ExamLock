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
  showProfile = true,
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
          <Text style={headerStyles.logoText}>ExamLock</Text>
        </View>
      )}
      
      {title ? (
        <Text style={headerStyles.headerTitle}>{title}</Text>
      ) : (
        <View style={headerStyles.secureConnectionIndicator}>
          <View style={[
            headerStyles.statusDot, 
            isSecure ? headerStyles.secureDot : headerStyles.insecureDot
          ]} />
          <Text style={headerStyles.statusText}>
            {isSecure ? 'Secure Connection' : 'Unsecure Connection'}
          </Text>
        </View>
      )}
      
      {showProfile && (
        <TouchableOpacity 
          style={headerStyles.avatarContainer}
          onPress={() => router.push('/profile')}
        >
          <Text style={headerStyles.avatarText}>JS</Text>
          {notifications > 0 && (
            <View style={headerStyles.notificationBadge}>
              <Text style={headerStyles.badgeText}>
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