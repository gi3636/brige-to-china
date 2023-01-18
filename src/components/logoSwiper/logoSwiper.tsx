import React, {useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Styles from './index.module.scss';
import { Navigation } from "swiper";
import Image from "next/image";


document.documentElement.style.setProperty("--swiper-theme-color", "black")
document.documentElement.style.setProperty("--swiper-navigation-size", "15px")

const LogoSwiper: React.FunctionComponent = () => {

    const photos =['x.jpg','y.jpg','c.jpg']

return (
        <div className={Styles.container}>
            <Image priority src='/images/question.svg' width={48} height={36} alt='' style={{ paddingRight: 10 }} />
            <div className={Styles.tittle}>中国大学介绍</div>
            <Swiper
                slidesPerView={4}
                slidesPerGroup={1}
                loop={true}
                speed={400}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className={Styles.myswiper}
            >

                {photos.map((photo,i) =>
                <SwiperSlide className={Styles.swiperslide}>
                    <img src={`/images/${photo.toString()}`} alt=""/>
                </SwiperSlide>
                )}

            </Swiper>
            <div className={Styles.button}>查看更多</div>
        </div>
    );
};

export default LogoSwiper;