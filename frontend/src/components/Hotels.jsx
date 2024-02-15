import { AppContext } from "../App"
import { useContext, useEffect } from "react"
import {useQuery} from '@tanstack/react-query'
import HOST from "../helpers/host"
import { useState } from "react"
import './Hotels.css'



const getHotels = async (lon, lat)=>{
    try{    const response = await fetch(HOST+'/api/hotels/getHotels?longitude='+lon+'&latitude='+lat)
    console.log(response)
    return response.json()
}
catch(err){
    console.log(err)
}


}

function Hotels(){

    const {location} = useContext(AppContext)
    const lon = location.longitude 
    const lat = location.latitude
    const [hotels, setHotels] = useState([])

    const {data, status} = useQuery({
        queryKey: ["hotels"],
        queryFn: ()=>getHotels(lon,lat)
    })
    console.log(status)
    useEffect(()=>{

        if(status=='success'){
            console.log(data)
            const hotelList = data.data.map((item, index)=>{if(index < 10){
                return(
                    <div className="hotel" key={index}>
                        <strong>{item.name}</strong>
                    </div>
                )
            }})
            setHotels(hotelList)
        }
            
    },[status, data])


    return (
        <div className="hotel-div">
           {hotels}
        </div>
    )
}

export default Hotels