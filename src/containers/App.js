import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectArtist, fetchArtistData } from '../actions'
import Picker from '../components/Picker'
import Artist from '../components/Artist'

import '../styles/app.css'

class App extends Component {
	componentDidMount() {
		const { dispatch, selectedArtist } = this.props

		dispatch(fetchArtistData(selectedArtist))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedArtist !== this.props.selectedArtist) {
			const { dispatch, selectedArtist } = nextProps
			dispatch(fetchArtistData(selectedArtist))
		}
	}

	handleChange = nextArtist => {
		this.props.dispatch(selectArtist(nextArtist))
	}

	render() {
		const { selectedArtist, artistData, isFetching, lastUpdated } = this.props
		let isEmpty = artistData.length === 0
		return (
			<div className='app-wrapper'>
				<div className='header'>
					<h3>Spotify Simple App</h3>
					<p>Made with React, Redux & Spotify API.</p>
				</div>
				<div className='picker-wrapper'>
					<Picker value={selectedArtist}
									onChange={this.handleChange}
									options={['jayz', 'zara-larsson', 'cechomor', 'kasabian', 'nicky-jam']}
					/>
				</div>
				<div className='artist-wrapper'>
					{isEmpty
					  ? (isFetching ? <h4>Loading...</h4> : <h4>Empty.</h4>)
					  : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
					      <Artist artistData={artistData} />
					    </div>
					}
				</div>
				<div className='last-updated'>
					{
						lastUpdated && 
						<span>
					  	Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
					  	{' '}
					  </span>
					}
				</div>
			</div>
		)
	}
}

// Take out the data from state (store) and pass them as props to App.
const mapStateToProps = (state) => {
	const { selectedArtist, artistsBySpotify} = state
	const { 
		isFetching,
		lastUpdated,
		items: artistData
	} = artistsBySpotify[selectedArtist] || {
		isFetching: true,
		items: []
	}

	return {
		selectedArtist,
		artistData,
		isFetching,
		lastUpdated
	}
}

export default connect(mapStateToProps)(App)