import React, { useState } from 'react';
import Styles from './index.module.scss';
import type { RadioChangeEvent } from 'antd';
import { Carousel } from 'antd';
import type { DotPosition } from 'antd/es/carousel';

const Carousels: React.FC = () => {
  const [dotPosition, setDotPosition] = useState<DotPosition>('top');

  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPosition(value);
  };

  return (
    <>
      <Carousel dotPosition={'bottom'} autoplay={true}>
        <div>
          <h3 className={Styles.contentStyle}>1</h3>
        </div>
        <div>
          <h3 className={Styles.contentStyle}>2</h3>
        </div>
        <div>
          <h3 className={Styles.contentStyle}>3</h3>
        </div>
        <div>
          <h3 className={Styles.contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default Carousels;
