import { View, Text, useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesome } from '@expo/vector-icons';

export default function NetworkInfo() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const networkStats = [
    {
      title: 'Connection Type',
      value: 'Wi-Fi',
      icon: 'wifi',
      status: 'good',
    },
    {
      title: 'Download Speed',
      value: '85.5 Mbps',
      icon: 'arrow-down',
      status: 'good',
    },
    {
      title: 'Upload Speed',
      value: '35.2 Mbps',
      icon: 'arrow-up',
      status: 'good',
    },
    {
      title: 'Latency',
      value: '25ms',
      icon: 'clock-o',
      status: 'good',
    },
  ];

  const recentIssues = [
    {
      time: '10:30 AM',
      description: 'Connection dropped for 5 seconds',
      severity: 'low',
    },
    {
      time: '09:15 AM',
      description: 'Latency spike detected (150ms)',
      severity: 'medium',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-3xl font-bold text-white mb-2">
          Network Information
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-200 text-lg">
          System Connection Status
        </Text>
      </View>

      {/* Network Stats Cards */}
      <View className="p-6">
        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Network Statistics
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {networkStats.map((stat, index) => (
              <View 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex-1 min-w-[150px]"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <FontAwesome 
                    name={stat.icon as any} 
                    size={20} 
                    color={isDark ? '#9ca3af' : '#4b5563'} 
                  />
                  <View className={`h-2 w-2 rounded-full ${
                    stat.status === 'good' ? 'bg-green-500' : 
                    stat.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </View>
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </Text>
                <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Issues */}
        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Recent Issues
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            {recentIssues.map((issue, index) => (
              <View 
                key={index}
                className={`p-4 flex-row items-center justify-between ${
                  index !== recentIssues.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View className={`h-3 w-3 rounded-full mr-3 ${
                    issue.severity === 'low' ? 'bg-yellow-500' : 
                    issue.severity === 'medium' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-900 dark:text-gray-100">
                    {issue.description}
                  </Text>
                </View>
                <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-500 dark:text-gray-400">
                  {issue.time}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Connection Quality */}
        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Connection Quality
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <View className="h-full w-[85%] bg-green-500 rounded-full" />
            </View>
            <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-center mt-2 text-gray-600 dark:text-gray-300">
              Excellent (85%)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
