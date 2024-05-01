import { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

import { MapContainer } from 'react-leaflet';

import addresses from './data/addresses.json';

import 'leaflet/dist/leaflet.css';
import './App.css';
import MapContent from './components/MapContent/MapContent';
import RightSideBar from './components/RightSideBar/RightSideBar';

const { Header, Sider, Content, Footer } = Layout;

const DEFAULT_CENTER = [48.3794, 31.1656];

function App() {
  const [mapData, setMapData] = useState(null);
  const [toggleMap, setToggleMap] = useState(true);

  const [visibleAddresses, setVisibleAddresses] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const newSelectedCard = addresses.find(
      (address) => address.id === selectedAddressId
    );

    setSelectedCard(newSelectedCard);
  }, [selectedAddressId]);

  useEffect(() => {
    if (mapData) {
      const { bounds } = mapData;
      const filteredCoords = addresses.filter((address) => {
        return bounds.contains(address.coordinates);
      });
      setVisibleAddresses(filteredCoords);
    }
  }, [mapData]);

  const handleToggle = () => {
    setToggleMap(!toggleMap);
  };

  return (
    <Layout
      theme="light"
      className="layoutStyle"
    >
      <Header className="headerStyle">Header</Header>
      <Layout className="layoutStyle">
        <Sider
          width="15%"
          className="siderStyle"
          style={{
            backgroundColor: '#d9dddc',
          }}
        >
          <Button
            size="large"
            onClick={handleToggle}
          >
            {toggleMap ? 'Показати списком' : 'Показати на мапі'}
          </Button>
        </Sider>
        <Content className="contentStyle">
          <MapContainer
            center={DEFAULT_CENTER}
            zoom={6}
            scrollWheelZoom={false}
          >
            <MapContent
              addresses={addresses}
              setMapData={setMapData}
              setSelectedAddressId={setSelectedAddressId}
            />
          </MapContainer>
        </Content>
        <Sider
          width={toggleMap ? '25%' : '85%'}
          className="siderStyle"
        >
          <RightSideBar
            visibleAddresses={visibleAddresses}
            selectedCard={selectedCard}
          />
        </Sider>
      </Layout>
      <Footer className="footerStyle">Footer</Footer>
    </Layout>
  );
}

export default App;
