import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function Home() {
  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  // 驗證函數
  const validateInput = () => {
    const regex = /^[A-Z][A-Za-z0-9]{8}$/; // 開頭大寫英文，後面8位英文字母或數字
    if (!regex.test(inputValue)) {
      if (!/^[A-Z]/.test(inputValue)) {
        setValidationMessage('開頭非大寫英文');
      } else if (inputValue.length < 9) {
        setValidationMessage('長度不足，請輸入9位字符');
      } else if (inputValue.length > 9) {
        setValidationMessage('長度超過，請輸入9位字符');
      }else {
        setValidationMessage('請勿輸入特殊符號');
      }
      setIsValid(false);//帶入驗證失敗的參數值
    } else {
      setValidationMessage('驗證成功');
      setIsValid(true);
    }
  };

  return (
    <LinearGradient
      colors={['#6A11CB', '#2575FC']}
      style={styles.container}
    >
      <Text style={styles.title}>文字驗證範例</Text>
      <TextInput
        style={styles.input}
        placeholder="輸入文字"
        placeholderTextColor="#aaa"
        onChangeText={setInputValue}
        value={inputValue}
      />
      <TouchableOpacity style={styles.button} onPress={validateInput}>
        <Text style={styles.buttonText}>驗證</Text>
      </TouchableOpacity>
      {validationMessage !== '' && (
        <Text
          style={[
            styles.message,
            { color: isValid ? 'lightgreen' : 'red' },//如果 isValid == true 就將顏色切換為 lightgreen 
          ]}
        >
          {validationMessage}
        </Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#2575FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
  },
});
