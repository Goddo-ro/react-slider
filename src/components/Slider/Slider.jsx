import "./index.scss";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import $store, {
  createNewSlider,
  moveToLeft,
  moveToRight,
  setCurSlide,
  setOffset,
  setSlides,
  setWidth
} from "./store.js";
import SliderList from "./SliderList.jsx";
import Slide from "./Slide.jsx";
import Arrows from "./Arrows.jsx";
import { useStore } from "effector-react";
import SliderImage from "./SliderImage.jsx";
import SliderDescription from "./SliderDescription.jsx";
import Dot from "./Dot.jsx";

const TRANSITION_DURATION = 300;
const AUTO_INTERVAL = 3000;

// eslint-disable-next-line react/prop-types
export default function Slider({id, showArrows, showDots, infinite, auto, delay = AUTO_INTERVAL, children}) {
  const [transitionDuration, setTransitionDuration] = useState(0);
  const [clonesCount, setClonesCount] = useState({head: 0, tail: 0});
  const [touchPosition, setTouchPosition] = useState(null);
  const [moving, setMoving] = useState(0);

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
      setOffset({ id, offset: -sliderRef.current.offsetWidth });
      setCurSlide({ id, curSlide: 0 });
    }

    window.addEventListener("resize", resizeHandler);

    let autoScroll;
    if (auto)
      autoScroll = setInterval(() => {
        moveToRight(id);
      }, delay);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearInterval(autoScroll);
    }
  }, [sliderRef?.current?.offsetWidth]);

  useEffect(() => {
    if (infinite) {
      setSlides({id, slides: [
        cloneElement(children[Children.count(children) - 1], {key: -1}),
        ...children,
        cloneElement(children[0], {key: 12}),
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
    const curSlide = store[id]?.curSlide;

    if (!width || !slidesCount) return;

    if (offset === 0) {
      setTransitionDuration(0);
      setTimeout(() => {
        setOffset({id, offset: -(width * (slidesCount - 1 - clonesCount.tail))});
        setCurSlide({id, curSlide: Children.count(children) - 1 });
      }, TRANSITION_DURATION);
      return;
    }

    if (offset === -(width * (slidesCount - 1))) {
      setTransitionDuration(0);
      setTimeout(() => {
        setOffset({id, offset: -(clonesCount.head * width)});
        setCurSlide({id, curSlide: 0});
      }, TRANSITION_DURATION);
    }
  }, [store[id]?.offset, infinite, clonesCount])

  const handleTouchStart = (e) => {
    setTouchPosition(e.touches[0].clientX);
  }

  const handleTouchMove = (e) => {
    if (touchPosition === null) return;

    const currentPosition = e.touches[0].clientX;
    const direction = -(touchPosition - currentPosition);
    if (Math.abs(direction) > sliderRef.current.offsetWidth / 5) return;

    setMoving(direction);
  }

  const handleTouchEnd = () => {
    if (touchPosition === null) return;

    if (moving < 50 || moving > 50) {
      setTransitionDuration(TRANSITION_DURATION);
      setTimeout(() => {
        setTransitionDuration(0);
      }, TRANSITION_DURATION);
    }

    if (moving < -50) {
      moveToRight(id);

    }

    if (moving > 50) {
      moveToLeft(id);
    }

    setTouchPosition(null);
    setMoving(0);
  }

  return (
    <div className="slider" ref={sliderRef}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
      { showArrows && <Arrows id={id} /> }
      <SliderList id={id} style={{
        transform: `translateX(${store[id]?.offset + moving}px)`,
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
