import React, { useState } from 'react';
import styles from './index.module.scss';
import { HandIcon } from '@/components/icons/HandIcon';
import { Button, Form, Image, Input, message, Radio, Select, SelectProps } from 'antd';
import { ImageOutlineIcon } from '@/components/icons/ImageOutlineIcon';
import { colors } from '@/styles/colors';
import ImageItem from '@/page-components/question/image-item/ImageItem';
import useRequest from '@/hooks/useRequest';
import { postQuestion } from '@/api/question';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
function PostQuestion(props) {
  const [value, setValue] = useState(false);
  const { run, loading } = useRequest();
  const [form] = Form.useForm();

  const handlePostQuestion = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      let res = await run(postQuestion(values));
      console.log('res', res);
      if (res.code == 200) {
        message.success('提问成功');
        form.resetFields();
      }
    });
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const [images, setImages] = useState([
    // {
    //   id: 1,
    //   src: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
    // },
    // {
    //   id: 2,
    //   src: 'https://img95.699pic.com/photo/50136/1351.jpg_wh300.jpg',
    // },
    // {
    //   id: 3,
    //   src: 'https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg',
    // },
    // {
    //   id: 3,
    //   src: 'http://static.runoob.com/images/demo/demo3.jpg',
    // },
  ]);

  const handleCloseImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };
  const renderImagesList = () => {
    return images.map((item: any, index) => {
      return (
        <ImageItem onClose={handleCloseImage.bind(null, index)} key={index} src={item?.src} height={65} width={90} />
      );
    });
  };

  return (
    <div className={styles.postQuestion}>
      <div className={styles.postQuestionHeader}>
        <div className={styles.title}>
          <HandIcon width={20} height={20} />
          <span style={{ marginLeft: 3 }}>我要提问</span>
        </div>
        <div className={styles.anonymous}>
          <Radio
            onClick={() => {
              setValue(!value);
            }}
            checked={value}>
            匿名
          </Radio>
        </div>
      </div>
      <div className={styles.postQuestionBody}>
        <Form form={form}>
          <Form.Item name='title' rules={[{ required: true, message: '请输入标题' }]}>
            <Input className={styles.titleInput} placeholder='请输入标题' />
          </Form.Item>
          <Form.Item name='content' rules={[{ required: true, message: '请输入问题' }]}>
            <Input.TextArea className={styles.contentInput} rows={8} placeholder='请输入问题' />
          </Form.Item>
          <Form.Item name='tags' required rules={[{ required: true, message: '请选择标签', type: 'array' }]}>
            <Select
              placeholder={'添加标签'}
              mode='tags'
              style={{ width: '100%' }}
              onChange={handleChange}
              tokenSeparators={[',']}
              options={options}
            />
          </Form.Item>
        </Form>
        {images.length > 0 ? (
          <div className={styles.imageList}>
            <Image.PreviewGroup>{renderImagesList()}</Image.PreviewGroup>
          </div>
        ) : null}
        <div className={styles.actionContainer}>
          <div className={styles.uploadBtn}>
            <ImageOutlineIcon width={22} height={22} color={colors.iconDefaultColor} />
          </div>
        </div>
      </div>
      <Button type='primary' className={styles.postBtn} loading={loading} onClick={handlePostQuestion}>
        发布问题
      </Button>
    </div>
  );
}

export default PostQuestion;
