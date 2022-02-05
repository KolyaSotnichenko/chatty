import { StyleSheet} from 'react-native';
import {Text, View} from '../Themed'
import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'react-native-paper';
import useColorScheme from '../../hooks/useColorScheme';

//firebase

import {collection, addDoc} from 'firebase/firestore'
import { fs, auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';



const ChatItem = ({chat}: {chat: any}) => {

  const [email, setEmail] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setEmail(user?.email ?? '')
    })
  }, [])

  const colorScheme = useColorScheme();

  let textColor: string = ''
  let descTextColor: string = ''

  if(colorScheme == 'dark'){
      textColor = 'white'
      descTextColor = '#ababab'
  }else{
      textColor = 'black'
  }

  const navigation = useNavigation()

  return (
    <View>
        <List.Item
            title={chat.users.find((x: string) => x !== email)}
            titleStyle={{color: textColor}}
            description="Message text"
            descriptionStyle={{color: descTextColor}}
            left = {() => <Avatar.Text label={chat.users.find((x: string) => x !== email).split(' ').reduce((prev: any, current: any[]) => prev + current[0], "")} size={50} />}
            onPress={() => navigation.navigate('Chat', {chatId: chat.id})}
        />
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
