import { TouchableOpacity, View, Text, Switch } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";


 const SettingItem = ({
  icon,
  title,
  description,
  isSwitch,
  value,
  onValueChange,
  onPress
}: {
  icon: string;
  title: string;
  description?: string;
  isSwitch?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl mb-4 shadow-sm"
  >
    <View className="flex-row items-center flex-1">
      <View className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
        <FontAwesome name={icon as any} size={20} color="#3B82F6" />
      </View>
      <View className="ml-3 flex-1">
        <Text style={{fontFamily: 'Poppins_600SemiBold'}} className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </Text>
        {description && (
          <Text style={{fontFamily: 'Poppins_400Regular'}}  className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {description}
          </Text>
        )}
      </View>
    </View>
    {isSwitch ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
        thumbColor={value ? '#3B82F6' : '#9CA3AF'}
      />
    ) : (
      <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

export default SettingItem;
