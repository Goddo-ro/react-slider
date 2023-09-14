import { FiCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { useStore } from "effector-react";
import $store, { moveTo } from "./store.js";

// eslint-disable-next-line react/prop-types
export default function Dot({ id, index }) {
  const store = useStore($store);

  return (
    <div onClick={() => moveTo({ id, index })}>
      {
        store[id]?.curSlide === index
          ? <FaCircle size={20}/>
          : <FiCircle size={20}/>
      }
    </div>
  )
}
