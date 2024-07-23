import './CustomMiniItemCarousel.scss';

import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { noop } from '@/utils/is.js';

function CustomMiniItemCarousel({ items = [], labelField, onSelectItem = noop }) {
  const swiperRef = useRef(null);
  const formattedItems = useRef(() => {
    if (items.length === 0) return [];

    let newItems = [];

    for (let i = 0; i < items.length; i += 2) {
      newItems.push(items.slice(i, i + 2));
    }

    return newItems;
  });

  useEffect(() => {
    register();

    const config = {
      slidePerView: 4,
      slidesPerGroup: 2,
      breakpointsBase: 'container',
      breakpoints: {
        768: {
          slidesPerView: 10
        },
        576: {
          slidesPerView: 8
        },
        400: {
          slidesPerView: 6
        }
      }
    };

    Object.assign(swiperRef.current, config);
    swiperRef.current.initialize();
  }, []);

  function renderSwiperSlides() {
    return formattedItems.current.map((columnItems, i) => (
      <swiper-slide className="swiper-slide" key={i}>
        {columnItems.map((item, j) => {
          <div class="w-100 item-container" key={j} onClick={() => onSelectItem(item)}>
            <div className="item-image">
              <img
                src={item.logoUrl}
                className="rounded-circle"
                onerror="this.src='https://picsum.photos/200'"
              />
            </div>
            {item[labelField] && <p className="item-label">{item[labelField]}</p>}
          </div>;
        })}
      </swiper-slide>
    ));
  }
  return (
    <swiper-container init={false} ref={swiperRef}>
      {renderSwiperSlides()}
    </swiper-container>
  );
}

export default CustomMiniItemCarousel;
