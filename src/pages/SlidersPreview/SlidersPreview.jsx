import Slider from "../../components/Slider/Slider.jsx";
import "./SlidersPreview.scss";
import Image1 from "../../assets/images/img1.png";
import Image2 from "../../assets/images/img2.png";
import Image3 from "../../assets/images/img3.png";
import Image4 from "../../assets/images/img4.png";

export default function SlidersPreview() {
  return (
    <div className="sliders-container">
      <div>
        <h2 className="sliders-container__title">Infinite auto slider without dots and arrows</h2>
        <Slider id={"first-slider"} infinite auto>
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
      </div>

      <div>
        <h2 className="sliders-container__title">Slider with dots and arrows</h2>
        <Slider id={"second-slider"} showDots showArrows>
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
          <Slider.Slide>
            <Slider.Image src={Image4} />
            <Slider.Description text={"Fourth image"} />
          </Slider.Slide>
        </Slider>
      </div>

      <div>
        <h2 className="sliders-container__title">Auto slider with dots and without arrows and description</h2>
        <Slider id={"third-slider"} auto showDots>
          <Slider.Slide>
            <Slider.Image src={Image1} />
          </Slider.Slide>
          <Slider.Slide>
            <Slider.Image src={Image2} />
          </Slider.Slide>
          <Slider.Slide>
            <Slider.Image src={Image3} />
          </Slider.Slide>
          <Slider.Slide>
            <Slider.Image src={Image4} />
          </Slider.Slide>
        </Slider>
      </div>
    </div>
  )
}
