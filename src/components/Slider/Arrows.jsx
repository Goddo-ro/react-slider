import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { moveToLeft, moveToRight } from "./store.js";

// eslint-disable-next-line react/prop-types
export default function Arrows({id}) {
  return (
    <>
      <SlArrowLeft className="slider__arrow slider__arrow_left"
                   onClick={() => moveToLeft(id)}
      />
      <SlArrowRight className="slider__arrow slider__arrow_right"
                    onClick={() => moveToRight(id)}
      />
    </>
  )
}
