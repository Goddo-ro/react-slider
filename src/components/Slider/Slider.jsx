import "./index.scss";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import $store, { createNewSlider, setCurSlide, setOffset, setSlides, setWidth } from "./store.js";
import SliderList from "./SliderList.jsx";
import Slide from "./Slide.jsx";
import Arrows from "./Arrows.jsx";
import { useStore } from "effector-react";
import SliderImage from "./SliderImage.jsx";
import SliderDescription from "./SliderDescription.jsx";
import Dot from "./Dot.jsx";

const TRANSITION_DURATION = 300;

// eslint-disable-next-line react/prop-types
export default function Slider({id, showArrows, showDots, infinite, children}) {
  const [transitionDuration, setTransitionDuration] = useState(0);
  const [clonesCount, setClonesCount] = useState({head: 0, tail: 0});

  const store = useStore($store);

  const sliderRef = useRef();

  useEffect(() => {
    createNewSlider({
      id: id,
      width: sliderRef.current.offsetWidth,
      offset: -(clonesCount.head * sliderRef.current.offsetWidth),
      curSlide: 0,
      slides: Children.toArray(children),
      infinite: infinite,
    });
  }, [id]);

  useEffect(() => {
    const resizeHandler = () => {
      const curSliderWidth = sliderRef.current.offsetWidth;
      curSliderWidth !== store[id]?.width && setWidth({ id, width: curSliderWidth });
      setOffset({ id, offset: -(clonesCount.head) * curSliderWidth });
      setCurSlide({ id, curSlide: 0 });
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    }
  }, []);

  useEffect(() => {
    if (infinite) {
      setSlides({id, slides: [
        cloneElement(children[Children.count(children) - 1]),
        ...children,
        cloneElement(children[0]),
      ]});
      setClonesCount({head: 1, tail: 1});
      setOffset({id, offset: -sliderRef.current.offsetWidth});
      return;
    }
  }, [children, infinite])

  useEffect(() => {
    if (!infinite) return;

    const offset = store[id]?.offset;
    const width = store[id]?.width;
    const slidesCount = store[id]?.slides?.length;

    if (!width || !slidesCount) return;

    if (offset === 0) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset({id, offset: -(width * (slidesCount - 1 - clonesCount.tail))});
        setCurSlide({id, curSlide: Children.count(children) - 1 });
      }, TRANSITION_DURATION);
      return;
    }

    if (offset === -(width * (slidesCount - 1))) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset({id, offset: -(clonesCount.head * width)});
        setCurSlide({id, curSlide: 0});
      }, TRANSITION_DURATION);
    }
  }, [store[id]?.offset, infinite, clonesCount])

  return (
    <div className="slider" ref={sliderRef}>
      { showArrows && <Arrows id={id} /> }
      <SliderList id={id} style={{
        transform: `translateX(${store[id]?.offset}px)`,
        transitionDuration: `${transitionDuration}ms`,
      }} />
      <div className="slider__dots">
        { showDots &&
          new Array(Children.count(children)).fill(0).map((_, i) =>
            <Dot key={i} id={id} index={i} />)
        }
      </div>
    </div>
  )
}

Slider.Slide = Slide;
Slider.Image = SliderImage;
Slider.Description = SliderDescription;
