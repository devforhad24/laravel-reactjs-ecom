import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import SwiperCore from 'swiper';

import 'swiper/css';
import SliderOneImg from '../../assets/images/banner-1.jpg'
import SliderTwoImg from '../../assets/images/banner-2.jpg'
import SliderThreeImg from '../../assets/images/woman-shopping.jpg'

const Hero = () => {
    // install the module
SwiperCore.use([Autoplay]);
    return (
<section className="section-1">
  <Swiper
    modules={[Autoplay]}
    slidesPerView={1}
    spaceBetween={0}
    loop={true}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
    }}
  >
    <SwiperSlide>
      <div
        className="content"
        style={{ backgroundImage: `url(${SliderThreeImg})` }}
      />
    </SwiperSlide>

    <SwiperSlide>
      <div
        className="content"
        style={{ backgroundImage: `url(${SliderTwoImg})` }}
      />
    </SwiperSlide>
        <SwiperSlide>
      <div
        className="content"
        style={{ backgroundImage: `url(${SliderOneImg})` }}
      />
    </SwiperSlide>
  </Swiper>
</section>


    )
}

export default Hero
