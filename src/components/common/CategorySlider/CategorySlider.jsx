import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './CategorySlider.css';

function CategorySlider({ categories }) {
  const { t } = useTranslation();
  
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="category-slider">
      <div className="container">
        <div className="category-slider__header">
          <h2 className="category-slider__title">{t('home.categories')}</h2>
          <p className="category-slider__description">{t('home.browseAllCategories')}</p>
        </div>

        <Swiper
          loop={categories.length > 6}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="category-slider__swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.slug || category}>
              <Link
                to={`/category/${category.slug || category}`}
                className="category-slider__card"
              >
                <div className="category-slider__icon">
                  <span>{category.name?.[0] || category[0] || '📦'}</span>
                </div>
                <h3 className="category-slider__name">
                  {category.name || category}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default CategorySlider;

