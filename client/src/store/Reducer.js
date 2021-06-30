import { GET_DATA } from "./Action";


const initialState = {
  data:[]
};


const rootReducer = (state = initialState, action) => {
  if (action.type === GET_DATA) {
    return {
      ...state,
      data: action.payload
    }
  } else {
    return state;

  }
}

export default rootReducer;