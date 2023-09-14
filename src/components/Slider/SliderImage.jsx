// eslint-disable-next-line react/prop-types
export default function SliderImage({ src, ...rest }) {
  return <img className="slider__image" src={src} {...rest} />;
}
