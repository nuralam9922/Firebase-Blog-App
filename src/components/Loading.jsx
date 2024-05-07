import React from 'react'
import loadingGif from '../assets/loading/loading.gif'
function Loading() {
  return (
		<div className="flex items-center justify-center min-h-screen w-full">
			<img src={loadingGif} alt="" />
		</div>
  );
}

export default Loading