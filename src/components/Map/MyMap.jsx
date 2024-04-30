import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,

  // Polygon,
  GeoJSON,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import addresses from '../../data/addresses.json';
import data from '../../data/regions.json';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = [48.3794, 31.1656];

const MyMap = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        console.log(e.target.feature.properties.name);
        setHoveredFeature(e.target.feature.properties.name);
      },
      mouseout: () => {
        setHoveredFeature(null);
      },
    });
  };

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {addresses.map((adress, i) => (
          <Marker
            key={i}
            position={adress.coordinates}
          >
            <Popup>
              {adress.settlement_name}
              <br /> {adress.street}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <GeoJSON
        data={data}
        style={(feature) => {
          if (hoveredFeature === feature.properties.name) {
            return { opacity: '1' };
          } else {
            return { opacity: '0.4' };
          }
        }}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default MyMap;
