import './CustomListingSection.scss';

import { useRef, useEffect } from 'react';

function CustomListingSection({ children, minItemWidthInPx = 20, gapWidthInPx = 10 }) {
  const sectionEl = useRef(null);
  let resizeObserver = null;

  useEffect(() => {
    sectionEl.current.style.setProperty('--min-item-width', `${minItemWidthInPx}px`);
    sectionEl.current.style.setProperty('--gap-width', `${gapWidthInPx}px`);

    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: sectionWidth } = entry.contentRect;
        let columnCount = Math.floor(sectionWidth / minItemWidthInPx);
        let totalGapWidth = gapWidthInPx * (columnCount - 1);
        const getItemWidth = () => (sectionWidth - totalGapWidth) / columnCount;
        if (getItemWidth() < minItemWidthInPx) {
          columnCount -= 1;
          totalGapWidth -= gapWidthInPx;
        }
        sectionEl.current.style.setProperty('--item-width', `${getItemWidth()}px`);
      }
    });

    resizeObserver.observe(sectionEl.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="listing-section" ref={sectionEl}>
      {children}
    </div>
  );
}

export default CustomListingSection;
