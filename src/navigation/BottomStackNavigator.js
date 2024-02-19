/*eslint-disable*/
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { activeColor, inactiveColor, text } from '../utils/colors';
import CustomText from '../components/CustomText';
import UserShifts from '../screens/UserShifts';
import AvailableShifts from '../screens/AvailableShifts';

export default function BottomStackNavigator() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: activeColor,
      tabBarShowLabel:false,
    }}
    
    >
      <Tab.Screen name="myShifts" component={UserShifts}
        options={{
          tabBarIcon: ({ color,focused }) => (
            <CustomText content={'My shifts'} color={focused?activeColor:inactiveColor} fontSize={18} fontWeight={'normal'}/>
          ),
        }}
       />
      <Tab.Screen name="availableShifts" component={AvailableShifts}
        options={{
          tabBarIcon: ({ color,focused }) => (
            <CustomText content={'Available shifts'} color={focused?activeColor:inactiveColor} fontSize={18} fontWeight={'normal'}/>
          ),
        }}
       />
    </Tab.Navigator>
  )
}
