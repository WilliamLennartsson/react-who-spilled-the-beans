import {
    FETCH_QUOTES_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
    quotes: [],
    players: [],
    currentQuote: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_QUOTES_SUCCESS:
            return {
                ...state,
                quotes: action.payload,
            }
        default:
            return state
    }
}
