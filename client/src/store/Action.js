import axios from 'axios'
export const GET_DATA= "GET_DATA";


export const fetchData = (genres) => {
    return function (dispatch) {
      axios.get(`/shows/${genres}`).then((payload) => {console.log("=================data===========>",payload)
        dispatch({ type: GET_DATA, payload: payload.data });
      });
    };
  };
