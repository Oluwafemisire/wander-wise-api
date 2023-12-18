const axios = require('axios')
const {ClientCredentials, ResourceOwnerPassword, AuthorizationCode} = require('simple-oauth2')

const CLIENT_ID = process.env.AMADEUS_CLIENT_ID
const CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET

const config = {
    client:{
        id: CLIENT_ID,
        secret: CLIENT_SECRET,
    },
    auth:{
        tokenHost: 'https://test.api.amadeus.com',
        tokenPath: '/v1/security/oauth2/token',
    }
}

async function getToken(){
    const client  = new ClientCredentials(config)

    const tokenParams = {
        scope: ['client_credentials']
    }

    try{
        const accessToken = await client.getToken(tokenParams);
        console.log(accessToken)
        return accessToken.token
    }
    catch(error){
        console.log(error)
    }
}

async function getHotels(token, lon, lat){
    const response = await fetch('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude='+lat+'&longitude='+lon+'&radius=100&radiusUnit=KM',
    {
        method:'GET',
        headers:{
            "Authorization": "Bearer "+ token
        }
    })
    console.log(response)
    return response.json()
}

async function getHotelPrices(token, hotelId){
    const response = await fetch()
}

const Hotels = async (req, res) =>{

    const accessToken = await getToken()
    const {longitude, latitude} = req.query
    console.log(accessToken.access_token)
    const hotels = await getHotels(accessToken.access_token, longitude, latitude)
    res.status(201).send(hotels)

}

const HotelPrice = async (req,res) => {
    const accessToken = await getToken()
    const {hotelId} = req.query

}

module.exports = {
Hotels
}  