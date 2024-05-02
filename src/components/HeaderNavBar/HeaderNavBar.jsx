import { Button, Modal, Form, Input } from 'antd';
// import PropTypes from 'prop-types';
import { useState } from 'react';

const HeaderNavBar = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [form] = Form.useForm();

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
        title="Form Modal"
        open={isFormModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          form={form}

          // style={{
          //   maxWidth: formLayout === 'inline' ? 'none' : 600,
          // }}
        >
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

HeaderNavBar.propTypes = {};

export default HeaderNavBar;
