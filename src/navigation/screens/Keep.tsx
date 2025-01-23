import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, Image } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';

export function Keep() {
  const [favorites, setFavorites] = useState([])
  const [myBookCount, setMyBookCount] = useState(0)
  const [myBookListName, setMyBookListName] = useState([])

  const navigation = useNavigation(); // 使用 Hook 獲取導航對象

  //新做法
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStorage();
    });
    return unsubscribe;
  }, [myBookCount]);

//   原做法
//   useEffect(() => {
//     const unsubscribe = props.navigation.addListener('focus', () => {
//         loadStorage()
//     })
//     return unsubscribe

// }, [myBookCount])


//原做法
// const loadStorage = async () => {
//     // 採用方法二讀取資料
//   let bookGet = await StorageHelper.getMySetting('myList')

//   let a = JSON.parse(bookGet)//解析資料
//   setMyBookCount(a.length)//取回資料筆數
//   setMyBookListName(a)//取回所有收藏資料


// }
const loadStorage = async () => {
  try {
    const bookGet = await StorageHelper.getMySetting('myList');
    const parsedData = JSON.parse(bookGet);//解析資料
    setMyBookCount(parsedData.length);//取回資料筆數
    setMyBookListName(parsedData);//取回資料筆數
    // console.log('myBookListName Data:', parsedData); // 打印資料
  } catch (err) {
    console.log('Error loading storage:', err);
  }
};

  const renderFavorite = (item) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.PicURL }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>
          {item.City}
        </Text>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>
          ({item.Town})
        </Text>
      </View>
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.address}>
        {item.Address}
      </Text>
    </View>
  );
          //   {/* 法二渲染 */}
          //   {
          //     myBookListName.map((pet, index) => {
          //         return (<Text key={index}>認養寵物為：{pet.animal_colour + '的' + pet.animal_kind}</Text>)
          //     })
          // }
  return (
    <View style={styles.container}>
      <FlatList
        data={myBookListName} // 直接使用 myBookListName 作為數據源
        renderItem={({ item }) => renderFavorite(item)}
        keyExtractor={(item, index) => item.ID || index.toString()} // 確保有唯一的 key
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 78,
    padding: 8,
    backgroundColor: 'white',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  address: {
    fontSize: 10,
    color: 'gray',
  },
});
