import { Pressable, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import useColorScheme from '../../hooks/useColorScheme';
import {Text, View} from '../Themed'
import { Avatar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//firebase
import { auth, fs } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const UserItem = ({user}:{user: any}) => {

const colorScheme = useColorScheme();

const [email, setEmail] = useState('')
const [userEmail, setUserEmail] = useState('')

useEffect(() => {
    auth.onAuthStateChanged((user) => {
        setEmail(user?.email ?? '')
    })
},[])

const navigation = useNavigation()

const createChat = async () => {

    setUserEmail(user.email)

    if(!email || !userEmail) return

    const response = await addDoc(collection(fs, 'chats'), {
        users: [email, userEmail]
    })

    navigation.navigate('Chat', {chatId: response.id})
}

  let textColor: string = ''
  let descTextColor: string = ''

  if(colorScheme == 'dark'){
      textColor = 'white'
      descTextColor = '#ababab'
  }else{
      textColor = 'black'
  }

  return (
    <Pressable onPress={createChat}>
        <List.Item
            title={user.username}
            titleStyle={{color: textColor}}
            left = {() => <Avatar.Text label={user.username.split(' ').reduce((prev: any, current: any[]) => prev + current[0], "")} size={50} />}
        />
    </Pressable>
  );
};

export default UserItem;

const styles = StyleSheet.create({});
