import React from 'react';
import { IField } from '@/components/pro-form';
import { Input, Radio } from 'antd';

export const fields: IField[] = [
  {
    type: 'Input',
    col: 4,
    name: 'nickname',
    label: '昵称',
    component: <Input />,
  },
  {
    type: 'RadioGroup',
    col: 4,
    name: 'sex',
    label: '性别',
    component: (
      <Radio.Group>
        <Radio value={0}>保密</Radio>
        <Radio value={1}>男</Radio>
        <Radio value={2}>女</Radio>
      </Radio.Group>
    ),
  },
  {
    type: 'InputTextArea',
    col: 4,
    name: 'description',
    label: '简介',
    component: <Input.TextArea placeholder='placeholder' rows={4} />,
  },
];

export default fields;
