import "./index.scss";
import { Children, useEffect, useRef } from "react";
import $store, { createNewSlider, setCurSlide, setOffset, setWidth } from "./store.js";
import SliderList from "./SliderList.jsx";
import Slide from "./Slide.jsx";
import Arrows from "./Arrows.jsx";
import { useStore } from "effector-react";
import SliderImage from "./SliderImage.jsx";
import SliderDescription from "./SliderDescription.jsx";
import Dot from "./Dot.jsx";

// eslint-disable-next-line react/prop-types
export default function Slider({id, showArrows, showDots, children}) {
  const store = useStore($store);

  const sliderRef = useRef();

  useEffect(() => {
    createNewSlider({
      id: id,
      width: sliderRef.current.offsetWidth,
      offset: 0,
      curSlide: 0,
      slides: Children.toArray(children),
    });
  }, [id]);

  useEffect(() => {
    const resizeHandler = () => {
      const curSliderWidth = sliderRef.current.offsetWidth;
      curSliderWidth !== store.width && setWidth({ id, width: curSliderWidth });
      setOffset({ id, offset: 0 });
      setCurSlide({ id, curSlide: 0 });
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    }
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      { showArrows && <Arrows id={id} /> }
      <SliderList id={id} style={{
        transform: `translateX(${store[id]?.offset}px)`,
      }} />
      <div className="slider__dots">
        { showDots &&
          new Array(Children.count(children)).fill(0).map((_, i) => <Dot key={i} id={id} index={i} />)
        }
      </div>
    </div>
  )
}

Slider.Slide = Slide;
Slider.Image = SliderImage;
Slider.Description = SliderDescription;
