import { createEvent, createStore } from "effector/compat";

const getMovedToEndSlides = (slides) => {
  const movedSlide = slides.shift();
  slides.push(movedSlide);
  return slides;
}

const getMovedToBeginSlides = (slides) => {
  const movedSlide = slides.pop();
  slides.unshift(movedSlide);
  return slides;
}

export const setWidth = createEvent();
export const setOffset = createEvent();
export const setCurSlide = createEvent();
export const moveSlideToEnd = createEvent();
export const moveSlideToBegin = createEvent();

export default createStore({
  width: 0,
  slides: [],
  offset: 0,
  curSlide: -1,
})
  .on(setWidth, (state, width) => ({
    ...state,
    width: width,
  }))
  .on(setOffset, (state, offset) => ({
    ...state,
    offset: offset,
  }))
  .on(setCurSlide, (state, curSlide) => ({
    ...state,
    curSlide: curSlide,
  }))
  .on(moveSlideToEnd, (state) => ({
    ...state,
    slides: getMovedToEndSlides(state.slides),
  }))
  .on(moveSlideToBegin, (state) => ({
    ...state,
    slides: getMovedToEndSlides(state.slides),
  }));
