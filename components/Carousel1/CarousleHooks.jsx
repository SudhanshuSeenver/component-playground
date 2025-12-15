import { useCallback } from "react";

export function useCarouselActions({
  currentSlide,
  slidesLength,
  loop,
  setCurrentSlide,
}) {
  const onNext = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev + 1;

      if (loop) return next % slidesLength;
      return Math.min(next, slidesLength - 1);
    });
  }, [loop, slidesLength, setCurrentSlide]);

  const onPrev = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev - 1;

      if (loop) return (next + slidesLength) % slidesLength;
      return Math.max(next, 0);
    });
  }, [loop, slidesLength, setCurrentSlide]);

  const disablePrev = !loop && currentSlide === 0;
  const disableNext = !loop && currentSlide === slidesLength - 1;

  return {
    onNext,
    onPrev,
    disablePrev,
    disableNext,
  };
}
