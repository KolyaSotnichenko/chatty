import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatItem from '../components/ChatItem/ChatItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//firebase
import { fs, auth } from '../firebase';
import {collection, getDocs, where, query} from 'firebase/firestore'

export default function ChatsScreen({ navigation }: RootTabScreenProps<'Chats'>) {

  const [chats, setChats] = useState<String[]>([])
  const [email, setEmail] = useState('')



  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setEmail(user?.email ?? '')
    })
  }, [])

  useEffect(() => {
    fetchChats()
  }, [chats])

  const fetchChats = async () => {

    const q = await query(collection(fs, 'chats'), where('users', 'array-contains', email))

    const querySnapshot = await getDocs(q)

    const fetchedChats = new Array()

    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
      fetchedChats.push(doc.data())
    })

    setChats(fetchedChats)
  }

  return (
    <View >
      <FlatList
        data={chats}
        renderItem={({item}) => <ChatItem chat={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
