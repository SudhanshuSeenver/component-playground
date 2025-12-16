import { useState, useRef, useEffect, useCallback } from "react";

export function useCarouselActions({
  slidesLength,
  loop = false,
  autoPlay = false,
  interval = 2000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const transitionRef = useRef(false);

  const setTransitionRef = useCallback((val) => {
    transitionRef.current = val;
  }, []);
  console.log(transitionRef.current, slidesLength);
  const goToSlide = useCallback(
    (index) => {
      if (transitionRef.current) return;
      setTransitionRef(true);
      setCurrentSlide(index);
    },
    [setTransitionRef]
  );

  const goToNextSlide = useCallback(() => {
    if (transitionRef.current) return;
    setTransitionRef(true);
    setCurrentSlide((prev) =>
      loop ? (prev + 1) % slidesLength : Math.min(prev + 1, slidesLength - 1)
    );
  }, [loop, slidesLength, setTransitionRef]);

  const goToPrevSlide = useCallback(() => {
    if (transitionRef.current) return;
    setTransitionRef(true);
    setCurrentSlide((prev) =>
      loop ? (prev - 1 + slidesLength) % slidesLength : Math.max(prev - 1, 0)
    );
  }, [loop, slidesLength, setTransitionRef]);

  // AutoPlay
  useEffect(() => {
    if (!autoPlay) return;
    const intervalId = setInterval(() => goToNextSlide(), interval);
    return () => clearInterval(intervalId);
  }, [autoPlay, interval, goToNextSlide]);

  // Reset when slides change
  useEffect(() => setCurrentSlide(0), [slidesLength]);

  return {
    currentSlide,
    goToSlide,
    goToNextSlide,
    goToPrevSlide,
    setTransitionRef,
  };
}
