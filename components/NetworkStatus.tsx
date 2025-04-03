import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NetworkStatusProps {
  onPress?: () => void;
}

export function NetworkStatus({ onPress }: NetworkStatusProps) {
  const [status, setStatus] = useState<'approved' | 'unapproved' | 'checking'>('checking');
  const [networkName, setNetworkName] = useState('University Network');

  useEffect(() => {
    // Simulate network check
    setTimeout(() => {
      setStatus('approved');
    }, 1000);
  }, []);

  const getStatusInfo = () => {
    switch (status) {
      case 'approved':
        return {
          icon: 'shield-check',
          text: 'Approved Network',
          color: '#4ade80',
          detail: 'Your network is verified and secure for exam administration'
        };
      case 'unapproved':
        return {
          icon: 'shield-alert',
          text: 'Unapproved Network',
          color: '#f87171',
          detail: 'Please connect to an approved network to manage exams'
        };
      case 'checking':
        return {
          icon: 'shield-sync',
          text: 'Verifying Network',
          color: '#fbbf24',
          detail: 'Checking network security status...'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Pressable 
      className="mt-4 bg-white/10 rounded-lg p-4"
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <MaterialCommunityIcons
            name={statusInfo.icon}
            size={24}
            color={statusInfo.color}
          />
          <View>
            <Text className="text-white text-base font-medium">
              {statusInfo.text}
            </Text>
            <Text className="text-white/90 text-sm">
              {networkName}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="rgba(255,255,255,0.5)"
        />
      </View>
      <Text className="text-gray-200 text-sm mt-2">
        {statusInfo.detail}
      </Text>
    </Pressable>
  );
}
