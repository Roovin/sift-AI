import React from "react"
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout'
import BannerWithParallax from "../../components/BannerWithParallax"
import FullWidthMedia from "../../components/FullWidthMedia"
import PatentTable from "../../components/PatentTable"
import Trademarks from "../../components/Trademarks"
export default function Patents() {
 
  const FullWidthMediaBg = `white`
  const FullWidthMediaIntro = {
		PreNormalText: 'Lorem ipsum dolor sit amet',
		bg: 'white',
		blurb:
			'Lorem ipsum dolor sit amet consectetur. Varius dictum in eget sem cursus adipiscing condimentum mattis. Nulla eget tincidunt euismod lorem egestas. Iaculis rhoncus tempus dictum bibendum aliquam tristique lectus nullam. Mauris cras magna fringilla nisi. Aliquet feugiat quis a vulputate pharetra mi condimentum. Id mattis integer nisl turpis elementum lacus sed metus nullam.',
	};
    return (
      <Layout>
        <NextSeo title="Patents - Sift" description="Sift - Patents" />
        <BannerWithParallax/>
        <FullWidthMedia intro={FullWidthMediaIntro} bg={FullWidthMediaBg}/>
        <PatentTable/>
        <Trademarks/>
      </Layout>
    )
  }