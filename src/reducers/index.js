import { combineReducers } from 'redux'
import { 
	SELECT_ARTIST,
	REQUEST_ARTIST_DATA,
	RECEIVE_ARTIST_DATA
} from '../actions'


const selectedArtist = (state = 'jayz', action) => {
	switch(action.type) {
		case SELECT_ARTIST:
			return action.artist
		default:
			return state
	}
}

const artistData = (state = {
	isFetching: false,
	items: []
}, action) => {
	switch(action.type) {
		case 'REQUEST_ARTIST_DATA':
			return {
				...state, 
				isFetching: true,
			}
		case 'RECEIVE_ARTIST_DATA':
			return {
				...state,
				isFetching: false,
				items: action.artistData,
				lastUpdated: action.receivedAt
			}
		default:
			return state
	}
}

const artistsBySpotify = (state = {}, action) => {
	switch(action.type) {
		case REQUEST_ARTIST_DATA:
		case RECEIVE_ARTIST_DATA:
			return {
				...state,
				[action.artist]: artistData(state[action.artist], action)
			}
		default:
			return state
	}
}

const rootReducer = combineReducers({
	selectedArtist,
	artistsBySpotify,
})

export default rootReducer