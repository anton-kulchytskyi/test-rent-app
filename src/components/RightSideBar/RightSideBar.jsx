import { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, List, Modal, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardItem from '../CardItem/CardItem';
import ProductCard from '../ProductCard/ProductCard';

const RightSideBar = ({ visibleAddresses, selectedCard, toggleMap }) => {
  const [selectedProductCard, setSelectedPruductCard] = useState({});
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const selectProductCard = (id) => {
    const newSelectedProductCard = visibleAddresses.find(
      (address) => address.id === id
    );
    setSelectedPruductCard(newSelectedProductCard);
    setIsCardModalOpen(true);
  };

  const handleCancel = () => {
    setIsCardModalOpen(false);
  };
  const cardCnt = toggleMap ? 1 : 3;
  return (
    <div
      id="scrollableDiv"
      style={{
        height: '100%',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={visibleAddresses.length}
        hasMore={visibleAddresses.length < 50}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Space direction="vertical">
          {selectedCard && (
            <>
              <h3>Вибране на мапі оголошення</h3>
              <CardItem address={selectedCard} />
            </>
          )}
        </Space>
        <Divider plain />
        <h3>
          Знайдено {visibleAddresses.length} оголошень на видимій території
        </h3>
        <List
          grid={{ gutter: 16, column: cardCnt }}
          dataSource={visibleAddresses}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => selectProductCard(item.id)}
            >
              <CardItem address={item} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <Modal
        title={selectedProductCard.type}
        open={isCardModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <ProductCard selectedProductCard={selectedProductCard} />
      </Modal>
    </div>
  );
};

RightSideBar.propTypes = {
  selectedCard: PropTypes.any,
  visibleAddresses: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleMap: PropTypes.bool.isRequired,
};

export default RightSideBar;
