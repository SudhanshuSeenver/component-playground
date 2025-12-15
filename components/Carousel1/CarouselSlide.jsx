"use client";

import React from "react";

/**
 * CarouselSlide component
 *
 * A responsive slide for carousels. Width is always 100% of the container (or `containerWidth` if provided).
 * Exactly one of `height`, `aspectRatio`, or `aspectClass` must be provided in `slideProps`.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content inside the slide
 * @param {Object} [props.slideProps] - Slide customization props
 * @param {string|number} [props.slideProps.height] - Fixed height of the slide
 * @param {number} [props.slideProps.aspectRatio] - Aspect ratio (width / height) of the slide
 * @param {string} [props.slideProps.aspectClass] - CSS class that defines height/aspect ratio
 * @param {string} [props.slideProps.classes] - Additional custom CSS classes
 * @param {Object} [props.slideProps.styles] - Inline styles
 * @param {string|number} [props.containerWidth] - Optional explicit container width
 * @returns {JSX.Element}
 *
 *
 */

function CarouselSlide({ children, slideProps = {}, containerWidth }) {
  const { height, aspectRatio, aspectClass, classes, styles } = slideProps;

  // Compute final styles
  const style = {
    width: containerWidth || "100%",
    ...(height ? { height } : {}),
    ...(aspectRatio && !height ? { aspectRatio } : {}),
    ...(styles || {}),
  };

  // Combine classes
  const combinedClasses = ["slide relative", classes || "", aspectClass || ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClasses} style={style}>
      {children}
    </div>
  );
}

export default CarouselSlide;
