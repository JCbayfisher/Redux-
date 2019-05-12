import { createStore, combineReducers } from 'redux';
import uuid from "uuid/v1"

//ADD_EXPENSE
// creating our action generator first
// we are using destructoring in arguments
const addExpense = ({ description = "", note = "", amount = "", createdAt = 0 } = {}) => {
    return {
        type: "ADD_EXPENSE",
        expense: {
            id: uuid(),
            description: description,
            note: note,
            amount: amount,
            createdAt: createdAt
        }

    }
}

//another action generator for Removing an expense
const removeExpense = ({ id } = {}) => {
    return {
        type: "REMOVE_EXPENSE",
        id: id
    }
}

//EDIT EXPENSE GENERATOR
const editExpense = (id, amount) => {
    return {
        type: "EDIT_EXPENSE",
        id: id,
        amount: amount
    }
}

//change text action generator in Filter reducer
const setTextFilter = (text = "") => {
    return {
        type: "SET_TEXT",
        text: text
    }
}

//action generator for sortBy (amount or date)
const sortByAmount = () => {
    return {
        type: "SORT_BY_AMOUNT",
    }
}

const sortByDate = () => {
    return {
        type: "SORT_BY_DATE",
    }
}

//action generator for setStartDate
const setStartDate = (startDate) => {
    return {
        type: "SET_START_DATE",
        startDate: startDate
    }
}

const setEndDate = (endDate) => {
    return {
        type: "SET_END_DATE",
        endDate: endDate
    }
}

//creating reducer to manage state, we are creating 2 reducer to manage a piece of information each, expensee is gonna be an array with an object(we are simultiing like expenses array is an array coming from an API) , filter is somthing we are managing with a reducer, these 2 reducer have to work together so that we are using combineReducer!


// ==========================================
// this is for expenses Reducer
const expenseReducerDefaultState = []

const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense]
        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => id !== action.id)
        case "EDIT_EXPENSE":
            return state.map(expense => expense.id === action.id ? { ...expense, ...action.amount } : expense)
        default:
            return state
    }
}

// ==========================================
// this is for filter Reducer

const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT":
            return { ...state, text: action.text }
        case "SORT_BY_AMOUNT":
            return { ...state, sortBy: "amount" }
        case "SORT_BY_DATE":
            return { ...state, sortBy: "date" }
        case "SET_START_DATE":
            return { ...state, startDate: action.startDate }
        case "SET_END_DATE":
            return { ...state, endDate: action.endDate }
        default:
            return state
    }
}
// ============================================
//creating our Store with createStore function
//combineReducer fucntion takes an Object!

const store = createStore(combineReducers({
    expenses: expenseReducer,
    filters: filtersReducer
}))


store.subscribe(() => {
    console.log(store.getState())
})

// =====================================================================
//DISPATCHES

// const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100 }))
// const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 300 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// //editing something ,change in my new copy of state
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// //changing text in in new copy of state
// store.dispatch(setTextFilter("rent"))
// store.dispatch(setTextFilter())

// //sortBy amount and date dispatchers
// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())


//dispatch by setStartDate and setEndDate
store.dispatch(setStartDate(125))
store.dispatch(setStartDate())
store.dispatch(setEndDate(1250))
// ==============================

const demoState = {
    expenses: [{
        id: "",
        description: "January Rent",
        note: "this is the final payment for that address",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: "amount", // date or amount
        startDate: undefined,
        endDate: undefined
    }
}

