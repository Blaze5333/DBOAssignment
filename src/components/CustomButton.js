/*eslint-disable*/
import React from 'react'
import { TouchableOpacity,StyleSheet, Image, ActivityIndicator, View } from 'react-native'
import { background, border, inactiveColor, text } from '../utils/colors'
import CustomText from './CustomText'

export default function CustomButton({loading,onPress,id,booked,overlap,overlappingHours}) {
  return (
    <View>
   {!overlap&&!overlappingHours&&
   <TouchableOpacity onPress={()=>{onPress(id,booked)}}  style={styles(booked?border.cancel:border.book).button}>
    {loading!==id && <CustomText content={booked?'Cancel':'Book'} color={booked?text.cancel:text.book} fontSize={18} fontWeight={'bold'}/>}
    {loading&& loading===id&&!booked&&<ActivityIndicator size="large" color="green" />}
    {loading&& loading===id&&booked&&<ActivityIndicator size="large" color="red" />}
   </TouchableOpacity>}
   {(overlap||overlappingHours)&&
   <TouchableOpacity style={styles(inactiveColor).button}>
   <CustomText content={booked?'Cancel':'Book'} color={inactiveColor} fontSize={18} fontWeight={'bold'}/>
   </TouchableOpacity>
   }
   </View>
  )
}
const styles =(borderColor)=> StyleSheet.create({
  button:{
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,
    borderColor,
    borderWidth:1,
    width:120,
    height:50,
    backgroundColor:background.primary
  }
})
