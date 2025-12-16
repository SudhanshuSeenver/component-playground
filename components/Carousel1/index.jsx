"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import "./Carousel.scss";
import CarouselSlide from "./CarouselSlide";
import CarouselDots from "./CarouselDots";
import CarouselActions from "./CarouselActions";
import { useCarouselActions } from "./hooks/useCarouselActions";

// slideProps --> height, classes, aspectRatio

/**
 * @typedef {Object} actionsProps
 * @property {string} [className=""] - Custom CSS classes applied to the container of both buttons.
 * @property {string} [prevButtonClassName=""] - Custom CSS classes applied to the "Previous" button.
 * @property {string} [nextButtonClassName=""] - Custom CSS classes applied to the "Next" button.
 * @property {React.ReactNode|null} [prevButton=null] - Custom JSX or component to render as the "Previous" button. If not provided, default icon/button is used.
 * @property {React.ReactNode|null} [nextButton=null] - Custom JSX or component to render as the "Next" button. If not provided, default icon/button is used.
 *
 * @example
 * const actionProps = {
 *   className: "my-carousel-buttons",
 *   prevButtonClassName: "btn-prev",
 *   nextButtonClassName: "btn-next",
 *   prevButton: <CustomPrevIcon />,
 *   nextButton: <CustomNextIcon />,
 * };
 */

const Carousel1 = forwardRef(function Carousel1(
  {
    slideProps,
    children,
    loop = false,
    pagination = {},
    showPagination = false,
    actionsProps,
    slidesToShow = 3,
    duration = 300,
    autoPlay = false,
    interval = 2000,
    buttonPosition = 1, // 1 --> overlay(default), 2 --> bottom, 3 --> top
  },
  ref
) {
  // States
  const [containerWidth, setContainerWidth] = useState(0);

  // Refs
  const sliderContainerRef = useRef(null);
  // const carouselRef = useRef(null);

  // Local Vars
  const slides = getChildrenArray(children);
  const slidesToShowInOneView = useMemo(() => {
    return groupSlides(slides, slidesToShow);
  }, [slides, slidesToShow]);

  const isGrouped = slidesToShow > 1;

  const singleSlides = slides;
  const groupedSlides = slidesToShowInOneView;

  const slidesLen = isGrouped ? groupedSlides.length : singleSlides.length;

  const showButtons = {
    top: buttonPosition === 3 || buttonPosition === 2,
    bottom: buttonPosition === 1 || buttonPosition === 2,
  };
  const actionHookArgs = {
    slidesLength: slidesLen,
    loop,
    autoPlay,
    interval,
  };
  // console.log(Math.ceil(slides.length / slidesToShow));
  const {
    currentSlide,
    goToSlide,
    goToNextSlide,
    goToPrevSlide,
    setTransitionRef,
    
  } = useCarouselActions(actionHookArgs);

  function getChildrenArray(children) {
    if (React.isValidElement(children) && children.type === React.Fragment) {
      return React.Children.toArray(children.props.children);
    }
    return React.Children.toArray(children);
  }

  function groupSlides(slides, slidesToShow = 1) {
    if (!Array.isArray(slides) || slides.length === 0) return [];

    const result = [];
    for (let i = 0; i < slides.length; i += slidesToShow) {
      result.push(slides.slice(i, i + slidesToShow));
    }
    return result;
  }

  // Expose imperative methods to parent/external components
  useImperativeHandle(
    ref,
    () => ({
      next: goToNextSlide,
      prev: goToPrevSlide,
      goTo: goToSlide,
      getCurrent: () => currentSlide,
      loop: loop,
      slidesLen: slidesLen,
    }),
    [goToNextSlide, goToPrevSlide, goToSlide, currentSlide, loop, slidesLen]
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

  // Component props vars

  const carouselActionsProps = {
    onNext: goToNextSlide,
    onPrev: goToPrevSlide,
    disablePrev: !loop && currentSlide === 0,
    disableNext: !loop && currentSlide === slidesLen - 1,
    slidesLen: slidesLen,
    ...actionsProps,
  };
  // console.log(slidesToShowInOneView);
  const renderSingleSlides = () =>
    singleSlides.map((slide, index) => (
      <CarouselSlide
        key={index}
        slideProps={slideProps}
        containerWidth={containerWidth}
      >
        {slide}
      </CarouselSlide>
    ));

  const renderGroupedSlides = () =>
    groupedSlides.map((group, index) => (
      <CarouselSlide
        key={index}
        slideProps={{
          ...slideProps,
          classes: `${slideProps.classes ?? ""} !grid gap-2 place-items-center`,
          styles: {
            ...slideProps.styles,
            gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))`,
          },
        }}
        containerWidth={containerWidth}
      >
        {group.map((slide) => slide)}
      </CarouselSlide>
    ));

  console.log(currentSlide);
  return (
    <div className="carousel__container">
      {showButtons?.top && <CarouselActions {...carouselActionsProps} />}
      <div ref={sliderContainerRef} className="slides__container">
        <div
          className="slides__wrapper"
          style={{
            transform: `translate3d(-${currentSlide * containerWidth}px, 0, 0)`,
            transitionDuration: `${duration}ms`,
          }}
          onTransitionEnd={() => {
            setTransitionRef( false);
          }}
        >
          {isGrouped ? renderGroupedSlides() : renderSingleSlides()}
        </div>
      </div>

      {/* Internal Action Buttons */}

      {showButtons?.bottom && <CarouselActions {...carouselActionsProps} />}

      {/* Dots */}
      {showPagination && slidesLen > 1 && (
        <CarouselDots
          slidesLen={slidesLen}
          goToSlide={goToSlide}
          currentSlide={currentSlide}
        />
      )}
    </div>
  );
});

export default Carousel1;
