import React from 'react'
import Image from 'next/image'
import Black_Btn from './button/Button_Black'

function ContentWithVerticalStats() {
	return (
		<section className="ContentWithVerticalStats bg-white">
			<div className="container">
				<div className="wrapper flex-row-reverse flex flex-wrap w-[calc(100%+20px)] items-center -ml-[10px] md:w-[100%] md:mx-0">
					<div className="col-two w-[calc(50%-20px)] mx-[10px] md:w-[100%] md:mx-0 md:pb-[30px]">
						<div className="card_wrap w-full grid gap-[40px] pl-[76px] md:pl-0">
							<div className="mb-[24px pl-[24px] border-l-[1px] border-black">
								<div className="count">
									<span className="h2 text-[#2E69FF] relative z-10 leading-[0.9!important]">
										5
									</span>
									<span className="heading_44  text-[#2E69FF]  relative z-10">
										x
									</span>
								</div>
								<div className="text_wrap  mt-[10px]">
									<p className="mb-[4px] text-black font-bold">
										Lorem ipsum dolor
									</p>
									<p className="opacity-80 mb-0 text-black small_font tracking-[0em!important]">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor.
									</p>
								</div>
							</div>
							<div className="mb-[24px pl-[24px] border-l-[1px] border-black">
								<div className="count">
									<span className="h2 text-[#2E69FF]  relative z-10 leading-[0.9!important]">
										70
									</span>
									<span className="heading_44  text-[#2E69FF]  relative z-10">
										%
									</span>
								</div>
								<div className="text_wrap  mt-[10px]">
									<p className="mb-[4px] text-black font-bold">
										Commodo ullamcorper
									</p>
									<p className="opacity-80 mb-0 text-black small_font tracking-[0em!important]">
										Neque porro quisquam est, qui dolorem ipsum quia dolor sit
										amet, consectetur, adipisci velit.
									</p>
								</div>
							</div>
							<div className="mb-[24px pl-[24px] border-l-[1px] border-black">
								<div className="count">
									<span className="h2 text-[#2E69FF]  relative z-10 leading-[0.9!important]">
										25
									</span>
									<span className="heading_44  text-[#2E69FF]  relative z-10">
										%
									</span>
								</div>
								<div className="text_wrap  mt-[10px]">
									<p className="mb-[4px] text-black font-bold">
										Feugiat nisl pretium fusce
									</p>
									<p className="opacity-80 mb-0 text-black small_font tracking-[0em!important]">
										Sed quia non numquam eius modi tempora amet set incidunt.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-two w-[calc(50%-20px)] mx-[10px] md:w-[100%] md:mx-0]">
						<div className="content_wrap">
							<h2 className="mb-[16px]">
								Detailed solution headline set lorem
							</h2>
							<p className="mb-[16px]">
								Lorem ipsum dolor sit amet consectetur. Proin gravida pharetra
								est ullamcorper est molestie. Lectus mattis suscipit lorem
								interdum nisl in. Sed ipsum ut neque nunc. Consequat ac tortor
								morbi tellus sed parturient iaculis.
							</p>
							<p>
								Imperdiet nisl nibh pretium ut sit aliquam et netus adipiscing.
								At sollicitudin rhoncus ut adipiscing est. Platea nisl faucibus
								in nunc eget. Tempora amet set incidunt ut labore et dolore
								magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Sollicitudin suspendisse amet, aliquam auctor semper at
								facilisi.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContentWithVerticalStats
