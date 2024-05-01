import { useState, useEffect } from 'react';
import { Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import data from '../../data/regions.json';
import 'leaflet/dist/leaflet.css';

import PropTypes from 'prop-types';
import PopUpCard from '../PopUuCard/PopUpCard';

const MapContent = ({ addresses, setMapData, setSelectedAddressId }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const map = useMap();

  useEffect(() => {
    const bounds = map.getBounds();

    setMapData({ bounds });

    map.on('zoomend', () => {
      const newBounds = map.getBounds();

      setMapData({ bounds: newBounds });
    });
  }, [map, setMapData]);

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
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup showCoverageOnHover={false}>
        {addresses.map((adress) => (
          <Marker
            key={adress.id}
            position={adress.coordinates}
            eventHandlers={{
              click: () => {
                setSelectedAddressId(adress.id);
              },
            }}
          >
            <Popup>
              <PopUpCard />
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
            return { color: 'darkgray' };
          } else {
            return { color: 'gray' };
          }
        }}
        onEachFeature={onEachFeature}
      />
    </>
  );
};

MapContent.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.any).isRequired,
  setMapData: PropTypes.func.isRequired,
  setSelectedAddressId: PropTypes.func.isRequired,
};

export default MapContent;
