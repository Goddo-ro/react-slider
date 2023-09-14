import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import $store, { moveToLeft, moveToRight } from "./store.js";
import { useStore } from "effector-react";

// eslint-disable-next-line react/prop-types
export default function Arrows({ id }) {
  const store = useStore($store);

  return (
    <>
      {
        !(!store[id]?.infinite && store[id]?.curSlide === 0) &&
        <SlArrowLeft className="slider__arrow slider__arrow_left"
                     onClick={() => moveToLeft(id)}
        />
      }
      {
        !(!store[id]?.infinite && store[id]?.curSlide === store[id]?.slides.length - 1) &&
        <SlArrowRight className="slider__arrow slider__arrow_right"
                      onClick={() => moveToRight(id)}
        />
      }

    </>
  )
}
