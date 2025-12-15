"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./CardMedia.scss";

export default function CardMedia({
  mediaType,
  media,
  height = null, // fixed height
  ratio = "16 / 9", // default base ratio
  aspectClass = "", // tailwind responsive aspect-ratio classes
  children,
  ...props
}) {
  // Warn if user passes multiple props
  useEffect(() => {
    const count = [height, ratio, aspectClass].filter(Boolean).length;
    if (count > 1) {
      console.info(
        "[CardMedia Info] You passed multiple layout props (height, ratio, aspectClass). " +
          "Priority: aspectClass > ratio > height."
      );
    }
  }, [height, ratio, aspectClass]);

  // Compute inline style
  const style = {};
  if (!aspectClass && ratio) {
    style.aspectRatio = ratio; // always "w / h" format
  }
  if (!aspectClass && !ratio && height) {
    style.height = height;
  }

  // ----------------------------
  // Render media
  // ----------------------------
  const renderMedia = () => {
    switch (mediaType) {
      case 1: // IMAGE
        return (
          <div className="card__media-img-wrapper">
            <Image
              src={media?.src}
              alt={media?.alt || "card-media"}
              fill
              sizes="(max-width: 768px) 100vw, 240px"
              className="card__media-img"
            />
          </div>
        );

      case 3: // VIDEO
        return (
          <div className="card__media-video-wrapper">
            <video
              src={media?.src}
              autoPlay={media?.autoPlay ?? false}
              loop={media?.loop ?? true}
              muted={media?.muted ?? true}
              controls={media?.controls ?? false}
              playsInline
              className="card__media-video"
            />
          </div>
        );

      default:
        return media || null;
    }
  };

  return (
    <div className={`card__media-wrapper`} {...props}>
      <div className={`card__media ${aspectClass}`} style={style}>
        {renderMedia()}
      </div>

      {children && (
        <div className="card__badges absolute top-0 right-0 z-2">
          {children}
        </div>
      )}
    </div>
  );
}
