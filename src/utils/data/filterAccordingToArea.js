/*eslint-disable*/
const filterArea=(data)=>{
    const filteredData=data.reduce((acc,curr)=>{
        if(!acc[curr.area]){

            acc[curr.area]={
                area:curr.area,
                data:[]
            }
        }
        acc[curr.area].data.push(curr)
        return acc
    },{})
    const result=Object.values(filteredData)
    return result
}
module.exports={filterArea}