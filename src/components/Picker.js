import React from 'react'

import '../styles/picker.css'

const Picker = (props) => {
	let { value, onChange, options } = props
	return (
		<div className='picker'>
			<select onChange={e => onChange(e.target.value)}
							value={value}>
				{options.map(option =>
					<option key={option} value={option}>
						{option}
					</option>)
				}
			</select>
		</div>
	)
}

export default Picker