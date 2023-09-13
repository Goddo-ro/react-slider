import Slider from "./components/Slider/Slider.jsx";
import Image1 from "./assets/images/img1.png";
import Image2 from "./assets/images/img2.png";
import Image3 from "./assets/images/img3.png";

function App() {
  return (
    <>
      <Slider id={"first-slider"} showArrows>
        <Slider.Slide>
          <Slider.Image src={Image1} />
          <Slider.Description text={"First image"} />
        </Slider.Slide>
        <Slider.Slide>
          <Slider.Image src={Image2} />
          <Slider.Description text={"Second image"} />
        </Slider.Slide>
        <Slider.Slide>
          <Slider.Image src={Image3} />
          <Slider.Description text={"Third image"} />
        </Slider.Slide>
      </Slider>
    </>
  )
}

export default App
