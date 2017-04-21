export const SELECT_ARTIST = 'SELECT_ARTIST'
export const REQUEST_ARTIST_DATA = 'REQUEST_ARTIST_DATA'
export const RECEIVE_ARTIST_DATA = 'RECEIVE_ARTIST_DATA' 

export const selectArtist = artist => ({
  type: SELECT_ARTIST,
  artist
})

export const requestArtistData = artist => ({
  type: REQUEST_ARTIST_DATA,
  artist
})

export const receiveArtistData = (artist, json) => ({
  type: RECEIVE_ARTIST_DATA,
  artist,
  artistData: json,
  receivedAt: Date.now()
})

// Curried function: first get data from the artist json object, then when getting the data
// about albums, the second argument will be provided and all the info from both json objects
// is parsed and returned as a single object.
const setArtistData = artistJson => albumsJson => ({
  artist: artistJson.artists.items[0].name,
  followers: artistJson.artists.items[0].followers.total,
  genres: artistJson.artists.items[0].genres,
  img: artistJson.artists.items[0].images[0].url,
  albums: albumsJson.items.reduce((albums, item) => {
    albums.push({
      name: item.name,
      id: item.id,
      img: item.images[0].url,
    })
    return albums
  }, [])
})

// Curried function.
// First dispatch action to request the artist data, when you do that, fetch the data from the url
// using the fetchAPI: you receive back? a promise - when it's resolved (success), .then is fired
// with the response object we received.
// Calling .json() gets you a promise for the body of the http response that is yet to be loaded.
// So that returns also a promise, which we resolve in the next .then and we dispatch the next action
// to put the new artist data, because we successfully got the json data.
export const fetchArtistData = artist => dispatch => {
  
  // First part of the curried function setArtistData
  let setArtist

  dispatch(requestArtistData(artist))
  return fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
    .then(response => response.json())
    .then(artistJson => {
      // Provide the first argument for the curried function.      
      // Fetch the album data using the 'id' fetched from the first request.
      setArtist = setArtistData(artistJson)
      return fetch(`https://api.spotify.com/v1/artists/${artistJson.artists.items[0].id}/albums`)
    })
    .then(response => response.json())
    .then(albumsJson => setArtist(albumsJson))  // provide the second argument for the curried function
    .then(parsedJson => dispatch(receiveArtistData(artist, parsedJson)))
}