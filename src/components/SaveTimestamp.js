import React from 'react'

const SaveTimestamp = props => {
	// It should be getting income state, and expenses array.
	const setTimeStamp = props.setTimeStamp;

	return (
		
		<div className='SaveTimestamp'>
			<button onClick={ () => setTimeStamp() }>Save timestamp</button>
		</div>
	)
}

export default SaveTimestamp