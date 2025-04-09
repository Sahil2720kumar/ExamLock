import { View, Text, useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { NetworkStatus } from '@/components/NetworkStatus';
import { ExamCard } from '@/components/ExamCard';
import { StatsCard } from '@/components/StatsCard';
import { QuickActions } from '@/components/QuickActions';
import { router } from 'expo-router';
import { useProfileStore } from '@/store/profileStore';

export default function Index() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { profile } = useProfileStore();
  if(profile?.role !== 'TEACHER'){
    router.push('/');
  }

  const upcomingExams = [
    {
      id: 1,
      title: 'Final Exam - Advanced Mathematics',
      date: '2024-04-15T09:00:00',
      students: 45,
      duration: '180',
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Midterm - Computer Science',
      date: '2024-04-10T14:00:00',
      students: 32,
      duration: '120',
      status: 'draft',
    },
  ];

  const uncheckedExams = [
    {
      id: 1,
      title: 'Final Exam - Advanced Mathematics',
      date: '2024-04-15T09:00:00',
      students: 45,
      duration: '180',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Midterm - Computer Science',
      date: '2024-04-10T14:00:00',
      students: 32,
      duration: '120',
      status: 'completed',
    },
  ];

  const stats = [
    { title: 'Active Exams', value: '3' },
    { title: 'Students Online', value: '127' },
    { title: 'Completed Today', value: '45' },
    { title: 'Pending Review', value: '12' },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-6 py-8 bg-[#1a367b] dark:bg-[#0f1f4d]">
        <Text style={{fontFamily: 'Poppins_700Bold'}} className="text-3xl font-bold text-white mb-2">
          ExamLock Dashboard
        </Text>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-gray-200 text-lg">
          Welcome back, Professor Smith
        </Text>
        <NetworkStatus />
      </View>

      <View className="p-6">
        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Quick Stats
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Upcoming Exams
          </Text>
          <View className="gap-4">
            {upcomingExams.map((exam) => (
              <ExamCard  key={exam.id} {...exam} onPress={() => router.push(`/(teachers)/exam/exam-details?id=${exam.id}`)}/>
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Unchecked Exams
          </Text>
          <View className="gap-4">
            {uncheckedExams.map((exam) => (
              <ExamCard  key={exam.id} {...exam} onPress={() => router.push(`/(teachers)/exam/uncheck-exam`)}/>
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}   className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Quick Actions
          </Text>
          <View className="gap-4">
            <QuickActions
              actions={[
                { title: 'View Exams', icon: 'eye',route: '/exam' },
                { title: 'Create Exam', icon: 'plus-circle',route: '/exam/create' },
                { title: 'View Reports', icon: 'chart-bar',route: '/reports' },
                { title: 'Manage Students', icon: 'users',route: '/students' },
                { title: 'Settings', icon: 'cog',route: '/settings' },
              ]}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

