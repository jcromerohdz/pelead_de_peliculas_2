// const fetchData = async (searchTerm) => {
//     const response = await axios.get('http://www.omdbapi.com/', {
//         params: {
//             apikey: '40a83d1b',
//             s: searchTerm
//         }
//     })

//     if (response.data.Error){
//         return []
//     }
//     console.log(response.data)
//     console.log(response.data)
//     return response.data.Search
// }

//fetchData()

autoCompleteConfig = {
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
        return`
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `
    },
    inputValue(movie){
        return movie.Title
    },
    async fetchData(searchTerm) {
        apiMovieURL = 'http://www.omdapi.com/'
        const response = await axios.get(apiMovieURL, {
            params: {
                apikey: '40a83d1b',
                s: searchTerm
            }
        })
        if(response.data.Error){
            return []
        }

        console.log(response.data)
        return response.data.Search
    }
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
    }
})

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right')
    }
})

//Crear dos variables para leftMovie y rightMovie
let leftMovie
let rightMovie

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '40a83d1b',
            i: movie.imdbID
        }
    })
    console.log(response.data)
    summaryElement.innerHTML = movieTemplate(response.data)

    // Preguntamos cual lado es?
    if(side === 'left'){
        leftMovie = response.data   
    }else{
        rightMovie = response.data
    }

    // Preguntamos si temos ambos lados
    if(leftMovie && rightMovie){
        // Entonces ejecutamos la funcion de comparacion
        runComparison()
    }
}

const runComparison = () => {
    console.log('Comparacion de peliculas')
    const leftSideStats = document.querySelectorAll('#left-summary .notification')
    const rightSideStats = document.querySelectorAll('#right-summary .notification')

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index]
        const leftSideValue = parseInt(leftStat.dataset.value)
        const rightSideValue = parseInt(rightStat.dataset.value)

        if(rightSideValue > leftSideValue){
            leftStat.classList.remove('is-primary')
            leftStat.classList.add('is-danger')
        }else{
            rightStat.classList.remove('is-primary')
            rightStat.classList.add('is-danger')
        }

    })


}

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Busqueda de peliculas</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`
const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const debounce = (func, delay=1000) => {
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const onIput = async event => {
    const movies = await fetchData(event.target.value)
    console.log("Movies: ", movies)
    if(!movies.length){
        dropdown.classList.remove('is-active')
        return
    }
    resultsWrapper.innerHTML = ''
    dropdown.classList.add('is-active')
    for(let movie of movies){
        const option = document.createElement('a')
         const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster
    }
}