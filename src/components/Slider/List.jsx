import $store from "./store.js";
import { useStore } from "effector-react";

export default function List({...rest}) {
  const store = useStore($store);

  return (
    <div style={rest.style} className="slider__list">
      {store.slides}
    </div>
  );
}
