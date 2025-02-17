import React from 'react'
import IntroWithCta from './IntroWithCta'
import Image from 'next/image'
import Black_Btn from './button/Button_Black'

const introData = {
    PreNormalText: 'Headline about patents',
    cta: 'VIEW ALL PATENTS',
    link: '/',
    blurb: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam.',
}

const ColTwoCard = () => {
    return (
        <div className='wrapper flex flex-wrap w-[calc(100%+20px)] items-center -ml-[10px] '>
            <div className="col-two w-[calc(55%-20px)] desktop:w-[calc(50%-20px)] lg:w-full lg:mb-[20px] mx-[10px] c-down:w-full c-down:max-w-[500px]">
                <div className="img-wrap pr-[38px] laptop-landscape:max-w-[500px] md:max-w-[500px] pt-[29px] c-down:pt-0">
                    <Image src='/phone-in-handd.png' alt='img' width={700} height={700} quality={75} />
                </div>
            </div>
            <div className="col-two w-[calc(45%-20px)] desktop:w-[calc(50%-20px)] lg:w-full mx-[10px] c-down:w-full c-down:mt-10">
                <div className="content_wrap pl-[43px] lg:pl-0 desktop:pl-0 c-down:pl-0">
                    <h3 className='mb-[24px] lg:mb-15px'>Headline about better science</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae iaculis tortor sit euismod pellentesque consequat egestas. Integer donec felis, sed tempor turpis.</p>
                    <ul className='mt-[16px] mb-[38px] lg:my-15px pl-[28px] list-disc'>
                        <li>Sed ut perspiciatis unde omnis</li>
                        <li>Voluptatem accusantium dolore laudant </li>
                        <li>Totam rem aperiam eaque ipsa tellus</li>
                    </ul>
                    <div className="btn inline-block mr-[15px] tablet:mb-[10px] desktop-mid:mb-[10px]">
                        <Black_Btn link='/' text="IN THE NEWS" />
                    </div>
                    <div className="btn inline-block">
                        <Black_Btn link='/' text="Fraud center" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ImageWithText() {
    return (
			<section className="ImageWithText bg-white" id="patents">
				<div className="container">
					<IntroWithCta {...introData} />
					<ColTwoCard />
				</div>
			</section>
		);
}



export default ImageWithText
