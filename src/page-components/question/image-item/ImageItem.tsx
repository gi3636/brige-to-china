import React, { useState } from 'react';
import { Button, Image } from 'antd';
import { CloseCircleFilled, CloseCircleOutlined, EyeFilled } from '@ant-design/icons';
import styles from './index.module.scss';
import { colors } from '@/styles/colors';
import { EyeOutlineIcon } from '@/components/icons/EyeOutlineIcon';
interface ImageItemProps {
  src: string;
  width?: number | string;
  height?: number | string;
  onClose?: () => void;
}
function ImageItem({ src, width = '100%', height = '100%', onClose }: ImageItemProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.imageItem}>
      <CloseCircleOutlined className={styles.closeBtn} onClick={onClose} />
      <Image
        src={src}
        alt=''
        width={width}
        height={height}
        preview={{
          visible,
          src: src,
          onVisibleChange: (value) => {
            setVisible(value);
          },
          mask: (
            <div>
              <EyeOutlineIcon width={20} height={20} color={'#fff'} />
            </div>
          ),
        }}
      />
    </div>
  );
}

export default ImageItem;
