import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps'


function Map() {
    return(
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{lat: 59.95, lng: 30.33}}
        />
    )
}

export const SearchMap = withScriptjs(withGoogleMap(Map))
                    