import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { moveToLeft, moveToRight } from "./store.js";

export default function Arrows() {
  return (
    <>
      <SlArrowLeft className="slider__arrow slider__arrow_left"
                   onClick={() => moveToLeft()}
      />
      <SlArrowRight className="slider__arrow slider__arrow_right"
                    onClick={() => moveToRight()}
      />
    </>
  )
}
