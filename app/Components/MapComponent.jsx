import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '20vw',
  height: '30vh',
};

const center = {
  lat: 28.63969716081729, // default latitude
  lng: 77.43746528627192, // default longitude
};
const  MapComponent = () => {
  const apiKey = "AIzaSyCrAJy0emGnKNl0dWKkbHhTVCIFL_U8_EA"; 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className='border-2'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;