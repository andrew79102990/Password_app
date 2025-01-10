import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';

function MyBtn(props){
  return(
    <TouchableOpacity 
    onPress={props.onPress} 
    style = {[styles.button, { backgroundColor: props.backgroundColor }]}
    >
      <Text style = {[styles.text, { color: props.color }]}>
      {props.myTitle}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#007BFF',//暫時註解改用傳遞過來的方式
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    // color: '#FFFFFF',//暫時註解改用傳遞過來的方式
    fontSize: 26,
  },
});

export default MyBtn;
