import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { LoginScreen } from './src/screens/LoginScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ConversationsScreen } from './src/screens/ConversationsScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Conversations" 
            component={ConversationsScreen}
            options={{ title: 'GojaChat' }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={({ route }) => ({ 
              title: route.params?.conversationName || 'Chat' 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
