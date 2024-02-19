/*eslint-disable*/
import React from 'react'
import { Text} from 'react-native'

export default function CustomText({content,color,fontSize,fontWeight}) {
  return (
   <Text style={{color,fontSize,fontWeight}} >
      {content}
   </Text>
  )
}
