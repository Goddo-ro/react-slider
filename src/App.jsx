import Slider from "./components/Slider/Slider.jsx";
import Image1 from "./assets/images/img1.png";
import Image2 from "./assets/images/img2.png";
import Image3 from "./assets/images/img3.png";

function App() {
  return (
    <>
      <Slider id={"first-slider"} showArrows>
        <Slider.Slide>
          <img src={Image1} />
        </Slider.Slide>
        <Slider.Slide>
          <img src={Image2} />
        </Slider.Slide>
        <Slider.Slide>
          <img src={Image3} />
        </Slider.Slide>
      </Slider>
    </>
  )
}

export default App
