import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import MyBtn from '../../component/myBtn';

export function Updates() {


  const print_btn = ()=>{
    alert('被按到啦');
  }

  return (
    <View style={styles.container}>
      <Text>自製元件</Text>
      <MyBtn backgroundColor = {'#FF8000'} color = {'black'} myTitle={'Click'} onPress={()=>print_btn()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
