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
export const setSlides = createEvent();
export const moveSlideToEnd = createEvent();
export const moveSlideToBegin = createEvent();
export const moveToLeft = createEvent();
export const moveToRight = createEvent();

const $store = createStore({
  width: 0,
  slides: [],
  offset: 0,
  curSlide: 0,
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
  .on(setSlides, (state, slides) => ({
    ...state,
    slides: [...slides],
  }))
  .on(moveSlideToEnd, (state) => ({
    ...state,
    slides: getMovedToEndSlides(state.slides),
  }))
  .on(moveSlideToBegin, (state) => ({
    ...state,
    slides: getMovedToBeginSlides(state.slides),
  }))
  .on(moveToLeft, (state) => ({
    ...state,
    offset: state.curSlide === 0 ? 0 : state.offset + state.width,
    curSlide: state.curSlide === 0 ? 0 : state.curSlide - 1,
  }))
  .on(moveToRight, (state) => ({
    ...state,
    offset: state.curSlide === state.slides.length - 1 ? state.offset : state.offset - state.width,
    curSlide: state.curSlide === state.slides.length - 1 ? state.curSlide : state.curSlide + 1,
  }));

export default $store;
