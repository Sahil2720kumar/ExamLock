import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Notification {
  id: string;
  type: 'exam' | 'result' | 'announcement' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable: boolean;
  sender?: {
    name: string;
    avatar: string;
  };
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'exam',
      title: 'New Exam Scheduled',
      message: 'Final examination for Advanced Mathematics has been scheduled for next week.',
      time: '2 hours ago',
      read: false,
      actionable: true,
      sender: {
        name: 'Dr. Smith',
        avatar: 'https://ui-avatars.com/api/?name=Dr+Smith',
      },
    },
    {
      id: '2',
      type: 'result',
      title: 'Results Published',
      message: 'Mid-term examination results for Computer Science have been published.',
      time: '5 hours ago',
      read: true,
      actionable: true,
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Important Announcement',
      message: 'All classes will be conducted online next week due to maintenance work.',
      time: '1 day ago',
      read: false,
      actionable: false,
      sender: {
        name: 'Admin Office',
        avatar: 'https://ui-avatars.com/api/?name=Admin+Office',
      },
    },
    // Add more notifications as needed
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return { name: 'pencil-square-o', color: '#1a367b' };
      case 'result':
        return { name: 'file-text-o', color: '#22c55e' };
      case 'announcement':
        return { name: 'bullhorn', color: '#f59e0b' };
      case 'system':
        return { name: 'cog', color: '#6b7280' };
      case 'reminder':
        return { name: 'bell', color: '#ef4444' };
      default:
        return { name: 'circle', color: '#6b7280' };
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== id)
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center mb-4">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-3xl font-bold text-white">
            Notifications
          </Text>
          <TouchableOpacity 
            className="bg-white/20 px-4 py-2 rounded-lg"
            onPress={markAllAsRead}
          >
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white">Mark all as read</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick Stats */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-white/10 rounded-lg p-3">
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white/60">Unread</Text>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white text-xl font-bold">
              {notifications.filter(n => !n.read).length}
            </Text>
          </View>
          <View className="flex-1 bg-white/10 rounded-lg p-3">
            <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white/60">Total</Text>
            <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-white text-xl font-bold">
              {notifications.length}
            </Text>
          </View>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1">
        <View className="p-6 gap-y-4">
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`
                bg-white dark:bg-gray-800 rounded-xl p-4
                ${!notification.read ? 'border-l-4 border-[#1a367b]' : ''}
              `}
              onPress={() => markAsRead(notification.id)}
            >
              <View className="flex-row items-start">
                <View className={`
                  w-12 h-12 rounded-full items-center justify-center
                  bg-${getNotificationIcon(notification.type).color}/10
                `}>
                  <FontAwesome 
                    name={getNotificationIcon(notification.type).name as any}
                    size={24}
                    color={getNotificationIcon(notification.type).color}
                  />
                </View>

                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {notification.title}
                      </Text>
                      <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="p-2"
                      onPress={() => deleteNotification(notification.id)}
                    >
                      <FontAwesome name="times" size={16} color="#6b7280" />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row items-center justify-between mt-4">
                    <View className="flex-row items-center">
                      {notification.sender && (
                        <>
                          <Image
                            source={{ uri: notification.sender.avatar }}
                            className="w-6 h-6 rounded-full"
                          />
                          <Text style={{fontFamily: 'Poppins_400Regular'}} className="ml-2 text-gray-500 dark:text-gray-500">
                            {notification.sender.name}
                          </Text>
                        </>
                      )}
                    </View>
                    <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 dark:text-gray-500">
                      {notification.time}
                    </Text>
                  </View>

                  {notification.actionable && (
                    <View className="flex-row gap-2 mt-4">
                      <TouchableOpacity className="bg-[#1a367b] px-4 py-2 rounded-lg">
                        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-white">View Details</Text>
                      </TouchableOpacity>
                      {notification.type === 'exam' && (
                        <TouchableOpacity className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-700 dark:text-gray-300">Set Reminder</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
