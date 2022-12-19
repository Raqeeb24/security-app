import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import { auth } from './firebase/config';
import Signup from './Signup';
import Home from './Home';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="app">
        <Stack.Screen name="app" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="signup" component ={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Start({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    const logout = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('home')
      }
    })
    return logout
  })

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with: ', user.email);
      })
      .catch(error => alert(error.message))
  }
  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with: ', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.main}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>continue</Text>
        </Pressable>
        
      </View>
      <View style={styles.footer}>
      <Pressable onPress={handleSignup}>
          <Text style={styles.buttonNewAccountText}>Create a new account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

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
