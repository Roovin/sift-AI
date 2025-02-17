import React from 'react';
import Intro from '../../components/FullWidthIntro';
import Image from 'next/image';
export default function LogoContentBlock() {
	const intro = {
		PreNormalText: 'Headline about product capabilities',
		bg: 'white',
		blurb:
			'Lorem ipsum dolor sit amet consectetur. Proin gravida pharetra est ullamcorper est molestie. Lectus mattis suscipit lorem interdum nisl in. Sed ipsum ut neque nunc. Consequat ac tortor morbi tellus sed parturient iaculis. Imperdiet nisl nibh pretium ut sit aliquam et netus adipiscing. At sollicitudin rhoncus ut adipiscing est. Platea nisl faucibus in nunc eget.',
	};
	const cards = [
		{
			logo: '/circle-wavy.svg',
			title: 'Lorem Ipsum Dolor',
			blurb:
				'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
		},
		{
			logo: '/circle-wavy.svg',
			title: 'Lorem Ipsum Dolor',
			blurb:
				'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
		},
		{
			logo: '/circle-wavy.svg',
			title: 'Lorem Ipsum Dolor',
			blurb:
				'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
		},
		{
			logo: '/circle-wavy.svg',
			title: 'Lorem Ipsum Dolor',
			blurb:
				'Lorem ipsum dolor sit amet consectetur. Ornare turpis sed nulla sit. Posuere purus viverra nec fermentum tempor fames facilisis euismod. Porta praesent ultrices.',
		},
		{
			logo: '/circle-wavy.svg',
			title: 'Lorem ipsum dolor sit amet consectetur. Aliquam donec felis.',
			blurb:
				'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
		},
		{
			logo: '/circle-wavy.svg',
			title: 'Lorem Ipsum Dolor',
			blurb:
				'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
		},
	];
	return (
		<section
			className="LogoContentBlock bg-white overflow-hidden"
			id="capabilities"
		>
			<div className="container">
				<Intro {...intro} />
				<div className="colthreeWrap flex flex-wrap w-[calc(100%+48px)] tablet:w-[calc(100%+30px)] -ml-[24px] tablet:-ml-[15px] laptop-landscape:mt-0 mt-[60px] wide-screen:mt-[80px] xl:mt-0 lg:mt-0 md:w-full md:mx-0">
					{cards.map((data, index) => (
						<div
							key={index}
							className={`colThree w-[calc(33.33%-48px)] text-white mx-[24px] pt-[16px] lg:pt-0 laptop-landscape:pt-[0] rounded-[20px] mb-[24px] tablet:mx-[15px] tablet:w-[calc(50%-30px)] md:w-full md:mx-0`}
						>
							<div className="imgWrap mb-[8px]">
								<Image width={40} height={40} src={data.logo} alt="logo" />
							</div>
							<h4 className="mb-[16px]">{data.title}</h4>
							<p>{data.blurb}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
