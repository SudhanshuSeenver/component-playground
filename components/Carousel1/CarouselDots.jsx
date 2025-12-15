import React, { memo } from "react";

const CarouselDots = memo(function CarouselDots({
  slidesLen,
  goToSlide,
  currentSlide,
  classes = "",
  clickable = true,
}) {
  return (
    <div
      className={`slides__dots flex justify-center items-center gap-2 p-4 absolute w-full left-0 bottom-0 ${classes}`}
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array(slidesLen).map((_, index) => {
        const isActive = index === currentSlide;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive}
            onClick={clickable ? () => goToSlide(index) : undefined}
            className={`dot transition-all rounded-full ${
              isActive ? "active w-8 h-2 bg-blue-600" : "w-2 h-2 bg-gray-300"
            } ${
              clickable
                ? "cursor-pointer hover:bg-gray-400"
                : "cursor-default pointer-events-none"
            }`}
          />
        );
      })}
    </div>
  );
});

export default CarouselDots;
