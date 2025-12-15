"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";

/**
 * CarouselActions
 *
 * Navigation controls for a carousel (previous / next buttons) rendered **inside** the carousel.
 *
 * @component
 * @param {Object} props
 * @param {() => void} props.onPrev - Callback fired when "previous" button is clicked
 * @param {() => void} props.onNext - Callback fired when "next" button is clicked
 * @param {number} props.slidesLen - Total number of slides
 * @param {boolean} [props.disablePrev=false] - Whether the previous button should be disabled
 * @param {boolean} [props.disableNext=false] - Whether the next button should be disabled
 * @param {string} [props.className=""] - Additional class for the wrapper container
 * @param {string} [props.prevButtonClassName=""] - Additional class for previous button
 * @param {string} [props.nextButtonClassName=""] - Additional class for next button
 * @param {React.ReactNode} [props.prevButton=null] - Custom JSX to render for previous button
 * @param {React.ReactNode} [props.nextButton=null] - Custom JSX to render for next button
 *
 * @example
 * <CarouselActions
 *   onPrev={goPrev}
 *   onNext={goNext}
 *   disablePrev={!loop && currentSlide === 0}
 *   disableNext={!loop && currentSlide === slides.length - 1}
 *   className="absolute top-1/2 w-full flex justify-between px-4"
 *   prevButtonClassName="bg-red-500 p-2 rounded-full"
 *   nextButtonClassName="bg-green-500 p-2 rounded-full"
 *   prevButton={<MyCustomPrev />}
 *   nextButton={<MyCustomNext />}
 * />
 */
function CarouselActions({
  onPrev,
  onNext,
  slidesLen,
  disablePrev = false,
  disableNext = false,
  className = "",
  prevButtonClassName = "",
  nextButtonClassName = "",
  prevButton = null,
  nextButton = null,
}) {
  return (
    <div className={`slides__actions ${className}`}>
      <button
        className={`btn__action btn__prev-slide ${prevButtonClassName}`}
        onClick={() => onPrev(slidesLen)}
        disabled={disablePrev}
        aria-label="Previous slide"
      >
        {prevButton || <ChevronLeftIcon />}
      </button>

      <button
        className={`btn__action btn__next-slide ${nextButtonClassName}`}
        onClick={() => onNext(slidesLen)}
        disabled={disableNext}
        aria-label="Next slide"
      >
        {nextButton || <ChevronRightIcon />}
      </button>
    </div>
  );
}

export default React.memo(CarouselActions);
