import { Colors } from "@/constants/Colors";
import { NewsTypes } from "@/utils/types";
import { Image, Text, View } from "react-native";

const CardNews = ({...item}: NewsTypes) => {
  return (
    <View style={{flex: 1, gap: 10}}>
      <Image source={{uri: item.urlToImage}} style={{width: '100%', height: 150, borderRadius: 20, backgroundColor: Colors.silver}} resizeMode="cover" />
      <View style={{gap: 4}}>
        <Text numberOfLines={2} style={{fontSize: 16, fontWeight: '600'}}>{item.title}</Text>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
    </View>
  );
};

export default CardNews;
