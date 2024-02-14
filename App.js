import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecommendationForm from './recommendationForm';
import TheWall from './TheWall';
import latestRecommendation from './lastRecommendation';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name="RecomendeMe" component={RecommendationForm} />
      <Stack.Screen name="Wall" component={TheWall} />
      <Stack.Screen name="Last" component={latestRecommendation} />
    

   
      
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;