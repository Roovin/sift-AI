import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import Btn_Pink from '../../components/button/Button_Pink';
import Link from 'next/link';
import styles from './index.module.css';
import ThreeColumnGrid from '../../components/ThreeColumnGrid';
import FileViewer from '../../pages/pdf-viewer/components/Viewer';
import Stats from '../../pages/resources/sections/Statics';
import AwardCards from '../resources/sections/AwardCards';

export default function Index() {
	const bgColor = `bg-darkBlue`;
	return (
		<Layout>
			<div className={`resourceDatailIntro banner bg-white pt-[100px] pb-[64px] lg:pb-[40px] ${styles.resourceDatailIntro}`}>
				<div className="container">
					<h1>
						Sift named a <span> Leader </span>  in 2023 Forrester Wave™ for Digital Fraud
						Management
					</h1>
				</div>
			</div>
			<section className={`NonGatedResource bg-[#fff] resourceDetail pt-0 ${styles.resourceDetail} overflow-x-clip`}>
				<div className="container">
					<div>
						<div className="w-[499px] xxl-up:w-[50%] pr-[60px] laptop:w-[48%] xl:w-[100%] xl:mt-[30px]">
							<p>
								Lorem ipsum dolor sit amet consectetur. Proin gravida pharetra
								est ullamcorper est molestie. Lectus mattis suscipit lorem
								interdum nisl in.
							</p>
							<Image
								src="/resources/monitor-image.png"
								width={500}
								height={454}
								alt="Image"
							/>
							<div className={`contentWithList p-0 ${styles.contentWithList}`}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
									in reprehenderit in voluptate velit esse cillum dolore eu fugiat
									nulla pariatur. Excepteur sint occaecat cupidatat non proident,
									sunt in culpa qui officia anim id est laborum.
								</p>
								<ul>
									<li>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
											do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										</p>
									</li>
									<li>
										<p>
											Ut enim ad minim veniam, quis nostrud exercitation ullamco
											laboris nisi ut aliquip ex ea commodo consequat.
										</p>
									</li>
									<li>
										<p>
											Duis aute irure dolor in reprehenderit in voluptate velit esse
											cillum dolore eu fugiat nulla pariatur.
										</p>
									</li>
								</ul>
							</div>
							<Stats />
							<AwardCards />
							{/* <div className={`logos p-0 ${styles.logos}`}>
								<h3>
									<span>
										#1
									</span>{' '}
									Leader in Digital Trust and Safety
								</h3>
								<div>
									{logos.map((item, i) => {
										return (
											<Link
												href="/"
												key={i}
											>
												<Image
													src={item.img}
													alt="image"
													width={100}
													height={134}
												/>
											</Link>
										);
									})}
								</div>
								<Btn_Pink text='Download Now' link="/" />
							</div> */}
						</div>

						<div className="sticky top-[120px] right-0 xxl-up:w-[50%] laptop:w-[48%] desktop:p-[40px] xl:relative xl:w-[100%] xl:order-[-1] xl:top-0 xl:p-[0!important]">
							<div className={`boxWrap py-[64px] pl-[80px] pr-[30px] ${bgColor} w-[100%] text-white right-0  xl:p-[30px]  ${styles.boxWrap}`}>
								<h3 className='!text-white'>Overview ipsum dolor sit amet consectetur</h3>
								<p className='!text-white'>Lorem ipsum dolor sit amet consectetur. Proin gravida pharetra est ullamcorper est molestie. Lectus mattis suscipit lorem interdum nisl in. Sed ipsum ut neque nunc. Consequat ac tortor morbi tellus sed parturient iaculis. Imperdiet nisl nibh pretium ut sit aliquam et netus adipiscing. At sollicitudin rhoncus ut adipiscing est. Platea nisl faucibus in nunc eget.</p>
								<div className={`${bgColor == 'bg-black' ? 'text-white' : ' text-black'}`}>
									<Btn_Pink text='Download Now' link="/" />

								</div>
							</div>
						</div>

					</div>
				</div>
			</section>
			<FileViewer pdfUrl="/one-pager-marketplaces.pdf"/>
			<ThreeColumnGrid />
		</Layout>
	);
}
