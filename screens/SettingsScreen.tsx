import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import {Avatar, Title, Subheading, Button} from 'react-native-paper'
import useColorScheme from '../hooks/useColorScheme';
import {auth} from '../firebase'
import { useEffect, useState } from 'react';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  let textColor: string = ''

  const [name, setName] = useState<String|null|undefined>('')
  const [email, setEmail] = useState<String|null|undefined>('')

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setName(user?.displayName ?? ""),
      setEmail(user?.email ?? "")

    })
  }, [])

  if(colorScheme == 'dark'){
    textColor = 'white'
  }else{
      textColor = 'black'
  }
  
  if(name){
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Avatar.Text label={name.split(' ').reduce((prev, current) => prev + current[0], "")} />
        <Title style={{color: textColor}}>{name}</Title>
        <Subheading style={{color: textColor}}>{email}</Subheading>
        <Button onPress={() => auth.signOut()}>Sign Out</Button>
      </View>
    );
  }else{
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Avatar.Text label="UN" />
        <Title style={{color: textColor}}>{name}</Title>
        <Subheading style={{color: textColor}}>{email}</Subheading>
        <Button onPress={() => auth.signOut()}>Sign Out</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
