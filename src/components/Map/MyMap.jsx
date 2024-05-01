import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import addresses from '../../data/addresses.json';
import data from '../../data/regions.json';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';
import MapView from '../MapView/MapView';

const DEFAULT_CENTER = [48.3794, 31.1656];

const MyMap = () => {
  const [mapData, setMapData] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [visibleAddresses, setVisibleAddresses] = useState([]);

  useEffect(() => {
    if (mapData) {
      const { bounds } = mapData;
      console.log(bounds);
      const filteredCoords = addresses.filter((address) => {
        return bounds.contains(address.coordinates);
      });
      setVisibleAddresses(filteredCoords);
    }
  }, [mapData]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        setHoveredFeature(e.target.feature.properties.name);
      },
      mouseout: () => {
        setHoveredFeature(null);
      },
    });
  };

  return (
    <div className={styles.container}>
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
          <MapView
            mapData={mapData}
            setMapData={setMapData}
          />
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

      <ul>
        <h2>visibleAddresses {visibleAddresses.length}</h2>
        {visibleAddresses.map((address, i) => (
          <li key={i}>
            {address.settlement_name} {address.street}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyMap;
