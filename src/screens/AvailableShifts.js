/*eslint-disable*/
import React,{useEffect,useState} from 'react'
import { View,TouchableOpacity,StyleSheet,SectionList,ActivityIndicator } from 'react-native'
import { filterArea } from '../utils/data/filterAccordingToArea'
import { activeColor, background, border, inactiveColor } from '../utils/colors'
import CustomText from '../components/CustomText'
import { filterAccordingToTime } from '../utils/data/filterData'
import CardItem from '../components/CardItem'
import axios from 'axios'
import { uri } from '../../config/credentials'
import { filterOnHours } from '../utils/data/filterHours'

export default function AvailableShifts() {
  const [areaList, setareaList] = useState('')
  const [focused, setfocused] = useState('')
  const [data, setdata] = useState([])
  const [loader, setloader] = useState(false)
  const [screenLoader, setscreenLoader] = useState(false)
  // let unfilteredData=[
  //   {
  //     "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
  //     "booked": true,
  //     "area": "Helsinki",
  //     "startTime":Date.now()+2*60*60*1000,
  //     "endTime": Date.now()+4*60*60*1000
  //   },
  //   {
  //     "id": "95a2aaca-cab8-4504-8646-f75b325ec0e7",
  //     "booked": false,
  //     "area": "Helsinki",
  //     "startTime":Date.now()+3*60*60*1000,
  //     "endTime": Date.now()+5*60*60*1000
  //   },
  //   {
  //     "id": "001e40e5-05dc-4b9d-bdc5-cae63f651970",
  //     "booked": true,
  //     "area": "Tampere",
  //     "startTime": 1523602800000,
  //     "endTime": 1523610000000
  //   }
  // ]
  const filterData=async(area)=>{
    axios.get(`${uri}/shifts`).then(async(response)=>{
      const filterArea1=await filterArea(response.data)
      setareaList(filterArea1)
      let data1;
      if(area){
        const areaDetail=filterArea1.filter((item)=>(item.area==area))
        data1=await filterAccordingToTime(areaDetail[0].data)
      }
      else if(focused==''){
        setfocused(filterArea1[0].area)
        data1=await filterAccordingToTime(filterArea1[0].data)
      }
      else{
        const areaDetail=filterArea1.filter((item)=>(item.area==focused))
        data1=await filterAccordingToTime(areaDetail[0].data)
      }
      let fileteredData=[]
      data1.map(async(item)=>{
        item.data=await filterOnHours(item.data)
        const data2=await filterOnHours(item.data)
        fileteredData.push({title:{date:item.title.date},data:data2})
        setdata(fileteredData)
      })
    }).catch((err)=>{
      
      console.log(err)
    })
       
  }
  useEffect(() => {
    setscreenLoader(true)
       filterData()
  setscreenLoader(false)
  }, [])
  const onHandlePress=async(area)=>{
      setfocused(area)
      filterData(area)
  }
  const onUpdate=async(id,action)=>{
    if(action){
      setloader(id)
      axios.post(`${uri}/shifts/${id}/cancel`).then(()=>{
        filterData()
        setloader(false)
      })
    }
    else{
      setloader(id)
      axios.post(`${uri}/shifts/${id}/book`).then(()=>{
        filterData()
        setloader(false)
      })
    }
  }
  return (
    <View style={style().container}>
    <View>
    <View style={style().header}>
       {areaList&&areaList.map((item,index)=>(
        <TouchableOpacity key={index} onPress={()=>{onHandlePress(item.area)}}>
             <CustomText color={focused==item.area?activeColor:inactiveColor} content={`${item.area} (${item.data.length})`} fontSize={20}/>
       </TouchableOpacity>
       ))}
   </View>
       {data.length!=0&&
        <SectionList
            sections={data}
            renderItem={({item})=><CardItem showState={true} overlappingHours={item.overlappingHours} overlap={item.overlap} booked={item.booked} duration={item.duration} city={item.city} loading={loader}  onPress={onUpdate} id={item.id} />}
            renderSectionHeader={({section})=>
            <View style={style().renderedHeader}>
               <CustomText content={section.title.date} fontSize={20} color={inactiveColor} fontWeight={'bold'}/>
                
            </View>
            }
        />}
         </View>
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
    width:'100%',
    backgroundColor:background.secondary,
    borderBottomWidth:0.5,
    borderColor:border.inactive,
    justifyContent:"space-evenly",
    flexDirection:'row',
    alignItems:"center",
    padding:15
  },
  renderedHeader:{
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