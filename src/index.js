import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'


// Explicitly change url and redirect it to the spotify login.
// For production redict use localhost as callback, for production the website url.
if (process.env.NODE_ENV !== 'production') {
  if (window.location.href.match(/localhost:3000\/$/)) {
		window.location.replace("https://accounts.spotify.com/authorize?client_id=60734ff534f246d9b9f138e42ba4950c&redirect_uri=http:%2F%2Flocalhost%3A%33%30%30%30&response_type=token&state=123")
	}
}
else {
	if (window.location.href.match(/simple-spotify.surge.sh\/$/)) {
		window.location.replace("https://accounts.spotify.com/authorize?client_id=60734ff534f246d9b9f138e42ba4950c&redirect_uri=http:%2F%2Fsimple-spotify.surge.sh&response_type=token&state=123")
	}
}


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

let store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)