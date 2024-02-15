import { AppContext } from "../App"
import { useContext, useEffect } from "react"
import { useQuery } from '@tanstack/react-query'
import { useState } from "react"
import './Destinations.css'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const getDestinations = async (lon, lat, attraction)=>{
    try{
        const req = await fetch(
            "https://places.googleapis.com/v1/places:searchNearby",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_API_KEY,
                    "X-Goog-FieldMask":"places.displayName,places.id",
                },
                body : JSON.stringify(
                    {
                        "includedTypes": [attraction],
                        "maxResultCount": 5,
                        "locationRestriction": {
                          "circle": {
                            "center": {
                              "latitude": lat,
                              "longitude": lon},
                            "radius": 1000
                          }
                        }
                    }
                )
            },
           
        )

        if (req.ok){
            const data = await req.json();
            return data

        }
    }
    catch(err){
        console.log(err)
    }

}

function Destinations(){
    const {location} = useContext(AppContext)
    const [filter, setFilter] = useState('')
    const [destinations, setDestinations] = useState('')
    const lon = location.longitude 
    const lat = location.latitude
    let attraction = filter ? filter : "museum"

    const {data, status} = useQuery({
        queryKey:["destinations", attraction],
        queryFn: ()=>getDestinations(lon, lat, attraction)
    })
    console.log(status);
    useEffect(()=>{
        if(status === "success"){
            console.log(data)
            

            const popDest = data.places.map((item,index)=>{
                return(
                    <div key={index} className="destination-card">
                        <strong><p>{item.displayName.text}</p></strong>
                    </div>
                )
            })
            setDestinations(popDest)
        }
    },[status, data, filter, attraction])


    return(
        <div className="attraction-card">
            <label htmlFor="attraction-filter">
                Filter by Attraction Type:
                <select name="attraction-filter" id="attraction-filter" value={filter} onChange={(e)=> setFilter(e.target.value)}>
                    <option value="museum">Museum</option>
                    <option value="park">Park</option>
                </select>
            </label>
            {destinations}
        </div>
        
    )
}

export default Destinations