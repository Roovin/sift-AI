import Image from 'next/image';
import React from 'react';
import Intro from './FullWidthIntro';

const introDetail = {
	PostNormalText: 'leadership headline lorem at ipsum dolore',
	HighLightedText: 'MARKET ',
	bg: 'black',
	blurb:
		'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper at facilisi.',
};

function FullWidthMedia() {
	return (
		<section className="FullWidthMedia bg-black no-padding-bottom">
			<div className="container">
				<Intro {...introDetail} />
				<div className="img-wrap xl-up:mt-[80px]">
					<Image src="/sifters.png" alt="img" width={1500} height={700} />
				</div>
			</div>
		</section>
	);
}

export default FullWidthMedia;
