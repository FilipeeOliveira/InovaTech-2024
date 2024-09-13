import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from './src/pages/Posts';
import PostDetails from './src/pages/PostDetails';
import Comments from './src/pages/Comments';
import CreatePost from './src/pages/CreatePost';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Profile from './src/pages/Profile';
import { Routes } from './src/routes'

const Stack = createStackNavigator();

export default function App() {
  const [userCredentials, setUserCredentials] = React.useState(null);

  const handleLogin = async (username, password) => {
    try {
      const userData = await AsyncStorage.getItem(username);
      if (userData) {
        const user = JSON.parse(userData);
        if (user.password === password) {
          setUserCredentials({ username, password });
        } else {
          alert('Usuário e Senha inválidos');
        }
      } else {
        alert('Usuário não encontrado...');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {!userCredentials ? (
          <>
            <Stack.Screen name="Login">
              {props => <Login {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Routes">
              {props => <Routes {...props} userCredentials={userCredentials} />}
            </Stack.Screen>
            <Stack.Screen name="PostDetails" component={PostDetails} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}