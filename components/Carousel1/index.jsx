"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./Carousel.scss";
import CarouselSlide from "./CarouselSlide";
import CarouselDots from "./CarouselDots";
import CarouselActions from "./CarouselActions";

// slideProps --> height, classes, aspectRatio

const Carousel1 = forwardRef(function Carousel1(
  {
    slideProps,
    children,
    loop = false,
    pagination = {},
    showPagination = false,
    slidesToShow = 1,
    duration = 300,
    autoPlay = false,
    interval = 2000,
    buttonPosition = 1, // 1 --> overlay(default), 2 --> inside, 3 --> outside
  },
  ref
) {
  // States
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs
  const sliderContainerRef = useRef(null);
  const transitionRef = useRef(false);
  // const carouselRef = useRef(null);

  // Local Vars
  const slides = getChildrenArray(children);
  const showButtons = buttonPosition === 1 || buttonPosition === 2;

  function getChildrenArray(children) {
    if (React.isValidElement(children) && children.type === React.Fragment) {
      return React.Children.toArray(children.props.children);
    }
    return React.Children.toArray(children);
  }

  const setTransitionRef = useCallback((ref, val) => {
    ref.current = val;
  }, []);

  // Core Functions
  const goToSlide = useCallback((sldIndex) => {
    if (transitionRef.current) return;
    setTransitionRef(transitionRef, true);
    setCurrentSlide(sldIndex);
  }, []);

  const goToNextSlide = useCallback(() => {
    if (transitionRef.current) return;
    setTransitionRef(transitionRef, true);
    setCurrentSlide((prev) =>
      loop ? (prev + 1) % slides.length : Math.min(prev + 1, slides.length - 1)
    );
  }, [loop, slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (transitionRef.current) return;
    setTransitionRef(transitionRef, true);
    setCurrentSlide((prev) =>
      loop ? (prev - 1 + slides.length) % slides.length : Math.max(prev - 1, 0)
    );
  }, [loop, slides.length]);

  // Expose imperative methods to parent/external components
  useImperativeHandle(
    ref,
    () => ({
      next: goToNextSlide,
      prev: goToPrevSlide,
      goTo: goToSlide,
      getCurrent: () => currentSlide,
      loop: loop,
      slidesLen: slides.length,
    }),
    [goToNextSlide, goToPrevSlide, goToSlide, currentSlide, loop, slides.length]
  );

  // Resize observer
  useEffect(() => {
    if (!sliderContainerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(sliderContainerRef.current);

    return () => observer.disconnect();
  }, []);

  // AutoPlay
  useEffect(() => {
    if (!autoPlay) return;

    const autoInterval = setInterval(() => {
      goToNextSlide();
    }, interval);

    return () => clearInterval(autoInterval);
  }, [autoPlay, interval, goToNextSlide]);

  // Reset on number of slides change
  useEffect(() => setCurrentSlide(0), [slides.length]);

  return (
    <div className="carousel__container">
      <div ref={sliderContainerRef} className="slides__container">
        <div
          className="slides__wrapper"
          style={{
            transform: `translate3d(-${currentSlide * containerWidth}px, 0, 0)`,
            transitionDuration: `${duration}ms`,
          }}
          onTransitionEnd={() => setTransitionRef(transitionRef, false)}
        >
          {slides.map((slide, index) => (
            <CarouselSlide
              key={index}
              slideProps={slideProps}
              containerWidth={containerWidth}
            >
              {slide}
            </CarouselSlide>
          ))}
        </div>
      </div>

      {/* Internal Action Buttons */}

      {showButtons && (
        <CarouselActions
          onNext={goToNextSlide}
          onPrev={goToPrevSlide}
          disablePrev={!loop && currentSlide === 0}
          disableNext={!loop && currentSlide === slides.length - 1}
        />
      )}

      {/* Dots */}
      {showPagination && slides.length > 1 && (
        <CarouselDots
          slidesLen={slides.length}
          goToSlide={goToSlide}
          currentSlide={currentSlide}
        />
      )}
    </div>
  );
});

export default Carousel1;
