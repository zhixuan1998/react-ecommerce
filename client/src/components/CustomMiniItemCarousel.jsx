import './CustomMiniItemCarousel.scss';

import { useRef, useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';
import { noop } from '@/utils/is.js';

function CustomMiniItemCarousel({ items = [], labelField, onSelectItem = noop }) {
  const swiperRef = useRef(null);
  const [formattedItems, setFormattedItems] = useState([]);

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

  useEffect(() => {
    if (items.length === 0) setFormattedItems([]);

    let newItems = [];

    for (let i = 0; i < items.length; i += 2) {
      newItems.push(items.slice(i, i + 2));
    }

    setFormattedItems(newItems);
  }, [items]);

  function renderSwiperColumns() {
    return formattedItems.map((items, i) => (
      <swiper-slide class="swiper-slide" key={i}>
        {renderSlideRows(items)}
      </swiper-slide>
    ));
  }

  function renderSlideRows(items) {
    return items.map((item, i) => (
      <div className="w-100 item-container" key={i} onClick={() => onSelectItem(item)}>
        <div className="item-image">
          <img
            src={item.logoUrl}
            className="rounded-circle"
            onError={() => (this.src = 'https://picsum.photos/200')}
          />
        </div>
        {item[labelField] && <p className="item-label">{item[labelField]}</p>}
      </div>
    ));
  }

  return (
    <swiper-container class="swiper-container" init={false} ref={swiperRef}>
      {renderSwiperColumns()}
    </swiper-container>
  );
}

export default CustomMiniItemCarousel;
