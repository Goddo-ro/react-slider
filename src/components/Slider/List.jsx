import $store from "./store.js";
import { useStore } from "effector-react";

export default function List() {
  const store = useStore($store);

  return (
    <div className="slider__list">
      {store.slides}
    </div>
  );
}
