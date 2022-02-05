import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';


import {collection, getDocs} from 'firebase/firestore'
import { fs, auth } from '../firebase';
import UserItem from '../components/UserItem/UserItem';

export default function UsersScreen() {

  const [users, setUsers] = useState<String[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const data = await getDocs(collection(fs, 'users'))

    const fetchedUsers = new Array()

    data.forEach((doc: { id: any; data: () => any; }) => {
      if(doc.data().email !== auth.currentUser?.email){
        fetchedUsers.push(doc.data()) 
      }
    });

    setUsers(fetchedUsers)
  }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({

});
