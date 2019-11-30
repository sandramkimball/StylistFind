import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React from 'react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {


    constructor(props){
        super(props);
        this.state={
            salons:[{zipcode: 92021}]
        }
    };

    displayMarkers = () => {
        return this.state.salons.map((salon, index)=> {
            return <Marker key={index} id={index} position ={{}}
            onClick={()=> console.log('Map was clicked')}/>
        })
    };

    

    render() {
        return (
            <Map 
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{zipcode: 92021}}
            >
                {this.displayMarkers()}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'TOKEN'
})(MapContainer);