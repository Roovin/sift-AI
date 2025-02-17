import React from 'react';
import IntroWithCta from './IntroWithCta';
import Image from 'next/image';
export default function IconContentBlock() {
	const intro = {
		PreNormalText: 'Headline',
		HighLightedText: 'about',
		normalText: 'our values',
		bg: 'black',
		link: '/',
		cta: 'Careers',
        cta2: 'Media Kit',
		blurb:'Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
	};
    const cards = [
        {
            logo:"/logos/circle-wavy-check-fill.svg",
            title: "Lorem Ipsum Dolor",
            blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            logo:"/logos/chart-line-up-fill.svg",
            title: "Lorem Ipsum Dolor",
            blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            logo:"/logos/currency-circle-dollar-fill.svg",
            title: "Lorem Ipsum Dolor",
            blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            logo:"/logos/file-arrow-down-fill.svg",
            title: "Lorem Ipsum Dolor",
            blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            logo:"/logos/globe-fill.svg",
            title: "Lorem Ipsum Dolor",
            blurb: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
    ]
	return (
		<section className='IconContentBlock bg-black md:pb-0 pb-0 overflow-hidden' id="about-us">
            <div className="container">
            <IntroWithCta {...intro}/>
                <div className="colthreeWrap flex flex-wrap w-[calc(100%+48px)] tablet:w-[calc(100%+30px)] -ml-[24px] tablet:-ml-[15px] laptop-landscape:mt-0 mt-[60px] wide-screen:mt-[80px] xl:mt-0 lg:mt-0 md:w-full md:mx-0">
                {cards.map((data , index) => (
                    <div key={index} className={`colThree w-[calc(33.33%-48px)] text-white mx-[24px] pt-[16px] lg:pt-0 laptop-landscape:pt-[0] rounded-[20px] mb-[24px] tablet:mx-[15px] tablet:w-[calc(50%-30px)] md:w-full md:mx-0`}>
                        <div className="imgWrap mb-[8px]">
                            <Image width={40} height={40} src={data.logo} alt='logo'/>
                        </div>
                        <h4 className='mb-[16px]'>{data.title}</h4>
                        <p>{data.blurb}</p>
                    </div>
                ))}
            </div>
            </div>
		</section>
	);
}