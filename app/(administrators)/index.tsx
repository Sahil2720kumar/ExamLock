import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function AdminDashboard() {

  useEffect(() => {
    // Delay the navigation slightly to ensure Root Layout is mounted
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  
  const quickStats = [
    { title: 'Total Students', value: '1,234', icon: 'users', color: 'bg-blue-500', trend: '+5.2%' },
    { title: 'Total Teachers', value: '48', icon: 'graduation-cap', color: 'bg-green-500', trend: '+2.1%' },
    { title: 'Active Exams', value: '12', icon: 'file-text', color: 'bg-purple-500', trend: '+8.4%' },
    { title: 'Departments', value: '6', icon: 'building', color: 'bg-orange-500', trend: '0%' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'exam_created',
      title: 'New Exam Created',
      description: 'Final Exam - Advanced Mathematics',
      time: '2 hours ago',
      user: 'Dr. Smith',
      userImage: 'https://ui-avatars.com/api/?name=Dr+Smith',
    },
    {
      id: 2,
      type: 'teacher_joined',
      title: 'New Teacher Joined',
      description: 'Department of Computer Science',
      time: '5 hours ago',
      user: 'Prof. Johnson',
      userImage: 'https://ui-avatars.com/api/?name=Prof+Johnson',
    },
    // Add more activities as needed
  ];

  // router.push('/(students)/');
  // router.push('/(teachers)');
  

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </Text>
            <Text className="text-gray-200 text-lg">
              Welcome back, Administrator
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/notifications')} className="bg-white/20 p-2 rounded-full">
            <FontAwesome name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-3">
          {[
            { title: 'Add Teacher', icon: 'user-plus', route: '/(administrators)/teachers/add' },
            { title: 'Add Student', icon: 'user-plus', route: '/(administrators)/students/add' },
            { title: 'View Reports', icon: 'bar-chart', route: '/(administrators)/reports' },
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white/10 px-4 py-3 rounded-xl flex-1"
              onPress={() => router.push(action.route as any)}
            >
              <FontAwesome name={action.icon} size={20} color="white" />
              <Text className="text-white mt-2 font-medium">{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="p-6">
        {/* Quick Stats */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <View 
              key={index}
              className="flex-1 min-w-[160px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <View className={`w-12 h-12 ${stat.color} rounded-full items-center justify-center mb-3`}>
                <FontAwesome name={stat.icon} size={24} color="white" />
              </View>
              <Text className="text-gray-600 dark:text-gray-400">{stat.title}</Text>
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </Text>
                <Text className={`
                  ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-gray-500'}
                `}>
                  {stat.trend}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Performance Overview */}
        {/* <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            System Performance
          </Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                data: [65, 72, 68, 78, 82, 80]
              }]
            }}
            width={340}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 54, 123, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View> */}

        {/* Department Overview */}
        {/* <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Department Overview
          </Text>
          <BarChart
            data={{
              labels: ['CS', 'EE', 'ME', 'CE', 'CH', 'PH'],
              datasets: [{
                data: [45, 38, 32, 28, 25, 22]
              }]
            }}
            width={340}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 54, 123, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View> */}

        {/* Recent Activities */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Recent Activities
          </Text>
          {recentActivities.map((activity) => (
            <View 
              key={activity.id}
              className="flex-row items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <Image
                source={{ uri: activity.userImage }}
                className="w-10 h-10 rounded-full"
              />
              <View className="flex-1 ml-3">
                <Text className="text-gray-900 dark:text-gray-100 font-medium">
                  {activity.title}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                  {activity.description}
                </Text>
                <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {activity.time} • {activity.user}
                </Text>
              </View>
              <FontAwesome 
                name={activity.type === 'exam_created' ? 'file-text' : 'user-plus'} 
                size={20} 
                color="#6b7280" 
              />
            </View>
          ))}
        </View>

        {/* Quick Links */}
        <View className="grid grid-cols-2 gap-4">
          {[
            { title: 'Manage Teachers', icon: 'users', color: 'bg-blue-500', route: '/(administrators)/teachers' },
            { title: 'Manage Students', icon: 'graduation-cap', color: 'bg-green-500', route: '/(administrators)/students' },
            { title: 'Exam Reports', icon: 'bar-chart', color: 'bg-purple-500', route: '/(administrators)/reports' },
            { title: 'Settings', icon: 'cog', color: 'bg-gray-500', route: '/(administrators)/settings' },
          ].map((link, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
              onPress={() => router.push(link.route as any)}
            >
              <View className={`w-10 h-10 ${link.color} rounded-full items-center justify-center mb-2`}>
                <FontAwesome name={link.icon} size={20} color="white" />
              </View>
              <Text className="text-gray-900 dark:text-gray-100 font-medium">
                {link.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
