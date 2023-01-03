import React, { useState } from 'react';
import { Button } from 'antd';
import ItemsCarousel from 'react-items-carousel';
function Carousel(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ height: '100%' }}>
      <ItemsCarousel
        style={{ height: '100%' }}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        infiniteLoop
        gutter={20}
        rightChevron={<Button shape='circle'>右边</Button>}
        leftChevron={<Button shape='circle'>左边</Button>}
        chevronWidth={chevronWidth}>
        <div style={{ height: '100%', background: '#fff' }}>First card</div>
        <div style={{ height: '100%', background: '#EEE' }}>Second card</div>
        <div style={{ height: '100%', background: '#EEE' }}>Third card</div>
        <div style={{ height: '100%', background: '#EEE' }}>Fourth card</div>
      </ItemsCarousel>
    </div>
  );
}

export default Carousel;
