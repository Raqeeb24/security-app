import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function Signup() {
  <Pressable onPress={() => navigation.navigate('login')}>
    <Text style={styles.buttonNewAccountText}>Create a new account</Text>
  </Pressable>
  return (

    <Pressable style={styles.button} onPress={() => navigation.navigate('login')}>
      <Text style={styles.buttonText}>continue</Text>
    </Pressable>

  );
}
/*
 <FlatList
          data={password}
          renderItem={({ item }) => {
            if (Array.isArray(password)) {
              console.log("its an array")
            }
            <Pressable>
              <View>
                <Text>{item.id}</Text>
                <Text>{item.createdAt}</Text>
                {console.log("heading: ", item.heading)}
              </View>
            </Pressable>
          }}
          keyExtractor={(item) => item.createdAt}
        />
        */