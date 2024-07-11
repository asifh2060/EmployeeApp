import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeList from './screens/EmployeeList';
import EmployeeDetails from './screens/EmployeeDetails';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="EmployeeList" component={EmployeeList} />
        <Tab.Screen name="EmployeeDetails" component={EmployeeDetails} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}