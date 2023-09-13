import { createEvent, createStore } from "effector/compat";

const getStateWithChangedValue = (state, id, key, newValue) => {
  const slider = state[id];
  return {
    ...state,
    [id]: {
      ...slider,
      [key]: newValue,
    }
  }
}

export const createNewSlider = createEvent();
export const setWidth = createEvent();
export const setOffset = createEvent();
export const setCurSlide = createEvent();
export const moveToLeft = createEvent();
export const moveToRight = createEvent();


const $store = createStore({})
  .on(createNewSlider, (state, settings) => {
    const id = settings.id;
    const newState = {...state};
    newState[id] = {
      width: settings.width,
      offset: settings.offset,
      slides: settings.slides,
      curSlide: settings.curSlide,
    }
    return newState;
  })
  .on(setWidth, (state, payload) =>
    getStateWithChangedValue(state, payload.id, "width", payload.width))
  .on(setOffset, (state, payload) =>
    getStateWithChangedValue(state, payload.id, "offset", payload.offset))
  .on(setCurSlide, (state, payload) =>
    getStateWithChangedValue(state, payload.id, "curSlide", payload.curSlide))
  .on(moveToLeft, (state, id) => {
    const slider = state[id];
    if (slider.curSlide === 0) return state;
    slider.offset = slider.offset + slider.width;
    slider.curSlide = slider.curSlide - 1;
    return {
      ...state,
      [id]: slider,
    };
  })
  .on(moveToRight, (state, id) => {
    const slider = state[id];
    if (slider.curSlide === slider.slides.length - 1) return state;
    slider.offset = slider.offset - slider.width;
    slider.curSlide = slider.curSlide + 1;
    return {
      ...state,
      [id]: slider,
    }
  });

export default $store;
