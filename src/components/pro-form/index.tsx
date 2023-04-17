import React, { useMemo, useState } from 'react';
import { Form, FormItemProps, theme } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { ComponentType } from '@/types';
type ReactComponent = (value?: any) => React.ReactElement;
export interface IField extends FormItemProps {
  col: number; // 一行中占几列, 一行最多24列, 一般为8的倍数
  name: string;
  component: React.ReactElement | ReactComponent;
  type: ComponentType;
  colStyle?: React.CSSProperties;
  showComponent?: (values) => boolean;
}
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

interface IProps {
  fields: IField[];
  onFinish?: (values: any) => void;
  handleReset?: () => void;
  loading?: boolean;
  formItemLayout?: typeof defaultFormItemLayout;
  form?: FormInstance;
}
function ProForm({ form, fields, onFinish, loading, handleReset, formItemLayout }: IProps) {
  const [values, setValues] = useState({});
  const { token } = theme.useToken();
  const formStyle = {
    padding: '10px 0',
    maxWidth: 'none',
    borderRadius: token.borderRadiusLG,
  };

  /**
   * 获取表单字段
   */
  const getFields = useMemo(() => {
    return fields.map((item) => {
      let newItem = { ...item };
      if (newItem.showComponent && !newItem.showComponent(values)) {
        return null;
      }
      if (typeof newItem.component === 'function') {
        newItem.component = newItem.component(values);
      }
      if (newItem.type === 'Select') {
        newItem.component = React.cloneElement(newItem.component, {
          placeholder: `请选择${newItem.label}`,
        });
      } else {
        newItem.component = React.cloneElement(newItem.component, {
          placeholder: `请输入${newItem.label}`,
        });
      }
      delete newItem.showComponent;
      return (
        <Form.Item {...newItem} key={newItem.name}>
          {newItem.component}
        </Form.Item>
      );
    });
  }, [fields, values]);

  return (
    <Form
      form={form}
      name='form'
      onValuesChange={() => {
        let fieldsValues = form?.getFieldsValue();
        setValues({ ...values, ...fieldsValues });
      }}
      style={formStyle}
      onFinish={onFinish}
      {...(formItemLayout || defaultFormItemLayout)}
      scrollToFirstError>
      {getFields}
    </Form>
  );
}

export default ProForm;
