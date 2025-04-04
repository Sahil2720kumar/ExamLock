import { Stack } from "expo-router";
import ExamHeader from "@/components/ExamHeader";

export default function AdminLayout() {
  return <Stack screenOptions={{
    headerShown: true, header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} />,
  }} >
    <Stack.Screen name="index" options={{ title: 'Administrator Dashboard', header: (props) => <ExamHeader {...props} showBack={false} showProfile={true} /> }} />
    <Stack.Screen name="teachers" options={{ title: 'Teachers', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="students" options={{ title: 'Students', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
    <Stack.Screen name="reports" options={{ title: 'Reports', header: (props) => <ExamHeader {...props} showBack={true} showProfile={true} /> }} />
  </Stack>;
}

