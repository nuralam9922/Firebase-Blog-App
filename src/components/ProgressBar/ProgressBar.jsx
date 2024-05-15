import React from 'react'
import './ProgressBar.css';


function ProgressBar() {
  return (
		<div className='w-full mb-10 h-2 sticky top-20'>
			<div className='w-20 h-full bg-blue-400 progress-bar-animated'></div>
		</div>
  );
}

export default ProgressBar