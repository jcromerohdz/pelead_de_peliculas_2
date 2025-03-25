const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '40a83d1b',
            s: searchTerm
        }
    })

    if (response.data.Error){
        return []
    }
    console.log(response.data)
    return response.data.Search
}

//fetchData()

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