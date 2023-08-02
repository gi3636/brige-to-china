import React, { useState } from 'react';
import styles from './index.module.scss';
import { HandIcon } from '@/components/icons/HandIcon';
import { Button, Form, Image, Input, message, Popover, Radio, Select, SelectProps, Space } from 'antd';
import { ImageOutlineIcon } from '@/components/icons/ImageOutlineIcon';
import { colors } from '@/styles/colors';
import ImageItem from '@/page-components/question/image-item/ImageItem';
import useRequest from '@/hooks/useRequest';
import { generateTag, generateTitle, getTagList, postQuestion } from '@/api/question';
import { QuestionCircleOutlined } from '@ant-design/icons';

function PostQuestion(props) {
  const [value, setValue] = useState(false);
  const { run, loading } = useRequest();
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const { run: runSelect, loading: selectLoading } = useRequest();
  const { run: runGenTitle, loading: genTitleLoading } = useRequest();
  const { run: runGenTags, loading: genTagLoading } = useRequest();
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
  const handleChange = (value) => {
    setSelectValue(value);
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
  const loadOptions = async (value) => {
    console.log(value);
    let res = await runSelect(getTagList({ keyword: value, currentPage: 1, pageSize: 10 }));
    console.log(res);
    if (res.code == 200) {
      let list = res.data.list.map((item) => {
        return {
          label: `${item.name}   (${item.count})`,
          value: item.name,
        };
      });
      setOptions(list || []);
    }
  };

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

  const handleGenerateTags = async () => {
    let content = form.getFieldValue('content');
    if (!content) {
      message.error('请输入问题内容');
      return;
    }
    if (content.length < 10) {
      message.error('问题内容不能少于10个字');
      return;
    }

    let res = await runGenTags(generateTag({ keyword: content, currentPage: 1, pageSize: 10 }));
    if (res.code == 200) {
      let obj = JSON.parse(res.data);
      let text = obj?.choices[0]?.text;
      let index = text.lastIndexOf('\n');
      let tagText = text.slice(index + 1, text.length);
      let tagList = tagText.split(',');
      form.setFieldValue('tags', tagList);
    }
  };
  const handleGenerateTitle = async () => {
    let content = form.getFieldValue('content');
    if (!content) {
      message.error('请输入问题内容');
      return;
    }
    if (content.length < 10) {
      message.error('问题内容不能少于10个字');
      return;
    }

    let res = await runGenTitle(generateTitle({ keyword: content, currentPage: 1, pageSize: 10 }));
    if (res.code == 200) {
      let obj = JSON.parse(res.data);
      let text = obj?.choices[0]?.text;
      let start = text.indexOf('#');
      let end = text.lastIndexOf('#');
      let title = text.slice(start + 1, end);
      form.setFieldValue('title', title);
    }

    console.log('handleGenerateTags');
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
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Form.Item name='title' rules={[{ required: true, message: '请输入标题' }]} noStyle>
                <Input className={styles.titleInput} placeholder='请输入标题' />
              </Form.Item>
              {/*<Popover placement='top' content={'自动生成问题标题'} trigger='hover'>*/}
              {/*  <Button*/}
              {/*    loading={genTitleLoading}*/}
              {/*    icon={<QuestionCircleOutlined />}*/}
              {/*    onClick={handleGenerateTitle}*/}
              {/*    style={{ marginTop: 8, marginLeft: 10 }}>*/}
              {/*    生成*/}
              {/*  </Button>*/}
              {/*</Popover>*/}
            </div>
          </Form.Item>
          <Form.Item name='content' rules={[{ required: true, message: '请输入问题' }]}>
            <Input.TextArea className={styles.contentInput} rows={8} placeholder='请输入问题' />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Form.Item
                name='tags'
                required
                rules={[{ required: true, message: '请选择标签', type: 'array' }]}
                noStyle>
                <Select
                  onSearch={(value) => {
                    loadOptions(value);
                  }}
                  loading={selectLoading}
                  placeholder={'添加标签'}
                  mode='tags'
                  // onChange={handleChange}
                  tokenSeparators={[',']}
                  options={options}
                  onFocus={() => {
                    loadOptions('');
                  }}
                />
              </Form.Item>
              {/*<Popover placement='top' content={'自动生成标签'} trigger='hover'>*/}
              {/*  <Button*/}
              {/*    loading={genTagLoading}*/}
              {/*    icon={<QuestionCircleOutlined />}*/}
              {/*    onClick={handleGenerateTags}*/}
              {/*    style={{ marginLeft: 10 }}>*/}
              {/*    生成*/}
              {/*  </Button>*/}
              {/*</Popover>*/}
            </div>
          </Form.Item>
        </Form>
        {images.length > 0 ? (
          <div className={styles.imageList}>
            <Image.PreviewGroup>{renderImagesList()}</Image.PreviewGroup>
          </div>
        ) : null}
        {/*<div className={styles.actionContainer}>*/}
        {/*  <div className={styles.uploadBtn}>*/}
        {/*    <ImageOutlineIcon width={22} height={22} color={colors.iconDefaultColor} />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <Button type='primary' className={styles.postBtn} loading={loading} onClick={handlePostQuestion}>
        发布问题
      </Button>
    </div>
  );
}

export default PostQuestion;
