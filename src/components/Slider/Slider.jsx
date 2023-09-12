import "./index.scss";
import { Children, useEffect } from "react";
import { setSlides } from "./store.js";
import List from "./List.jsx";
import Slide from "./Slide.jsx";

// eslint-disable-next-line react/prop-types
export default function Slider({children}) {
  useEffect(() => {
    setSlides(Children.toArray(children));
  }, [children]);

  return (
    <div className="slider">
      <List/>
    </div>
  )
}

Slider.Slide = Slide;
