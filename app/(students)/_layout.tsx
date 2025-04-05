import { Stack } from "expo-router";
import ExamHeader from "@/components/ExamHeader";

export default function StudentsLayout() {
  return <Stack screenOptions={{
    headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />,
  }} >
    <Stack.Screen name="index" options={{ title: 'Dashboard', header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} /> }} />
    <Stack.Screen name="exam" options={{ title: 'Exam', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="results-list" options={{ title: 'Results', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="settings" options={{ title: 'Settings', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
  </Stack>
}

