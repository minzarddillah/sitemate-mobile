import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

const SearchInput = ({style, placeholder, ...props}: TextInputProps) => {
  return (
    <TextInput
      style={StyleSheet.flatten([{borderWidth: 1, borderColor: Colors.alabaster, backgroundColor: Colors.alabaster, borderRadius: 8, height: 32, paddingHorizontal: 10}, style])}
      placeholder={placeholder || "Search ..."}
      placeholderTextColor={Colors.doveGray}
      {...props}
    />
  );
};

export default SearchInput;
