import React from 'react';
import FullWidthIntro from '../../components/FullWidthIntro';

const intro = {
	PreNormalText: 'Headline about our mission ',
	blurb:
		'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper at facilisi.',
	bg: 'black',
};
export default function ContentBlocks() {
	const cards = [
		{
			title: 'Lorem Ipsum Dolor Sit Amet Cosectur Risus Egestas',
			blurb:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis nibh iaculis venenatis. Arcu sit nunc pretium, fermentum euismod libero nuncadfnk. ',
		},
		{
			title: 'Lorem Ipsum Dolor Sit Amet Cosectur Risus Egestas',
			blurb:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis nibh iaculis venenatis. Arcu sit nunc pretium, fermentum euismod libero nuncadfnk. ',
		},
		{
			title: 'Lorem Ipsum Dolor Sit Amet Cosectur Risus Egestas',
			blurb:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis nibh iaculis venenatis. Arcu sit nunc pretium, fermentum euismod libero nuncadfnk. ',
		},
	];
	return (
		<section className="bg-black ContentBlocks " id="our-mission">
			<div className="container">
				<FullWidthIntro {...intro} />
				<div className="colthreeWrap flex flex-wrap w-[calc(100%+25px)] ml-[-12.5px] ">
					{cards.map((data, index) => (
						<div
							key={index}
							className={` colThree w-[calc(33.33%-25px)] mx-[12.5px] border-t-[1px] border-[#fff] pt-[16px] tablet:w-[calc(50%-25px)] lg:mb-[24px]  md:w-[calc(100%-25px)]`}
						>
							<h4 className="mb-[24px]">{data.title}</h4>
							<p className="xxl:text-[16px]">{data.blurb}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
