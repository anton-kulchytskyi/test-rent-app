import { useState, useEffect } from 'react';
import { Layout, Button, List, Tooltip, Space } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import { MapContainer } from 'react-leaflet';

import addresses from './data/addresses.json';

import 'leaflet/dist/leaflet.css';
import './App.css';
import MapContent from './components/MapContent/MapContent';
import RightSideBar from './components/RightSideBar/RightSideBar';
import HeaderNavBar from './components/HeaderNavBar/HeaderNavBar';

const { Header, Sider, Content, Footer } = Layout;

const DEFAULT_CENTER = [48.3794, 31.1656];

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#2a3439',
};
const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  backgroundColor: '#708090',
};
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#708090',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#36454f',
};
const layoutStyle = {
  overflow: 'hidden',
  height: '100vh',
};

function App() {
  const [mapData, setMapData] = useState(null);
  const [toggleMap, setToggleMap] = useState(true);
  const [visibleAddresses, setVisibleAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState([]);

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

    if (selectedRegion.length) {
      const filteredCoords = addresses.filter((address) => {
        return selectedRegion.includes(address.region);
      });

      setVisibleAddresses(filteredCoords);
    }
  }, [mapData, selectedRegion]);

  const handleToggle = () => {
    setToggleMap(!toggleMap);
  };

  const removeRegion = (region) => {
    const updateRegions = selectedRegion.filter((item) => item !== region);
    setSelectedRegion(updateRegions);
  };

  return (
    <Layout
      theme="light"
      style={layoutStyle}
    >
      <Header style={headerStyle}>
        <HeaderNavBar />
      </Header>
      <Layout style={layoutStyle}>
        <Sider
          width="15%"
          style={siderStyle}
        >
          <Button
            size="large"
            onClick={handleToggle}
          >
            {toggleMap ? 'Показати списком' : 'Показати на мапі'}
          </Button>
          <List
            header={<div>Вибрані області</div>}
            bordered
            dataSource={selectedRegion}
            renderItem={(item) => (
              <List.Item>
                <Space>{item}</Space>
                <Tooltip title="delete">
                  <Button
                    type="dashed"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => removeRegion(item)}
                  />
                </Tooltip>
              </List.Item>
            )}
          />
        </Sider>
        <Content style={contentStyle}>
          <MapContainer
            center={DEFAULT_CENTER}
            zoom={6}
            scrollWheelZoom={false}
          >
            <MapContent
              addresses={addresses}
              setMapData={setMapData}
              setSelectedAddressId={setSelectedAddressId}
              setSelectedRegion={setSelectedRegion}
            />
          </MapContainer>
        </Content>
        <Sider
          width={toggleMap ? '25%' : '85%'}
          style={siderStyle}
        >
          <RightSideBar
            visibleAddresses={visibleAddresses}
            selectedCard={selectedCard}
            toggleMap={toggleMap}
          />
        </Sider>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
