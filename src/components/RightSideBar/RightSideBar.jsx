import PropTypes from 'prop-types';
import { Divider, List, Card, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
const { Meta } = Card;
import InfiniteScroll from 'react-infinite-scroll-component';
const RightSideBar = ({ visibleAddresses, selectedCard }) => {
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
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <h3>
          Знайдено {visibleAddresses.length} оголошень на видимій території
        </h3>
        {selectedCard && <h3>{selectedCard.settlement_name}</h3>}
        <List
          dataSource={visibleAddresses}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                style={{
                  width: 300,
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  avatar={<Avatar icon={<AntDesignOutlined />} />}
                  title={`${item.settlement_name} ${item.street}`}
                  description={`Ціна: ${item.price} UAH`}
                />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

RightSideBar.propTypes = {
  selectedCard: PropTypes.any.isRequired,
  visibleAddresses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RightSideBar;
