import { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

import addresses from '../../data/addresses.json';

const MapView = ({ setMapData }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = map.getBounds();
    const center = map.getCenter();
    const zoom = map.getZoom();

    setMapData({ bounds, center, zoom });

    map.on('zoomend', () => {
      const newBounds = map.getBounds();
      const newCenter = map.getCenter();
      const newZoom = map.getZoom();
      setMapData({ bounds: newBounds, center: newCenter, zoom: newZoom });
    });
  }, [map, setMapData]);

  return (
    <>
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
    </>
  );
};

MapView.propTypes = {
  setMapData: PropTypes.func.isRequired,
};

export default MapView;
