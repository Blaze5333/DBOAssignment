/*eslint-disable*/
const tommorrow=new Date()
tommorrow.setDate(tommorrow.getDate()+1)
tommorrow.setHours(0,0,0,0)
const today=new Date()
today.setHours(0,0,0,0)
const months=['January','February','March','April','May','June','July','August','September','October','November','December']
const formatedate=(data)=>{
    const date=data.toDateString()
    if(date===today.toDateString()){
        return "Today"
    }
    else if(date===tommorrow.toDateString()){
        return "Tommorrow"
    }
    else{
        return 'Others'
    }
 }
 const filterAccordingToTime=(data)=>{
    console.log("data",data)
const groupedData=data.reduce((acc,item)=>{
   const start = new Date(item.startTime);
   const end = new Date(item.endTime);
   let date = formatedate(start);
   const duration=(end-start)/(1000*60*60)
   if(date==='Others'){
       date=months[start.getMonth()]+" "+start.getDate()
   }
   if(!acc[date]){
       acc[date]={
           
              title:{ 
               date,
               shifts:0,
               hours:0,
              },
               data:[]
           
           
       }
   }
   let obj={
               duration:`${new Date(item.startTime).getHours()}:${new Date(item.startTime).getMinutes()}-${new Date(item.endTime).getHours()}:${new Date(item.endTime).getMinutes()}`,
               city:item.area,
               overlap:item.startTime<Date.now()?true:false,
               id:item.id,
               booked:item.booked,
               startTime:item.startTime,
               endTime:item.endTime
           }
           acc[date].title.shifts+=1
           acc[date].data.push(obj)
           acc[date].title.hours+=duration
      return acc
},{})
const result=Object.values(groupedData)
return result
}
module.exports={filterAccordingToTime}
