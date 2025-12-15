"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";

/**
 * CarouselExtActions
 *
 * Navigation buttons rendered **outside** of the carousel.
 * Controls a carousel via `carouselRef`.
 *
 * @component
 * @param {Object} props
 * @param {React.RefObject} props.carouselRef - Ref to the carousel component
 * @param {React.RefObject} props.parentRef - Ref to the parent of carousel, used for position check
 * @param {string} [props.className=""] - Additional class for the wrapper container
 * @param {string} [props.prevButtonClassName=""] - Additional class for previous button
 * @param {string} [props.nextButtonClassName=""] - Additional class for next button
 * @param {React.ReactNode} [props.prevButton=null] - Custom JSX to render for previous button
 * @param {React.ReactNode} [props.nextButton=null] - Custom JSX to render for next button
 *
 * @example
 * <ExternalButtons
 *   carouselRef={carouselRef}
 *   parentRef={carouselParentRef}
 *   className="flex justify-between w-full mt-4"
 *   prevButtonClassName="bg-blue-500 p-2 rounded-full"
 *   nextButtonClassName="bg-yellow-500 p-2 rounded-full"
 *   prevButton={<MyPrev />}
 *   nextButton={<MyNext />}
 * />
 */
export default function CarouselExtActions({
  carouselRef,
  className = "",
  prevButtonClassName = "",
  nextButtonClassName = "",
  prevButton = null,
  nextButton = null,
}) {
  if (!carouselRef?.current || carouselRef.current.btnPos !== 3) {
    console.warn("Button position should be outside outside");
    return null;
  }

  const currentSlide = carouselRef.current.getCurrent();
  const disablePrev = !loop && currentSlide === 0;
  const disableNext = !loop && currentSlide === slides.length - 1;

  return (
    <div className={`carousel__actions-external ${className}`}>
      <button
        className={`btn__action btn__prev-slide ${prevButtonClassName}`}
        onClick={() => carouselRef.current.prev()}
        aria-label="Previous slide"
        disabled={disablePrev}
      >
        {prevButton || <ChevronLeftIcon className="w-6 h-6" />}
      </button>

      <button
        className={`btn__action btn__next-slide ${nextButtonClassName}`}
        onClick={() => carouselRef.current.next()}
        aria-label="Next slide"
        disabled={disableNext}
      >
        {nextButton || <ChevronRightIcon className="w-6 h-6" />}
      </button>
    </div>
  );
}
