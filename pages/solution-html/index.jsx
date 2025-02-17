import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import BannerThirdLevel from '../../components/BannerThirdLevel';
import Sticky from '../../components/Sticky';
import TabSlider from '../../components/TabSlider';
import TbdTabSlider from '../../components/TbdTabSlider';
import TbdTabSliderTwo from '../../components/TbdTabSliderTwo';
import TabLogo from '../../components/TabLogo';
import ThreeColumnGrid from '../../components/ThreeColumnGrid';
import FooterCta from '../../components/FooterCta';

export default function SolutionPageTemplate() {
	const stickyData = [
		{
			id: '1',
			pageName: 'solutions',
			title: 'By use case',
			url: 'use-case',
		},
		{
			id: '2',
			pageName: 'solutions',
			title: 'By industry',
			url: 'industry',
		},
		{
			id: '3',
			pageName: 'solutions',
			title: 'By role',
			url: 'role',
		},
	];

	const data = [
		{
			introTilte: {
				title: 'By use cases',
				sectionId: 'use-case',
			},
			color: {
				sectionClass: 'statics',
				bgColor: 'bg-darkBlue',
				tabBgColor: 'bg-black',
				cardBgColor: 'bg-black',
				titleColor: 'text-white',
			},
			mainData: [
				{
					id: '1',
					title: 'Use case one',
					mainTitle: 'Use case one lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'download-icon.png',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
				{
					id: '2',
					title: 'Use case two',
					mainTitle: 'Use case two lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'chart-icon.png',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
				{
					id: '3',
					title: 'Use case three',
					mainTitle: 'Use case three lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'chats-fill.png',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
				{
					id: '4',
					title: 'Use case four',
					mainTitle: 'Use case four lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'fill-search.png',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
				{
					id: '5',
					title: 'Use case five',
					mainTitle: 'Use case five lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'website-icon.svg',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
				{
					id: '6',
					title: 'Use case six',
					mainTitle: 'Use case six lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'lightbulb-filament-fill.png',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
				{
					id: '7',
					title: 'Use case seven',
					mainTitle: 'Use case seven lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'lightbulb-filament-fill.png',
					countNumber: '5',
					suffix: 'x',
					subTitle: 'Lorem ipsum dolor ',
					subDescription:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
					countNumberTwo: '70',
					percentage: '%',
					subTitleTwo: 'Commodo ullamcorper',
					subDescriptionTwo:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
				},
			],
		},
	];

	const dataTwo = [
		{
			introTilte: {
				title: 'By industry',
				id: 'two',
				sectionId: 'industry',
			},
			color: {
				sectionClass: 'overview',
				bgColor: 'bg-skyblue',
				tabBgColor: 'bg-white',
				cardBgColor: 'bg-white',
				titleColor: 'text-black',
			},
			mainData: [
				{
					id: '11',
					title: 'Industry one',
					mainTitle: 'Industry one lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'laptop-fill.svg',
					bigImage: 'hand-with-mobile.png',
				},
				{
					id: '12',
					title: 'Industry two',
					mainTitle: 'Industry two lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'handbag-fill.svg',
					bigImage: 'hand-with-mobile.png',
				},
				{
					id: '13',
					title: 'Industry three',
					mainTitle: 'Industry three lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'brandy-fill.svg',
					bigImage: 'hand-with-mobile.png',
				},
				{
					id: '14',
					title: 'Industry four',
					mainTitle: 'Industry four lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'buildings-fill.svg',
					bigImage: 'hand-with-mobile.png',
				},
				{
					id: '15',
					title: 'Industry five',
					mainTitle: 'Industry five lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'car-fill-blue.svg',
					bigImage: 'hand-with-mobile.png',
				},
				{
					id: '16',
					title: 'Industry six',
					mainTitle: 'Industry six lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'browsers-fill.svg',
					bigImage: 'hand-with-mobile.png',
				},
				{
					id: '17',
					title: 'Industry seven',
					mainTitle: 'Industry seven lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'browsers-fill.svg',
					bigImage: 'hand-with-mobile.png',
				},
			],
		},
	];

	const dataThree = [
		{
			introTilte: {
				title: 'By Role',
				id: 'three',
				sectionId: 'role',
			},
			color: {
				sectionClass: 'imageWithBorder',
				bgColor: 'bg-darkBlue',
				tabBgColor: 'bg-black',
				cardBgColor: 'bg-black',
				titleColor: 'text-white',
			},
			mainData: [
				{
					id: '1',
					title: 'Role one',
					mainTitle: 'Role one lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'user-circle-fill.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '2',
					title: 'Role two',
					mainTitle: 'Role two lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'bag-simple-fill.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '3',
					title: 'Role three',
					mainTitle: 'Role three lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'bank-fill.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '4',
					title: 'Role four',
					mainTitle: 'Role four lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'car-fill-color.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '5',
					title: 'Role one',
					mainTitle: 'Role one lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'user-circle-fill.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '6',
					title: 'Role two',
					mainTitle: 'Role two lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'bag-simple-fill.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '7',
					title: 'Role three',
					mainTitle: 'Role three lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'bank-fill.svg',
					bigImage: 'gift-with-girl.png',
				},
				{
					id: '8',
					title: 'Role four',
					mainTitle: 'Role four lorem ipsum dolor',
					description:
						'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper. Lorem ipsum dolor sit amet, consectetur consectetur adipiscing.',
					btn: 'learn more',
					link: '#',
					icon: 'car-fill-color.svg',
					bigImage: 'gift-with-girl.png',
				},
			],
		},
	];

	return (
		<Layout>
			<BannerThirdLevel />
			<Sticky data={stickyData} />
			<TabSlider data={data} id="one" />
			<TabSlider data={dataTwo} id="two" />
			{/* <TbdTabSlider/> */}
			{/* <TbdTabSliderTwo /> */}
			<TabSlider data={dataThree} id="three" />
			<TabLogo />
			<ThreeColumnGrid />
			<FooterCta />
		</Layout>
	);
}
