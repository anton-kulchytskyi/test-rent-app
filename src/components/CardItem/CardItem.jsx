import PropTypes from 'prop-types';

import { Card, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
const { Meta } = Card;

const CardItem = ({ address }) => {
  const { settlement_name, street, price } = address;
  return (
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
        title={`${settlement_name} ${street}`}
        description={`Ціна: ${price} UAH`}
      />
    </Card>
  );
};

CardItem.propTypes = {
  address: PropTypes.any.isRequired,
};

export default CardItem;
