import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View, Image, ActivityIndicator } from 'react-native';
import { Memo, observer, useObservable } from "@legendapp/state/react";
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { getHeadline } from '@/action/home';
import { HeadlineTypes, NewsTypes } from '@/utils/types';
import CardNews from '@/components/CardNews';

function HomeScreen() {
  const headline$ = useObservable<HeadlineTypes>({
    data: [],
    loading: true,
  });

  useEffect(() => {
    headline$.loading.set(true);
    getHeadline()
      .then((response: NewsTypes[]) => {
        headline$.data.set(response);
      })
    .finally(() => headline$.loading.set(false));
  }, []);
  
  const onPressSearch = () => {
    router.navigate('/search');
  };

  const ListHeaderComponent = (
    <Text style={{fontSize: 20, fontWeight: '600'}}>Highlight</Text>
  );

  const renderItem = ({item}: {item: NewsTypes}) => {
    return (
      <CardNews {...item} />
    );
  };

  const ListEmptyComponent = () => {
    if (headline$.loading.get()) {
      return (
        <View style={{flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return <Text>Empty ...</Text>
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingTop: 4, paddingBottom: 20, paddingHorizontal: 20}}>
        <TouchableOpacity style={{borderWidth: 1, borderColor: Colors.alabaster, borderRadius: 8, height: 32, paddingHorizontal: 10, justifyContent: 'center', backgroundColor: Colors.alabaster,}} onPress={onPressSearch}>
          <Text style={{color: Colors.doveGray}}>Search ...</Text>
        </TouchableOpacity>
      </View>
      <Memo>
        {() => (
          <FlatList
            ListHeaderComponent={ListHeaderComponent}
            data={headline$.data.get()}
            renderItem={renderItem}
            keyExtractor={(item, index) => `headline-${index}`}
            contentContainerStyle={{paddingHorizontal: 20, gap: 20, flexGrow: 1}}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </Memo>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default observer(HomeScreen);
