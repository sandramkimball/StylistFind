import React, {useState, useEffect} from 'react'
import {GoogleMap, Marker,InfoWindow, withScriptjs, withGoogleMap} from 'react-google-maps'
import axios from 'axios'


function Map(props) {
    const [selectedStylist, setSelectedStylist] = useState(props.results[0])

    // useEffect(()=>{
    //     var adrs = `${selectedStylist.city}+${selectedStylist.state}+${selectedStylist.zipcode}`;
    //     axios
    //     .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adrs}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    //     .then(res=> {
    //         setLat(res.geometry.location.lat)
    //         setLng(res.geometry.location.lng)
    //     })
    //     .catch(err=> console.log(err))
    // })

    return(
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{lat: 32.723555, lng: -117.168417}}
        >
            {/* {props.results.map(stylist=> (
                <Marker 
                    key={stylist.id}
                    position={{
                        lat: stylistLat,
                        lng: stylistLng,
                    }}
                    onClick={()=> {setSelectedStylist(stylist)}}
                />
            ))}

            {selectedStylist &&(
                <InfoWindow
                    position={{
                        lat: stylistLat,
                        lng: stylistLng,
                    }}
                    onCloseClick={()=> {setSelectedStylist(null)}}
                >                
                    <div>
                        <h2>{selectedStylist.first_name} {selectedStylist.first_name}</h2>
                        <p>{selectedStylist.street_address}</p>
                        <p>{selectedStylist.city}</p>
                    </div>
                </InfoWindow>
            )} */}
        </GoogleMap>
    )
}

export const SearchMap = withScriptjs(withGoogleMap(Map))
                    