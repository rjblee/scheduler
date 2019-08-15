// import { useReducer, useEffect } from "react";

// import axios from "axios";

// const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";

// function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return { ...state, day: action.day };
//     case SET_APPLICATION_DATA:
//       return { ...state,appointments: action.appointments };
//     case SET_INTERVIEW: {
//       const newDays = state.days.map(element => {
//         if (element.name === state.day) {
//           const subtract = { ...element, spots: element.spots - action.days };
//           return subtract;
//         }
//         return element;
//       });      
//       return {...state, appointments: action.appointments, days: newDays};
//     }

//     default:
//       // throw new Error(
//       //   `Tried to reduce with unsupported action type: ${action.type}`
//       // );
//       {
//         return state
//       }
//   }
// }

// export function useApplicationData() {

//   const [state, dispatch] = useReducer(reducer, {
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: []
//   });

//   const setDay = day => dispatch({ type: SET_DAY, day });

//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers")
//     ])
//       .then((response) => {
//         dispatch(/*(currentState)=>(*/({ days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))//)
//         // currentAppointments = getAppointmentsForDay(state, state.day);
//         // setDays(response.data);
//       })
//   }, [])

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     // dispatch({ ...state, appointments: appointments })
//     dispatch({ type: SET_INTERVIEW, id, interview });
//   }

//   function deleteInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     dispatch({ ...state, appointments: appointments })
//   }

//   return {
//     state,
//     setDay,
//     bookInterview,
//     deleteInterview

//   }

// }



import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY"
const SET_DAYS = "SET_DAYS"
const SET_APPLICATIONS = "SET_APPLICATIONS"
const SET_INTERVIEWERS = "SET_INTERVIEWERS"
const SET_INTERVIEW = "SET_INTERVIEW"
export const INIT_DATA = "INIT_DATA"

export function useApplicationData() {
  const reducer = function(state, action) {

  switch(action.type) {
    case SET_DAY: {
      return {...state, day:action.day}
    } 
    case SET_DAYS: {
      return {...state, days:action.days}
    }
    case SET_APPLICATIONS: {
      return {...state, appointments:action.appointments}
    }
    case SET_INTERVIEWERS: {
      return  {...state, interviewers:action.interviewers}
    }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return {
        ...state,
        appointments
      }
    }
    case INIT_DATA: {
      return {...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers}
    }
    default : {
      return state
    }
  }
}

const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})

const setDay = day => dispatch({ type: SET_DAY, day });

useEffect(() => {
  Promise.all([
    Promise.resolve(axios.get('/api/days')),
    Promise.resolve(axios.get('/api/appointments')),
    Promise.resolve(axios.get('/api/interviewers'))
  ]
  ).then((all) => {
    dispatch({type:"INIT_DATA", days:all[0].data, appointments: all[1].data, interviewers: all[2].data})
  })
}
, [])

for (let stateDay of state.days) {
  const day = stateDay
  let spots = 0;
  for (let appId of day.appointments) {
    if (!state.appointments[appId].interview) {
      spots +=1
    }
  }
  day.spots = spots
}

const bookInterview = function (id, interview) {
  return axios({
    url: `api/appointments/${id}`,
    method: "put",
    data: {
      interview:interview
    }
  }).then(() => {
    
    dispatch({ type: SET_INTERVIEW, id, interview })
    
  })
  }

const deleteInterview = function (id, interview) {
  return axios({
    url: `api/appointments/${id}`,
    method: "delete",
    data: {
    }
  }).then( () => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch({type: SET_APPLICATIONS, appointments:appointments})
   
  });
  }

// const editInterview = function (id, interview) {
//   return axios({
//     url: `api/appointments/${id}`,
//     method: "put",
//     data: {
//       interview:interview
//     }
//   }).then( () => {
//     const appointment = {
//       ...state.appointments[id],
//       interview: interview
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     dispatch({type: SET_APPLICATIONS, appointments:appointments});
//   });
//   }
  return {
    state,
    setDay,
    dispatch,
    bookInterview,
    deleteInterview,
    // editInterview
  }
}