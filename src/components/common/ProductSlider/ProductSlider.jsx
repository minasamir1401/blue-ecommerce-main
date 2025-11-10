import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard/ProductCard';
import './ProductSlider.css';

function ProductSlider({ data, title, description }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="product-slider">
      <div className="container">
        <div className="product-slider__header">
          <h2 className="product-slider__title">{title}</h2>
          {description && (
            <p className="product-slider__description">{description}</p>
          )}
        </div>

        <Swiper
          loop={data.length > 4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="product-slider__swiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ProductSlider;

