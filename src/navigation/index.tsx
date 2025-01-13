import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Background, HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import heart from '../assets/heart.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Keep } from './screens/Keep';
import { NotFound } from './screens/NotFound';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerStyle: {
          backgroundColor: '#FF8000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        title: '首頁',
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={newspaper}
            tintColor={focused ? '#FF8000' : '#gray'}
            style={{
              width: size,
              height: size
            }}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ 
            color: focused ? '#FF8000' : '#gray',
            fontSize: 10,
           }}>列表</Text>
        ), // 文字的顏色
      },
    },
    Keep: {
      screen: Keep,
      options: {
        headerStyle: {
          backgroundColor: '#FF8000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        title: '我的收藏',
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={heart}
            tintColor={focused ? '#FF8000' : 'gray'}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ 
            color: focused ? '#FF8000' : '#gray',
            fontSize: 10,
           }}>收藏</Text>
        ), // 文字的顏色
      },
    },
  },
  // screenOptions: {
  //   tabBarStyle: {
  //     backgroundColor: '#f4511e', // 設定底部標籤欄的背景色
  //   },
  // },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
