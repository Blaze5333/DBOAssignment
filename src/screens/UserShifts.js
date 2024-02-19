/*eslint-disable*/
import React ,{useState,useEffect}from 'react'
import { SectionList, View,StyleSheet, ActivityIndicator } from 'react-native'
import CardItem from '../components/CardItem'
import CustomText from '../components/CustomText'
import { background, inactiveColor, text } from '../utils/colors'
import { filterAccordingToTime } from '../utils/data/filterData'
import axios from 'axios'
import { uri } from '../../config/credentials'

export default function UserShifts() {
    const [state, setstate] = useState([])
    const [loader, setloader] = useState(false)
    const [screenLoader, setscreenLoader] = useState(false)
    let unfilteredData=[
        {
          "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
          "booked": true,
          "area": "Helsinki",
          "startTime":Date.now()+2*60*60*1000,
          "endTime": Date.now()+4*60*60*1000
        },
        {
          "id": "001e40e5-05dc-4b9d-bdc5-cae63f651970",
          "booked": true,
          "area": "Tampere",
          "startTime": 1523602800000,
          "endTime": 1523610000000
        }
      ]
    useEffect(() => {
      setscreenLoader(true)
       getFilteredData()
       setscreenLoader(false)
    }, [])
     const getFilteredData=async()=>{
       axios.get(`${uri}/shifts`).then(async(response)=>{
        const data=await filterAccordingToTime(unfilteredData)
        setstate(data)
         }).catch((err)=>{
          console.log(err)
         })
        }
     const onHandlePress=(id,action)=>{
          if(action){
            setloader(id)
            axios.post(`${uri}/shifts/${id}/cancel`).then(()=>{
              getFilteredData()
              setloader(false)
            })
          }
          else{
            setloader(id)
            axios.post(`${uri}/shifts/${id}/book`).then(()=>{
              getFilteredData()
              setloader(false)
            })
          }
     }
  return (
    <View style={style().container}>
        {!screenLoader&&state.length!=0&&
        <SectionList
            sections={state}
            renderItem={({item})=><CardItem booked={item.booked} overlap={item.overlap} duration={item.duration} city={item.city} loading={loader} onPress={onHandlePress} id={item.id} />}
            renderSectionHeader={({section})=>
            <View style={style().header}>
               <CustomText content={section.title.date} fontSize={20} color={inactiveColor} fontWeight={'bold'}/>
                <CustomText content={`${section.title.shifts} shifts , ${section.title.hours} h`} fontSize={15} color={inactiveColor} fontWeight={'normal'}/>
            </View>
            }
        />}
        {screenLoader&&
        <View style={style().loaderContainer}>
        <ActivityIndicator color={'green'} size={'large'}/>
        </View>
        }
    </View>
  )
}
const style=()=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:background.primary
      },
   header:{
    width:"100%",
    padding:15,
    gap:10,
    flexDirection:'row',
    alignItems:"center",
    backgroundColor:background.secondary,
    borderBottomWidth:0.5
   },
   loaderContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
   }
})