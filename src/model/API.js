export const getQuotes = (callback) => {
    const API_KEY_RAPID = '59b44a5303msh83c407f6203c2ffp10467ajsnc4ae2fa612a1'
    const API_URI = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=10'
    console.log('API called')

    fetch(API_URI, {
        headers: {
            'X-RapidAPI-Key': API_KEY_RAPID,
        },
    })
    .then(response => response.json())
    .then(result => {
        callback(result) // Returns an array of quote objects  -->  { quote: "", author: ""}
    })
    .catch(err => { console.log('Error fetching data from api', err) })
}

export const a = () => 'tjena'
