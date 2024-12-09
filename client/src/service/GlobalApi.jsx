import axios from "axios"

const BASE_URL = "https://places.googleapis.com/v1/places:searchText"
const config ={
    headers:{
        'Content-type':'application/json',
        'X-Goog-Api-Key':import.meta.env.VITE_TOM_TOM_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails = (data)=>axios.post(BASE_URL,data,config);