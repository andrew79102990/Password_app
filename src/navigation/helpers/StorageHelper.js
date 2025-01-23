// import { AsyncStorage } from 'react-native'
// AsyncStorage 的使用有關。從 React Native 0.65 版本開始，AsyncStorage 被從核心庫中移除，並且需要安裝並從 @react-native-async-storage/async-storage 引入，而不是直接從 react-native 引入。

// 解決方法
// 安裝 @react-native-async-storage/async-storage：
// npm install @react-native-async-storage/async-storage
//npx react-native start --reset-cache  清理緩存和重新編譯

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 
 * {string} name
 * {bool} isLogin
 * {number} accountInfoStatus 0 is none, 1 is verifying, 2 is error, 3 is verified
 */

// export const setUserToken = (key, value)=>AsyncStorage.setItem(key,value)
export const getMySetting = (key) => AsyncStorage.getItem(key)
export const setMySetting = (key, value) => AsyncStorage.setItem(key, value)