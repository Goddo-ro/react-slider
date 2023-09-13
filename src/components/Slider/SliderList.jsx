import $store from "./store.js";
import { useStore } from "effector-react";

// eslint-disable-next-line react/prop-types
export default function SliderList({id, ...rest}) {
  const store = useStore($store);

  return (
    <div style={rest.style} className="slider__list">
      {
        store[id]?.slides
      }
    </div>
  );
}
