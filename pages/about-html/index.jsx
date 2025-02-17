import React from 'react'
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout'
import BannerSecondLevel from '../../components/BannerSecondLevel'
import Sticky from '../../components/Sticky';
import FullWidthMedia from '../../components/FullWidthMedia'
import ContentBlocks from '../../components/ContentBlocks'
import IconContentBlock from '../../components/IconContentBlock'
import TimelineSlider from '../../components/TimelineSlider'
import LeadershipCard from '../../components/LeadershipCard'
import Logos from '../../components/TbdAboutLogos'
import AwardCards from '../../components/AwardCards'
import ThreeColumnGrid from '../../components/ThreeColumnGrid'
import BorderImageWithText from '../../components/BorderImageWithText'
import FooterCta from '../../components/FooterCta'


export default function About() {
  const stickyData = [
		{
			id: '1',
			pageName: 'about-us',
			title: 'About us',
			url: 'about-us',
		},
		{
			id: '2',
			pageName: 'about-us',
			title: 'Our History',
			url: 'our-history',
		},
		{
			id: '3',
			pageName: 'about-us',
			title: 'Leadership',
			url: 'leadership',
		},
		{
			id: '4',
			pageName: 'about-us',
			title: 'Awards',
			url: 'awards',
		},
		{
			id: '5',
			pageName: 'about-us',
			title: 'Careers',
			url: 'careers',
		}
	];
	const FullWidthMediaBg = `skyblue`
	const FullWidthMediaIntro = {
		normalText: 'Market leadership headline lorem at ipsum dolore',
		bg: 'white',
		link: '/',
		cta: 'Watch the video',
		blurb:
			'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora amet set incidunt ut labore et dolore magnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin suspendisse amet, aliquam auctor semper at facilisi.',
	};
  return (
    <Layout>
        <NextSeo title="About - Sift" description="Sift - About" />
        <BannerSecondLevel/>
        <Sticky data={stickyData}/>
        <FullWidthMedia intro={FullWidthMediaIntro} bg={FullWidthMediaBg}/>
        <ContentBlocks/>
        <IconContentBlock/>
        <TimelineSlider/>
        <LeadershipCard/>
        <Logos/>
        <AwardCards/>
        <BorderImageWithText/>
        <ThreeColumnGrid/>
        <FooterCta/>
    </Layout>
  )
}
