import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

//firebase
import { fs, auth } from '../firebase';
import {doc, setDoc, onSnapshot} from 'firebase/firestore'
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {

  const route = useRoute()
  const chatId = route.params

  const [messages, setMessages] = useState([])
  const [uid, setUID] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUID(user?.uid ?? '')
      setName(user?.displayName ?? '')
    })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [chatId])

  const fetchMessages = async () => {
    await onSnapshot(doc(fs, 'chats/' + chatId), (snapshot) => {
      setMessages(snapshot.data()?.messages ?? [])
    })
  }

  console.log(chatId)

  const onSend = (m = []) => {
    setDoc(doc(fs, 'chats/' + chatId), {
      messages: GiftedChat.append(messages, m)
    },
    {
      merge: true
    }
    )
  }

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: uid,
          name: name
        }}
      />
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({});
