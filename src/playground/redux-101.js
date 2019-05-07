import { createStore } from 'redux';


//creating action generators
const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy: incrementBy
  }
}

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: "DECREMENT",
    decrementBy: decrementBy

  }
}

const setCount = ({ count }) => {
  return {
    type: "SET",
    count: count
  }
}

const resetCount = () => {
  return {
    type: "RESET",
  }
}

//creating my first Reducer!!!
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy }
    case "RESET":
      return { count: 0 }
    case "DECREMENT":
      return { count: state.count - action.decrementBy }
    case "SET":
      return { count: action.count }
    default:
      return state
  }
}

const store = createStore(countReducer);

// callback inside .subcribe function is called everytime something change in the store, then .subcribe return another funtion that is used to unsubscribe
const unsubcribe = store.subscribe(() => {
  console.log(store.getState())
})

// console.log(unsubcribe)
// dispatch send the action to the store and make run it 
// store.dispatch({
//   type: "INCREMENT",
//   incrementBy: 5
// })
store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 101 }))


