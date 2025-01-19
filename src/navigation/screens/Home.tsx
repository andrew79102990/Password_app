import React, { useState, useEffect } from 'react'; // 引入 React 和其 useState、useEffect hooks，這些是用來管理狀態和副作用的函數
import { useNavigation } from '@react-navigation/native'; // 引入 useNavigation，用於在應用程式中進行導航
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Image } from 'react-native'; // 引入 React Native 的組件，用來構建 UI
import { Ionicons } from '@expo/vector-icons'; // 需要安裝 @expo/vector-icons，用來使用圖標

// 定義 Home 組件
export function Home() {
  // 使用 useState 管理 dataSource 狀態，初始值為空陣列
  const [dataSource, setDataSource] = useState([]);
  const navigation = useNavigation(); // 使用 useNavigation 獲取導航對象
  const [favoriteIds, setFavoriteIds] = useState([]); // 使用 useState 管理 favoriteIds 狀態，用於存儲被標記為喜愛的項目的 ID

  useEffect(() => {
    // 使用 useEffect 在組件掛載時設置 dataSource 狀態為 json_data
    fetchData();
  }, []); // 空陣列作為依賴，確保只在組件第一次渲染時執行


//=======API請求的程式邏輯=======//

const fetchData = () => {
    const url = 'https://data.moa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx?IsTransData=1&UnitId=193'

    fetch(url)
        .then((response)=>response.json())
        .then((responseData)=>{
          setDataSource(responseData);
        })
        .catch((err)=>{
            console.log("error是： ",err)
        })
}
//=======API程式邏輯結束=======//


  // 定義 showNoticDetail 函數，負責導航到 Profile 頁面，並傳遞選中的案件數據
  const showNoticDetail = (cases) => {
    navigation.push('Profile', { passProps: cases }); // 使用 navigation.push 進行導航
  };

  // 定義 toggleFavorite 函數，負責切換項目的喜愛狀態
  const toggleFavorite = (id) => {
    // 使用 setFavoriteIds 函數來更新 favoriteIds 狀態
    setFavoriteIds((prev) => 
      // 檢查 prev（之前的 favoriteIds 狀態）中是否包含當前的 id
      prev.includes(id) 
        // 如果包含（表示該項目已被標記為喜愛），則過濾掉該 id
        ? prev.filter((favId) => favId !== id) 
        // 如果不包含，則將該 id 添加到新的喜愛列表中
        : [...prev, id] 
    );
  };


  // 定義 renderList 函數，負責渲染每個列表項
  const renderList = (cases) => {
    const isFavorite = favoriteIds.includes(cases.ID); // 檢查當前項目是否被標記為喜愛

    return (
      <TouchableOpacity onPress={() => showNoticDetail(cases)}> {/* 點擊整個項目導航到詳細頁面 */}
        <View style={styles.listItem}>
          <Image 
            source={{ uri: cases.PicURL }} // 顯示圖片，圖片來源為 PicURL
            style={styles.image} 
          />
          <View style={styles.textContainer}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>
              {cases.City} {/*顯示城市名稱*/}
            </Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>
              ({cases.Town})  {/*顯示鄉鎮名稱*/}
            </Text>
          </View>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.address}>
              {cases.Address}  {/*顯示地址*/}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(cases.ID)} style={styles.heartIcon}> {/* 點擊愛心圖標切換喜愛狀態 */}
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} // 根據喜愛狀態顯示實心或空心愛心圖標
            size={24} 
            color="#FF8000" // 設置圖標顏色為橙色
          />
        </TouchableOpacity>
        <View style={styles.separator}></View> {/* 添加一條分隔線 */}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={dataSource} // 傳入數據源
        renderItem={({ item }) => renderList(item)} // 使用 renderList 函數渲染每個項目
        keyExtractor={item => item.ID} // 使用 ID 作為每個項目的鍵
        style={{ backgroundColor: 'white' }} // 設置背景顏色為白色
      />
    </View>
  );
}

// 定義樣式
const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row', // 設置子元素橫向排列
    alignItems: 'center', // 垂直居中對齊
    height: 78, // 設置項目高度
    padding: 8, // 設置內間距
    backgroundColor: 'white', // 設置背景顏色為白色
  },
  image: {
    width: 70, // 設置圖片寬度
    height: 70, // 設置圖片高度
    borderRadius: 10, // 設置圓角半徑
    marginRight: 10, // 設置右側外間距
  },
  textContainer: {
    flex: 1, // 設置彈性布局，填滿剩餘空間
    justifyContent: 'center', // 垂直居中對齊
  },
  text: {
    fontSize: 15, // 設置字體大小
    color: 'black', // 設置字體顏色為黑色
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 78, // 設定項目高度
    padding:8,
    fontSize: 10,
    color: 'gray',
  },
  heartIcon: {
    position: 'absolute', // 絕對定位
    right: 10, // 距離右側 10 單位
    bottom: 10, // 距離底部 10 單位
  },
  separator: {
    height: 1, // 設置分隔線高度
    backgroundColor: '#dddddd', // 設置分隔線顏色
  }
});
