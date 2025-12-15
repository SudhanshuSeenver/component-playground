"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  infinite = true,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [isTransitioning]
  );

  const goToPrevious = useCallback(() => {
    if (infinite) {
      goToSlide(currentIndex === 0 ? totalItems - 1 : currentIndex - 1);
    } else {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    }
  }, [currentIndex, totalItems, infinite, goToSlide]);

  const goToNext = useCallback(() => {
    if (infinite) {
      goToSlide(currentIndex === totalItems - 1 ? 0 : currentIndex + 1);
    } else {
      if (currentIndex < totalItems - 1) {
        goToSlide(currentIndex + 1);
      }
    }
  }, [currentIndex, totalItems, infinite, goToSlide]);

  const goToSlideIndex = useCallback(
    (index) => {
      goToSlide(index);
    },
    [goToSlide]
  );

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && totalItems > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, interval, goToNext, totalItems]);

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Mouse drag handlers
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!dragStart || !touchEnd) return;

    const distance = dragStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setDragStart(null);
    setTouchEnd(null);
  };

  if (totalItems === 0) {
    return null;
  }
  console.log("rendered");
  return (
    <div
      className={`relative w-full ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0"
              style={{ width: "100%" }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={!infinite && currentIndex === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all ${
              !infinite && currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            disabled={!infinite && currentIndex === totalItems - 1}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all ${
              !infinite && currentIndex === totalItems - 1
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && totalItems > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlideIndex(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-blue-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
