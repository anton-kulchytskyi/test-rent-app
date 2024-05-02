import { Flex, Typography, Image } from 'antd';
const { Title } = Typography;
import PropTypes from 'prop-types';

const ProductCard = ({ selectedProductCard }) => {
  const { settlement_name, street, price } = selectedProductCard;
  return (
    <Flex
      justify="space-around"
      align="center"
    >
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }}
      />
      <div>
        <Title>{settlement_name}</Title>
        <Title level={2}>{street}</Title>
        <Title level={3}>{price} UAH</Title>
      </div>
    </Flex>
  );
};

ProductCard.propTypes = {
  selectedProductCard: PropTypes.any,
};

export default ProductCard;
