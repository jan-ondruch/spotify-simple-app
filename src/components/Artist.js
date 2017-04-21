import React from 'react'

import '../styles/artist.css'

const Artist = ({ artistData }) => (
	<div>
		<div className='artist-genres-wrapper'>

			<div className='artist-info'>
				<h1>
					{artistData.artist}
				</h1>
				<p className='followers'>
					{artistData.followers + ' '}
					Followers
				</p>
				<img 
					className='artist-image'
					alt={artistData.artist} 
					src={artistData.img}>
				</img>
			</div>

			<div className='genres'>
				<h2>Genres</h2>
				{artistData.genres.map((g, i) => <li key={i}>{g}</li>)}
			</div>

		</div>
		
		<div className='albums'>
			<h2>Albums</h2>
			<div className='albums-grid'>
				{artistData.albums.map((album, i) => (
					<div key={i} className='album'>
						<img 
							alt={album.name}
							src={album.img}>
						</img>
						<h3 key={i}>{album.name}</h3>
						<p>By {artistData.artist}</p>
					</div>
				))}
			</div>
		</div>
	</div>
)

export default Artist