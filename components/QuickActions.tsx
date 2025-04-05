import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

interface QuickAction {
  title: string;
  icon: string;
  color?: string;
  route?: string;
  onPress?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  const getActionColor = (index: number): string => {
    const colors = [
      '#4f85e5', // blue
      '#4ade80', // green
      '#f59e0b', // amber
      '#8b5cf6', // purple
    ];
    return colors[index % colors.length];
  };

  return (
    <View className="flex-row flex-wrap gap-4">
      {actions.map((action, index) => (
        <Pressable
          key={action.title}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex-1 min-w-[140px] max-h-[150px]
            active:opacity-80 active:scale-95"
          style={{ minHeight: 150 }}
          onPress={() => router.push(action.route as any || '')}
        >
          <View className="flex-1 justify-between">
            <View
              className="rounded-full p-2 w-12 h-12 items-center justify-center"
              style={{ backgroundColor: `${getActionColor(index)}15` }}
            >
              {action.icon === 'users' ? (
                <Feather name={action.icon} size={24} color={action.color || getActionColor(index)} />
              ) : (
                  <MaterialCommunityIcons
                  name={action.icon}
                  size={24}
                  color={action.color || getActionColor(index)}
                />
              )}
            </View>

            <View className="mt-4">
              <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {action.title}
              </Text>
              
              <View className="flex-row items-center mt-2">
                <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-sm text-gray-500 dark:text-gray-400 mr-1">
                  Quick access
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={16}
                  color="#9ca3af"
                />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

// Example usage:
export const defaultQuickActions: QuickAction[] = [
  {
    title: 'Create Exam',
    icon: 'plus-circle',
    route: '/exam',
  },
  {
    title: 'View Reports',
    icon: 'chart-bar',
    route: '/exam',
  },
  {
    title: 'Manage Students',
    icon: 'account-group',
    route: '/exam',
  },
  {
    title: 'Settings',
    icon: 'cog',
    route: '/exam',
  },
];
