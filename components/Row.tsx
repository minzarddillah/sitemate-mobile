import { FlexAlignType, StyleSheet, View, ViewStyle } from "react-native";

interface RowProps {
  children?: React.ReactNode;
  align?: FlexAlignType;
  justify?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;
  style?: ViewStyle;
};

const Row = ({children, align, justify, style}: RowProps) => {
  return (
    <View style={StyleSheet.flatten([{flexDirection: 'row', alignItems: align || 'flex-start', justifyContent: justify || 'flex-start'}, style])}>
      {children}
    </View>
  )  
};

export default Row;
