"use client";

import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Carousel1 from "@/components/Carousel1";
import Slider from "@/components/Slider";
import Link from "next/link";
import { useState } from "react";

const componentMap = {
  Button,
  Carousel,
  Carousel1,
  Slider,
};

export default function ComponentRenderer({ name }) {
  const Component = componentMap[name];
  const componentType = false;
  const [compTypeProps, setCompTypeProps] = useState(1);

  const natureImages = {
    // set1: {
    //   snow: "/1.jpg",
    //   jungle: "/2.jpg",
    //   night: "/3.jpg",
    //   minimal: "/4.jpg",
    //   landscape: "/5.jpg",
    // },
    set1: {
      snow: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
      jungle: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      night: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      minimal: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      landscape: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    },
    set2: {
      snow: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      jungle: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      night: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      minimal: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      landscape: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c",
    },
  };
  const returnSet = (set) => {
    return Object.entries(natureImages[set]);
  };

  const compProps = {
    Carousel1: {
      1: (
        <>
          <div className="bg-blue-500 text-white p-12 text-center text-2xl h-full flex items-center justify-center">
            Slide 1
          </div>
          <div className="bg-green-500 text-white p-12 text-center text-2xl h-full flex items-center justify-center">
            Slide 2
          </div>
          <div className="bg-purple-500 text-white p-12 text-center text-2xl h-full flex items-center justify-center">
            Slide 3
          </div>
        </>
      ),
      2: (
        <>
          {returnSet("set1").map((img, index) => (
            <img
              key={index + 1}
              src={img[1]}
              alt={img[0]}
              className="slide__image"
            />
          ))}
        </>
      ),
      3: (
        <>
          <div className="bg-blue-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 1
          </div>
          <div className="bg-green-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 2
          </div>
          <div className="bg-purple-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 3
          </div>
          <div className="bg-red-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 4
          </div>
          <div className="bg-blue-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 5
          </div>
          <div className="bg-grey-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 3
          </div>
          <div className="bg-red-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 3
          </div>
          <div className="bg-green-500 text-white p-12 w-full text-center text-2xl h-full flex items-center justify-center">
            Slide 3
          </div>
        </>
      ),
    },
  };

  const renderComponent = (name) => {
    switch (name) {
      case "Button":
        return (
          <div className="flex flex-col gap-4 items-center">
            <Component variant="primary">Primary Button</Component>
            <Component variant="secondary">Secondary Button</Component>
            <Component
              variant="primary"
              onClick={() => alert("Button clicked!")}
            >
              Click Me
            </Component>
          </div>
        );

      case "Carousel":
        return (
          <div className="w-full max-w-2xl mx-auto">
            <Component autoPlay={false} showDots showArrows infinite>
              <div className="bg-blue-500 text-white p-12 text-center text-2xl">
                Slide 1
              </div>
              <div className="bg-green-500 text-white p-12 text-center text-2xl">
                Slide 2
              </div>
              <div className="bg-purple-500 text-white p-12 text-center text-2xl">
                Slide 3
              </div>
              <div className="bg-red-500 text-white p-12 text-center text-2xl">
                Slide 4
              </div>
            </Component>
          </div>
        );

      case "Carousel1":
        return (
          <div className="w-full max-w-2xl mx-auto">
            <Component
              width="800px"
              slideProps={{ height: "400px", aspectClass: "" }}
            >
              {compProps?.Carousel1?.[compTypeProps] || <></>}
            </Component>
          </div>
        );

      case "Slider":
        return (
          <div className="w-full max-w-2xl mx-auto">
            <Component />
          </div>
        );

      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Component not found
              </h1>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Go back to home
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="component__show-container">
      {renderComponent(name)}
      {Component && compProps?.[name] && (
        <div className="mt-8 flex gap-4">
          {Object.keys(compProps?.[name]).map((key, index) => (
            <Button
              key={key + index}
              variant="primary"
              onClick={() => setCompTypeProps(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
