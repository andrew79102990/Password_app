import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export function Profile() {
  const route = useRoute();
  const { passProps } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: passProps.PicURL }} 
        style={styles.image} 
      />
      <Text style={styles.text}>城市: {passProps.City}</Text>
      <Text style={styles.text}>區域: {passProps.Town}</Text>
      <Text style={styles.text}>地址: {passProps.Address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
});
