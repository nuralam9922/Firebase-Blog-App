import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ImageComponent({ width = 140, height = 40, src }) {
	return (
		<div
			style={{
				width: '100%',
				height: height,
				objectFit: '',
			}}
			className="bg-zinc-500 p-0 overflow-hidden rounded-md"
		>
			<LazyLoadImage
				effect="blur"
				src={src}
				width={width + '%'}
				style={{
					width: '100%',
					height: height,
					objectFit: '',
				}}
				className={` rounded-sm object-top`}
			/>
		</div>
	);
}

export default ImageComponent;
