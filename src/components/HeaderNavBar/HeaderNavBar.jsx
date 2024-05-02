import { Button, Modal, Form, Input, Select, Checkbox, Row, Col } from 'antd';
import { useState } from 'react';

const regions = [
  'Черкаська',
  'Чернігівська',
  'Чернівецька',
  'Крим',
  'Дніпропетровська',
  'Донецька',
  'Івано-Франківська',
  'Харківська',
  'Херсонська',
  'Житомирська',
  'Запорізька',
  'Закарпатська',
  'Волинська',
  'Вінницька',
  'Тернопільська',
  'Сумська',
  'Севастопіль',
  'Рівненська',
  'Полтавська',
  'Одеська',
  'Миколаївська',
  'Львівська',
  'Луганська',
  'Кіровоградська',
  'Київська',
  'Київ',
  'Хмельницька',
];

const appartamentType = ['квартира', 'офіс', 'склад', 'гараж', 'будинок'];

const HeaderNavBar = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [isRentPerDay, setIsRentPerDay] = useState(false);
  const [price, setPrice] = useState('');

  console.log(price);

  const onFinish = () => {
    const formData = {
      region,
      city,
      street,
      houseNumber,
      propertyType,
      isRentPerDay,
      price,
    };

    console.log('Дані форми:', formData);
    setIsFormModalOpen(false);
  };

  const showModal = () => {
    setIsFormModalOpen(true);
  };
  const handleCancel = () => {
    setIsFormModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        size="large"
      >
        Додати нове оголошення
      </Button>
      <Modal
        title="Додайте Ваше оголошення"
        open={isFormModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="виберіть область">
            <Select onChange={(e) => setRegion(e)}>
              {regions.map((reg, i) => (
                <Select.Option
                  key={i}
                  value={reg}
                >
                  {reg}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Row>
            <Col span={8}>
              <Form.Item label="Місто">
                <Input
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Впишіть назву міста"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Вулиця">
                <Input
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Впишіть назву вулиці"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Номер будинку">
                <Input
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="Впишіть номер будинку"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="виберіть тип приміщення">
                <Select onChange={(e) => setPropertyType(e)}>
                  {appartamentType.map((type, i) => (
                    <Select.Option
                      key={i}
                      value={type}
                    >
                      {type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Checkbox onChange={(e) => setIsRentPerDay(e.target.checked)}>
                  Подобово
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ціна">
                <Input
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Вкажіть ціну"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

HeaderNavBar.propTypes = {};

export default HeaderNavBar;
