"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";

/**
 * CarouselActions
 *
 * Navigation controls for a carousel (previous / next buttons).
 *
 * @component
 * @param {Object} props
 * @param {() => void} props.onPrev - Callback fired when "previous" button is clicked
 * @param {() => void} props.onNext - Callback fired when "next" button is clicked
 * @param {number} props.slidesLen - No. of slides in Carousel
 * @param {boolean} [props.disablePrev=false] - Disable the previous button
 * @param {boolean} [props.disableNext=false] - Disable the next button
 *
 * @example
 * <CarouselActions
 *   onPrev={goPrev}
 *   onNext={goNext}
 *   disablePrev={!loop && currentIndex === 0}
 *   disableNext={!loop && currentIndex === slides.length - 1}
 * />
 */
function CarouselActions({
  onPrev,
  onNext,
  slidesLen,
  position,
  disablePrev = false,
  disableNext = false,
}) {
  return (
    <div className="slides__actions">
      <button
        className="btn__action btn__prev-slide"
        onClick={(e) => onPrev(slidesLen)}
        disabled={disablePrev}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </button>

      <button
        className="btn__action btn__next-slide"
        onClick={(e) => onNext(slidesLen)}
        disabled={disableNext}
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export default React.memo(CarouselActions);
