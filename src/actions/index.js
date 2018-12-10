import {
    FETCH_QUOTES,
    FETCH_QUOTES_SUCCESS,
} from './types'

export const fetchQuotes = () => (dispatch) => {
        dispatch({ type: FETCH_QUOTES })

        console.log('Running fetchQuotes')

        const API_KEY_RAPID = '59b44a5303msh83c407f6203c2ffp10467ajsnc4ae2fa612a1'
        const API_URI = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=10'

        // const myHeaders = new Headers()
        // myHeaders.append()

        fetch(API_URI, {
            headers: {
                'X-RapidAPI-Key': API_KEY_RAPID,
            },
        })
        .then(response => response.json())
        .then(result => {
            fetchQuotesSuccess(dispatch, result)
        }) // Returns an array of quote objects  -->  { quote: "", author: ""}
        .catch(err => { console.log('Error fetching data from api', err) })
    }

export const fetchQuotesSuccess = (dispatch, data) => {
    dispatch({
        type: FETCH_QUOTES_SUCCESS,
        payload: data,
    })
}
