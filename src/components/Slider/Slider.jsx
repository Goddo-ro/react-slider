import "./index.scss";
import { Children, useEffect, useRef } from "react";
import $store, { setSlides, setWidth } from "./store.js";
import List from "./List.jsx";
import Slide from "./Slide.jsx";
import Arrows from "./Arrows.jsx";
import { useStore } from "effector-react";

// eslint-disable-next-line react/prop-types
export default function Slider({children}) {
  const store = useStore($store);

  const sliderRef = useRef();

  useEffect(() => {
    setSlides(Children.toArray(children));
  }, [children]);

  useEffect(() => {
    setWidth(sliderRef.current.offsetWidth);

    const resizeHandler = () => {
      const curSliderWidth = sliderRef.current.offsetWidth;
      curSliderWidth !== store.width && setWidth(curSliderWidth);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    }
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      <Arrows/>
      <List style={{
        transform: `translateX(${store.offset}px)`,
      }} />
    </div>
  )
}

Slider.Slide = Slide;
