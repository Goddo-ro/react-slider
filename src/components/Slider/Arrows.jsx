import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import $store, { setOffset } from "./store.js";
import { useStore } from "effector-react";

export default function Arrows() {
  const store = useStore($store);

  return (
    <>
      <SlArrowLeft className="slider__arrow slider__arrow_left"
                   onClick={() => {
                     setOffset(store.offset + store.width);
                   }}
      />
      <SlArrowRight className="slider__arrow slider__arrow_right"
                    onClick={() => {
                      setOffset(store.offset - store.width);
                    }}
      />
    </>
  )
}
