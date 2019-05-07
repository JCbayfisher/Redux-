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
const removeExpense = ({ } = {}) => {
    return {

    }
}



// ===================================================

//creating reducer to manage state, we are creating 2 reducer to manage a piece of information each, expensee is gonna be an array with an object(we are simultiing like expenses array is an array coming from an API) , filter is somthing we are managing with a reducer, these 2 reducer have to work together so that we are using combineReducer!


// ==========================================
// this is for expenses Reducer
const expenseReducerDefaultState = []

const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense]
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

const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100 }))
const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 300 }))

store.dispatch(removeExpense({ id: expenseOne.expense.id }))
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