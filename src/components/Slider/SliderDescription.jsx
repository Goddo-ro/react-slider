export default function SliderDescription({ text, ...rest }) {
  return <h3 className={`slider__description ${rest.className}`}>{text}</h3>
}
