import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React, {useState} from 'react';



export function MapContainer(props) {

    const [zipcodes, setZipcodes] = useState([])
        
    const mapStyles = {
        width: '95%',
        height: '30vh',
        border: '1px solid black',
        margin: '0 auto',
      

    };

    const displayMarkers = () => {
        return zipcodes.map((zipcode, index)=> {
            return <Marker key={index} id={index} position ={zipcode}
            onClick={()=> console.log('Map was clicked')}/>
        })
    };

    
    return (
        <Map 
            google={props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{zipcode: 92021}}
        >
            {displayMarkers()}
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'Beautiful Hair'
})(MapContainer);