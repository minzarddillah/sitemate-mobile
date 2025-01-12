import Row from "@/components/Row";
import SearchInput from "@/components/SearchInput";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FeatherIcons from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { Memo, observer, useObservable } from "@legendapp/state/react";
import {debounce, isEmpty} from "lodash";
import { useRef } from "react";
import { getEverything } from "@/action/search";
import { NewsTypes } from "@/utils/types";
import CardNews from "@/components/CardNews";
import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Search = () => {
  const listNews$ = useObservable<NewsTypes[]>([]);
  const loading$ = useObservable(false);
  const historySearch$ = useObservable<string[]>([]);
  const keyword$ = useObservable<string>('');

  const debounceSearch = useRef(debounce(search => {
    if (search.length > 0) {
      loading$.set(true);
      getEverything(search)
        .then((response: NewsTypes[]) => {
          historySearch$.set(historySearch$.get().concat(search));
          listNews$.set(response);
        })
        .finally(() => {
          loading$.set(false);
        })
    } else {
      listNews$.set([]);
    }
  }, 800));

  const onPressBack = () => {
    router.back();
  };

  const onChangeText = (search: string) => {
    keyword$.set(search)
    debounceSearch.current(search);
  };

  const onPressHistory = (search: string) => {
    onChangeText(search)
  };

  const ListHeaderComponent = (
    <Row align="center" style={{gap: 10, marginTop: 4}}>
      {router.canGoBack() && (
        <TouchableOpacity onPress={onPressBack}>
          <FeatherIcons name="chevron-left" size={24} />
        </TouchableOpacity>
      )}
      <Memo>
        {() => (
          <SearchInput style={{flex: 1}} autoFocus onChangeText={onChangeText} value={keyword$.get()} />
        )}
      </Memo>
    </Row>
  );

  const ListEmptyComponent = () => {
    return (
      <Memo>
        {() => {
          if (loading$.get()) {
            return (
              <View style={{flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" />
              </View>
            );
          }
          return historySearch$.get().map((text, index) => (
            <TouchableOpacity key={`history-${index}`} onPress={() => onPressHistory(text)}>
              <Row align="center" style={{gap: 10}}>
                <MaterialCommunityIcons name="history" size={24} color="black" />
                <Text>{text}</Text>
              </Row>
            </TouchableOpacity>
          ));
        }}
      </Memo>
    );
  };

  const renderItem = ({item}: {item: NewsTypes}) => {
    return (
      <CardNews {...item} />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Memo>
        {() => (
          <FlatList
            ListHeaderComponent={ListHeaderComponent}
            data={listNews$.get()}
            renderItem={renderItem}
            contentContainerStyle={{paddingHorizontal: 20, gap: 20, flexGrow: 1}}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </Memo>
    </SafeAreaView>
  );
};

export default observer(Search);