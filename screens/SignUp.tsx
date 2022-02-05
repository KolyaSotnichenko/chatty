import { StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {View, Text} from '../components/Themed'
import React, { useState } from 'react';
import { Button, Subheading } from 'react-native-paper';
import useColorScheme from '../hooks/useColorScheme';
import { auth, signUp, fs } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { updateProfile } from 'firebase/auth';

import {collection, addDoc} from 'firebase/firestore'

const SignUp = () => {

  const colorScheme = useColorScheme();
  let textColor: string = ''
  if(colorScheme == 'dark'){
      textColor = 'white'
  }else{
      textColor = 'black'
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const createUser = () => {
    signUp(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user

      updateProfile(user, {
        displayName: name
      })

      addDoc(collection(fs, 'users'), {
        userId: user.uid,
        username: name,
        email: email,
      })
      

      navigation.popToTop()
    })

    .catch(error => setError(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={{uri: 'https://macx.ws/uploads/posts/2016-02/1455170108_chatty-for-facebook.png'}} style={{width: 150, height: 150}} />
      <View>
        {!!error && (<Subheading style={{color: 'red', textAlign: 'center', marginBottom: 20}}>
          {error}
        </Subheading>)}
        <TextInput style={[styles.input, {color: textColor}]} placeholder='Name' value={name} onChangeText={text => setName(text)}/>
        <TextInput style={[styles.input, {color: textColor}]} placeholder='Email' value={email} onChangeText={text => setEmail(text)}/>
        <TextInput style={[styles.input, {color: textColor}]} placeholder='Password' secureTextEntry value={password} onChangeText={text => setPassword(text)}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <Button compact onPress={() => navigation.navigate('SignIn')}>Sign In</Button>
          <Button mode='contained' onPress={() => createUser()}>Sign Up</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: 300,
    marginTop: 50,
  }
});
