import { useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";


const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  numberOfLines = 1,
  required = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View className="mb-4 flex-row justify-start">
      <View className={`    
        flex-1 flex-row items-center px-4
        relative bg-white dark:bg-gray-800 
        rounded-xl border-2 
        ${isFocused ? 'border-[#1a367b]' : 'border-gray-200 dark:border-gray-700'}
        ${multiline ? 'min-h-[100px]' : ''}
      `}>

        {leftIcon && (
          <View className="">
            {leftIcon}
          </View>
        )}

        <TextInput
          className={`       
            px-4 text-gray-900 dark:text-gray-100 flex-1 
            ${disabled ? 'opacity-50' : ''}
          `}
          value={value}
          editable={!disabled}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType as any}
          secureTextEntry={secureTextEntry}
        />

      </View>
    </View>
  );
};

export default InputField;
