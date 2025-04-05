import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// Mock data - replace with actual exam data from your API/backend
const examInfo = {
  id: 1,
  title: "Final Mathematics Exam",
  duration: "2 hours",
  totalMarks: 100,
  sections: [
    { name: "Multiple Choice", marks: 40 },
    { name: "Problem Solving", marks: 60 }
  ],
  instructions: "Please read all questions carefully. Calculator is allowed."
};

export default function ExamInfoScreen() {
  return (
    <View className="flex-1 p-4 bg-white">
      {/* Warning Banner */}
      <View className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <View className="flex-row items-center mb-2">
          <FontAwesome name="exclamation-triangle" size={20} color="#B45309" />
          <Text style={{fontFamily: 'Poppins_700Bold'}} className="text-amber-800 font-bold text-lg ml-2">Important Notice</Text>
        </View>
        <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-amber-700 leading-5">
          Once you enter the exam, leaving the app will end your session. You will not be able to resume the exam.
        </Text>
      </View>

      <Text style={{fontFamily: 'Poppins_700Bold'}} className="text-2xl font-bold mb-5 text-center">{examInfo.title}</Text>
      
      <View className="bg-gray-100 p-4 rounded-lg mb-5">
        <View className="flex-row justify-between mb-3">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-base font-semibold">Duration:</Text>
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-base">{examInfo.duration}</Text>
        </View>
        
        <View className="flex-row justify-between mb-3">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-base font-semibold">Total Marks:</Text>
          <Text style={{fontFamily: 'Poppins_400Regular'}} className="text-base">{examInfo.totalMarks}</Text>
        </View>

          <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-base font-semibold mt-3 mb-2">Sections:</Text>
        {examInfo.sections.map((section, index) => (
          <View key={index} className="flex-row justify-between ml-3 mb-1.5">
            <Text style={{fontFamily: 'Poppins_400Regular'}}>{section.name}</Text>
            <Text style={{fontFamily: 'Poppins_400Regular'}}>{section.marks} marks</Text>
          </View>
        ))}

        <Text style={{fontFamily: 'Poppins_400Regular'}} className="mt-4 italic">{examInfo.instructions}</Text>
      </View>

      <Link href={`/exam/${examInfo.id}`} asChild>
        <Pressable className="mt-5 bg-blue-500 rounded-lg py-3 px-4">
          <Text style={{fontFamily: 'Poppins_600SemiBold'}}   className="text-white text-center font-semibold">Start Exam</Text>
        </Pressable>
      </Link>
    </View>
  );
}
