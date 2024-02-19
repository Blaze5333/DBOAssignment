/*eslint-disable*/
import React from 'react'
import { StyleSheet, Touchable, View,TouchableOpacity } from 'react-native'
import { background, inactiveColor, text } from '../utils/colors'
import CustomText from './CustomText'
import CustomButton from './CustomButton'

export default function CardItem(
    {
    duration,
    city,
    loading,
    customStyle,
    onPress,
    id,
    showState=false,
     booked,
     overlap,
     overlappingHours=false
 }) {
        const content=overlappingHours?'Overlapping':booked&&overlap?'Booked':''
        const color=overlappingHours?text.overlapping:booked&&overlap?inactiveColor:'white'
        console.log(content,color)
  return (
   <View style={style().container}>
     <View>
        <CustomText content={duration} fontWeight={'bold'} fontSize={20} color={inactiveColor}/>
        {!showState&&<CustomText content={city} fontWeight={'normal'} fontSize={15} color={inactiveColor}/>}
     </View>
     <View style={style().innerContainer}>
     {showState&&<CustomText content={content} fontWeight={'bold'} fontSize={15} color={color}/>}
     <CustomButton  overlappingHours={overlappingHours} onPress={onPress} booked={booked} overlap={overlap} loading={loading} id={id} />
     </View>
    
   </View>
  )
}
const style=(borderColor)=>StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        backgroundColor:background.primary,
         width:"100%",
         alignItems:"center",
         borderBottomWidth:0.5
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        padding:15,
        borderColor
      },
      innerContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:10
      }
})
