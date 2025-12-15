"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Carousel.scss";
import CarouselSlide from "./CarouselSlide";
import CarouselDots from "./CarouselDots";
import CarouselActions from "./CarouselActions";

// slideProps --> height, classes, aspectRatio

function Carousel1({
  slideProps,
  children,
  loop = false,
  pagination = {},
  showPagination = false,
  slidesToShow = 1,
  duration = 300,
  autoPlay = false,
  interval = 2000,
}) {
  // States
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs
  const sliderContainerRef = useRef(null);
  const transitionRef = useRef(false);
  const carouselRef = useRef(null);

  // Local Vars
  const slides = getChildrenArray(children);

  // functions
  function getChildrenArray(children) {
    // If children is a fragment, use its props.children
    if (React.isValidElement(children) && children.type === React.Fragment) {
      return React.Children.toArray(children.props.children);
    }

    // Otherwise, just convert children to an array
    return React.Children.toArray(children);
  }

  const setTarnsitionRef = useCallback((ref, val) => {
    ref.current = val;
  }, []);

  const goToSlide = useCallback(
    (sldIndex) => {
      if (transitionRef.current) return;
      setTarnsitionRef(transitionRef, true);

      setCurrentSlide((prev) => {
        const next = sldIndex;
        return next;
      });
    },
    [loop]
  );
  const goToNextSlide = useCallback(
    (slidesLen) => {
      if (transitionRef.current) return;
      setTarnsitionRef(transitionRef, true);

      setCurrentSlide((prev) => {
        const next = prev + 1;
        if (loop) return next % slidesLen;
        return Math.min(next, slidesLen - 1);
      });
    },
    [loop, slides.length]
  );

  const goToPrevSlide = useCallback(
    (slidesLen) => {
      if (transitionRef.current) return;
      setTarnsitionRef(transitionRef, true);

      setCurrentSlide((prev) => {
        const prevSlide = prev - 1;
        if (loop) return (prevSlide + slidesLen) % slidesLen;
        return Math.max(prevSlide, 0);
      });

      transitionRef.current = false;
    },
    [loop, slides.length]
  );

  // UseEffects

  useEffect(() => {
    // Runtime check: exactly one of height / aspectRatio / aspectClass must be provided
    const { height, aspectRatio, aspectClass } = slideProps;
    const providedSlideProps = [height, aspectRatio, aspectClass].filter(
      Boolean
    );
    if (providedSlideProps.length !== 1) {
      throw new Error(
        "CarouselSlide: You must provide exactly ONE of `height`, `aspectRatio`, or `aspectClass` in slideProps."
      );
    }
  }, [slideProps]);

  useEffect(() => {
    if (!sliderContainerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(sliderContainerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const autoInterval = setInterval(() => {
      goToNextSlide(slides.length);
    }, interval);

    return () => clearInterval(autoInterval);
  }, [autoPlay, interval, slides.length]);

  // for change in slides number
  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  return (
    <div className="carousel__container" ref={carouselRef}>
      <div ref={sliderContainerRef} className={`slides__container`}>
        <div
          className={`slides__wrapper`}
          style={{
            transform: `translate3d(-${currentSlide * containerWidth}px, 0, 0)`,
            transitionDuration: duration,
          }}
          onTransitionEnd={() => setTarnsitionRef(transitionRef, false)}
        >
          {slides.map((slide, index) => {
            return (
              <CarouselSlide
                key={index}
                slideProps={slideProps}
                containerWidth={containerWidth}
              >
                {slide}
              </CarouselSlide>
            );
          })}
        </div>
      </div>

      {/* Carousel Action Buttons */}
      <CarouselActions
        onNext={goToNextSlide}
        onPrev={goToPrevSlide}
        slidesLen={slides.length}
        disablePrev={!loop && currentSlide === 0}
        disableNext={!loop && currentSlide === slides.length - 1}
      />

      {/* SHOW DOTS */}
      {showPagination && slides.length > 1 && (
        <CarouselDots
          slidesLen={slides.length}
          goToSlide={goToSlide}
          currentSlide={currentSlide}
        />
      )}
    </div>
  );
}

export default Carousel1;

{
  /* <div className="slides__actions">
        <button
          className="btn__action btn__prev-slide"
          onClick={(e) => goToPrevSlide(slides.length)}
          disabled={!loop && currentSlide === 0}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className="btn__action btn__next-slide"
          onClick={(e) => goToNextSlide(slides.length)}
          disabled={!loop && currentSlide === slides.length - 1}
        >
          <ChevronRightIcon />
        </button>
      </div> */
}
