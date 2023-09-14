import { createEvent, createStore, sample } from "effector/compat";

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
export const moveTo = createEvent();

const $store = createStore({});

sample({
  clock: createNewSlider,
  source: $store,
  fn: (state, settings) => {
    const id = settings.id;
    const newState = { ...state };
    newState[id] = {
      width: settings.width,
      offset: settings.offset,
      slides: settings.slides,
      curSlide: settings.curSlide,
    }
    return newState;
  },
  target: $store,
});

sample({
  clock: setWidth,
  source: $store,
  fn: (state, payload) =>
    getStateWithChangedValue(state, payload.id, "width", payload.width),
  target: $store,
});

sample({
  clock: setOffset,
  source: $store,
  fn: (state, payload) =>
    getStateWithChangedValue(state, payload.id, "offset", payload.offset),
  target: $store,
});

sample({
  clock: setCurSlide,
  source: $store,
  fn: (state, payload) =>
    getStateWithChangedValue(state, payload.id, "curSlide", payload.curSlide),
  target: $store,
});

sample({
  clock: moveToLeft,
  source: $store,
  filter: (state, id) => !(state[id].curSlide === 0),
  fn: (state, id) => {
    const slider = state[id];
    slider.offset += slider.width;
    slider.curSlide = slider.curSlide - 1;
    return {
      ...state,
      [id]: slider,
    };
  },
  target: $store,
});

sample({
  clock: moveToRight,
  source: $store,
  filter: (state, id) => !(state[id].curSlide === state[id].slides.length - 1),
  fn: (state, id) => {
    const slider = state[id];
    slider.offset -= slider.width;
    slider.curSlide = slider.curSlide + 1;
    return {
      ...state,
      [id]: slider,
    }
  },
  target: $store,
});

sample({
  clock: moveTo,
  source: $store,
  // Check if index is between 0 and slides length and not equal to cur slide
  filter: (state, payload) => (payload.index >= 0 &&
    payload.index < state[payload.id].slides.length &&
    state[payload.id].curSlide !== payload.index),
  fn: (state, payload) => {
    const slider = state[payload.id];

    if (payload.index < slider.curSlide) {
      slider.offset += (slider.curSlide - payload.index) * slider.width;
    } else {
      slider.offset -= (payload.index - slider.curSlide) * slider.width;
    }

    slider.curSlide = payload.index;
    return {
      ...state,
      [payload.id]: slider,
    }
  },
  target: $store,
})

export default $store;
