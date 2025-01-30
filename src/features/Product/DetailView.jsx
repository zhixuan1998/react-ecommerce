import 'swiper/css';
import './product.scss';

import repositories from '@/../repositories';
import { useLoaderData } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Base from '../components/Base';

async function loader({ params }) {
  const { productId } = params;

  const $repositories = repositories();
  const { data, error } = await $repositories.productRepository.get({ productId });

  if (error) {
    throw new Response();
  }

  return { product: data };
}

function getImageZoomerEvent(imageContRef, imageEl) {
  const zoom_step = 0.2;
  const min_zoom_scale = 1;
  const max_zoom_scale = 4;

  let isZoomed;
  let zoom_scale;
  init();

  function zoom_by_click(e) {
    zoom_scale = isZoomed ? min_zoom_scale : 2;
    setIsZoomed(!isZoomed);
    move_image(e, true);
  }

  function zoom_by_wheel(e) {
    const zoom_increase = e.deltaY < 0 ? zoom_step : zoom_step * -1;

    let new_zoom_scale = zoom_scale + zoom_increase;

    if (new_zoom_scale <= min_zoom_scale) {
      setIsZoomed(false);
      zoom_scale = min_zoom_scale;
    } else if (new_zoom_scale > max_zoom_scale) {
      zoom_scale = max_zoom_scale;
    } else {
      zoom_scale = new_zoom_scale;
    }

    if (new_zoom_scale >= 2) {
      setIsZoomed(true);
    }

    move_image(e);
  }

  function setIsZoomed(value) {
    isZoomed = value;
    imageContRef.current.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
  }

  function move_image(e, transition = false) {
    if (zoom_scale === min_zoom_scale) {
      return handle_image_transform('', transition);
    }

    const slide_dimension = imageContRef.current.getBoundingClientRect();

    const x = e.pageX - Math.floor(slide_dimension.left);
    const y = e.pageY - Math.floor(slide_dimension.top);

    const move_x = x * (zoom_scale - min_zoom_scale);
    const move_y = y * (zoom_scale - min_zoom_scale);

    const translate3d = `-${move_x}px, -${move_y}px, 0px`;
    const transform = `translate3d(${translate3d}) scale(${zoom_scale})`;
    handle_image_transform(transform, transition);
  }

  function handle_image_transform(transform = '', transition = false) {
    if (transition === false) {
      return (imageEl.current.style.transform = transform);
    }

    imageEl.current.classList.add('transition');
    imageEl.current.style.transform = transform;
    setTimeout(() => imageEl.current.classList.remove('transition'), 200);
  }

  function init() {
    isZoomed = false;
    zoom_scale = min_zoom_scale;
    imageContRef.current.style.cursor = 'zoom-in';
  }

  return { reset: init, onClick: zoom_by_click, onWheel: zoom_by_wheel, onMouseMove: move_image };
}

const subSlidePerView = 4;

function ShoppingSection({ product }) {
  const price = `RM ${product.unitPrice}`;
  const slidesOutOfOneView = product.images.length > subSlidePerView;

  const imageEl = useRef(null);
  const zoomerEvent = useRef(null);
  const imageContRef = useRef(null);
  const subSwiperRef = useRef(null);
  const mainSwiperRef = useRef(null);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    mainSwiperRef.current.swiper.slideTo(imageIndex, 0, false);

    const indexOutOfRightSlide =
      imageIndex - subSwiperRef.current.swiper.activeIndex >= subSlidePerView;
    const indexOutOfLeftSlide = imageIndex < subSwiperRef.current.swiper.activeIndex;

    if (indexOutOfRightSlide) {
      subSwiperRef.current.swiper.slideTo(imageIndex - 3);
    } else if (indexOutOfLeftSlide) {
      subSwiperRef.current.swiper.slideTo(imageIndex);
    }

    if (imageEl.current) {
      imageEl.current.style.transform = '';
    }

    if (zoomerEvent.current?.reset) {
      zoomerEvent.current.reset();
    }

    imageEl.current = imageContRef.current.querySelector(
      `.swiper-slide:nth-of-type(${imageIndex + 1}) img`
    );
  }, [imageIndex]);

  useEffect(() => {
    zoomerEvent.current = getImageZoomerEvent(imageContRef, imageEl);
  }, []);

  return (
    <div className="shopping-section">
      <div className="image-wrapper">
        <div
          className="main-image"
          onClick={(e) => zoomerEvent.current.onClick(e)}
          onWheel={(e) => zoomerEvent.current.onWheel(e)}
          onMouseMove={(e) => zoomerEvent.current.onMouseMove(e)}
          ref={imageContRef}
        >
          <Swiper
            onSwiper={(swiper) => (swiper.allowSlidePrev = swiper.allowSlideNext = false)}
            ref={mainSwiperRef}
          >
            {product.images.map((image) => (
              <SwiperSlide key={image.imageId}>
                <img src={image.largeImageUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="sub-swiper-wrapper">
          <Swiper
            className="sub-swiper"
            slidesPerView={subSlidePerView}
            spaceBetween={5}
            ref={subSwiperRef}
          >
            {product.images.map((image, i) => (
              <SwiperSlide key={image.imageId} onClick={() => setImageIndex(i)}>
                <div
                  className={`image${i === imageIndex ? ' box-shadow-border h-auto' : ''}`}
                  style={{ backgroundImage: `url(${image.smallImageUrl})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {slidesOutOfOneView && (
            <>
              <div
                className={`icon angle-left${imageIndex === 0 ? ' disabled' : ''}`}
                onClick={() => setImageIndex(imageIndex - 1)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <div
                className={`icon angle-right${
                  imageIndex === product.images.length - 1 ? ' disabled' : ''
                }`}
                onClick={() => setImageIndex(imageIndex + 1)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="detail">
        <div className="statistic">
          <div className="statistic-item"></div>
          <div className="statistic-item"></div>
          <div className="statistic-item"></div>
        </div>
        <div className="price">{price}</div>
        <div className="decision">
          <div>
            <h3>Quantity</h3>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandSection({ product }) {
  return (
    <div className="brand-section">
      <div></div>
      <div></div>
    </div>
  );
}

function DescriptionSection({ product }) {
  return (
    <div className="description-section">
      <div className="title"></div>
      <div className="description"></div>
    </div>
  );
}

function RatingSection() {
  return <div className="rating-section"></div>;
}

function Component() {
  const { product } = useLoaderData();

  return (
    <Base header={{ searchBox: true }}>
      <ShoppingSection product={product} />
      <BrandSection product={product} />
      <DescriptionSection product={product} />
      <RatingSection />
    </Base>
  );
}

export { Component, loader };
