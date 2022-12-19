import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Keyboard, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from './firebase/config';
import { React, useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  const user = firebase.auth().currentUser;
  const passwordRef = firebase.firestore().collection(user.uid);
  const [addPassword, setAddPassword] = useState();
  const [password, setPassword] = useState([]);

  useEffect(() => {
    /*const subscribe = firebase.firestore()
      .collection(user.uid)
      .doc("zAYyzTGWaHwjZ1QR2gEb")
      .onSnapshot(documentSnapshot => {
        console.log('data', documentSnapshot.data());
        setData(documentSnapshot.data());
        console.log('data after', data.heading);
      });

    return () => subscribe();
  }, ["zAYyzTGWaHwjZ1QR2gEb"]);
*/
    const subscribe = async () => {
      const snapshot = await passwordRef.get();
      const data = [];
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
      });
      setPassword(data);
      console.log("ok", password);
    }

    return () => subscribe();
  }, []);

  const addField = () => {
    if (addPassword && addPassword.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addPassword,
        createdAt: timestamp
      };
      passwordRef
        .add(data)
        .then(() => {
          setAddPassword();
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        })
    }
  }
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Hello {user.email.split('@')[0]}</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Add a password'
          onChangeText={(value) => setAddPassword(value)}
          value={addPassword}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={addField}>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
          <Text>Password List:</Text>
      </View>
        {console.log("data", password.values)}
        <FlatList
          data={password}
          renderItem={renderItem}
        />
    </SafeAreaView>
  );
}
/*
export default function Home({ navigation }) {
 return (
   <SafeAreaView style={{ flex: 1 }}>
     <Text style={styles.title}>Home</Text>
     <View>
       <TextInput
         style={styles.input}
         placeholder='Add some text'
         placeholderTextColor='#aaaaaa'
         onChangeText={(value) => setAddData(value)}
         value={addData}
         multiline={true}
       />
     </View>
   </SafeAreaView>
 );
};*/

const styles = StyleSheet.create({
  header: {
    visible: false,
  },
  title: {
    textAlign: 'center',
    paddingTop: '25%',
    fontWeight: 'bold',
    fontSize: '40%'
  },
  main: {
    paddingTop: '30%',
    marginHorizontal: 50
  },
  footer: {
    paddingBottom: '20%',
    marginHorizontal: 110
  },
  text: {
    fontSize: '20%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonNewAccountText: {
    paddingTop: '70%',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});