import { useEffect, useState } from "react";
import "./Discover.css";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom"
import './SignUp.css'
import { useNavigate } from "react-router-dom";


const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Discover() {
  const navigator = useNavigate()
    const { setLocation } = useContext(AppContext);
   const [imgSrc, setImgSrc] = useState('')
   const [imgName, setImageName] = useState('')
  const [location, setSearchLocation] = useState("");
   const [city, setCity] = useState('')
  
  
   const handleClick = ()=>{
    navigator('/')
}

  const handleLogout = ()=>{
    localStorage.removeItem('token')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocation(location);
        try {
          const response = await fetch(
            "https://places.googleapis.com/v1/places:searchText",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_API_KEY,
                "X-Goog-FieldMask":
                  "places.displayName,places.id,places.photos,places.location",
              },
              body: JSON.stringify({
                "textQuery": location,
              }),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            // setImageName(data[0].)
            const res = data.places[0]
            setLocation(res["location"])
            setCity(res.displayName.text)
            setImageName(res.photos[0].name)


           
          }
        } catch (error) {
          console.log(error);
          
        }
  };

  useEffect(()=>{
    const fetchMedia = async () => {
        try {
          const response = await fetch("https://places.googleapis.com/v1/"+ imgName +"/media?key=" +GOOGLE_API_KEY+"&maxHeightPx=200");
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const blob = await response.blob();
          const imgUrl = URL.createObjectURL(blob);
          setImgSrc(imgUrl);
          console.log(imgUrl)
  
        } catch (error) {
          console.error(error);
        
        }
      };
  

      if (imgName) {
        fetchMedia();
      }
}, [imgName])

const display = city&&imgSrc
  return (
    <div>
          <div className="navbar">
            <div className="nav-logo" onClick={handleClick}><strong>WanderWise</strong></div>
            <button className="secondary-button"><Link to={'/login'} onClick={handleLogout}>Logout</Link></button>
        </div>
      <h2>Where would you like to go to?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setSearchLocation(e.currentTarget.value)}
        />
        <button type="submit">Search</button>
      </form>
      {display && <div>
          <h3>{city}</h3>
          <Link to={'/'+city}><img src={imgSrc} alt="City" /></Link>
        </div>
      }
    </div>
  );
}

export default Discover;
