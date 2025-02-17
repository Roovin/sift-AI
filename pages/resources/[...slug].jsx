import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {GET_RESOURCE_DETAIL_POST} from '../../graphql/resourcesDetailPages';
import NonGated from './nongated-resource';
import GatedResource from './gated-resources';
import Loader from '../../components/integrated-section/Loader';
import Custom404 from '../404';
import EventDetail from '../events/event-template/EventDetail';
import CaseStudy from './case-study';
import UniversitySinglePage from './university';
const inter = Inter({
	subsets: ['latin'],
	weight: ['700'],
});
export default function Index() {
	const contentTypes = Object.freeze({
		ANALYST_REPORT: 'ANALYST_REPORT',
		DEMOS: 'DEMOS',
		EBOOK: 'EBOOK',
		INFOGRAPHIC: 'INFOGRAPHIC',
		ONEPAGER: 'ONEPAGER',
		PODCAST: 'PODCAST',
		VIDEO: 'VIDEO',
		WEBINAR: 'WEBINAR',
		EVENT: 'EVENT',
		CASE_STUDIES: 'CASE_STUDIES',
		UNIVERSITY : 'UNIVERSITY'
	});

	const router = useRouter();
	const [typeSlug, setTypeSlug] = useState();
	let uri = router.query.slug || [];
	function typeName(val) {
		var type = "";
		switch( val ) {
		  	case "videos":
				type = contentTypes.VIDEO;
				break;
			case "analyst-reports":
				type = contentTypes.ANALYST_REPORT;
			break;
			case "demos":
				type = contentTypes.DEMOS;
				break;
			case "ebooks":
				type = contentTypes.EBOOK;
				break;
			case "inforgraphics":
				type = contentTypes.INFOGRAPHIC;
				break;	
			case "onepagers":
				type = contentTypes.ONEPAGER;
				break;	
			case "podcasts":
				type = contentTypes.PODCAST;
				break;	
			case "webinars":
				type = contentTypes.WEBINAR;
				break;
			case "trust-and-safety-university":
				type = contentTypes.UNIVERSITY;
				break;				
		  default:
			type = contentTypes;
		}
		return type;
	}
	const postObj = useQuery(GET_RESOURCE_DETAIL_POST, {
		variables: { typeSlug: typeName(uri[0]), path: uri[0]=="trust-and-safety-university"?uri[2]:uri[1]},
	});

	let postData = [];
	if (postObj) {
		postData = postObj?.data?.contentNodes?.nodes[0]; 
  	}

	if (postObj.loading) return <div className="detail-loader bg-white h-full w-full fixed left-0 right-0 z-[99]"><Loader/></div>;
	if (postObj.error) return <p className='pt-[100px] text-center'>Error: something went wrong please wait or try again</p>;

	  // Check if it's a 404 page
	  if (router.isFallback || router.is404 || !postObj.data) {
		return <Custom404 />;
	  }
	return (
		<>
			<span className='hidden' id="marketo-program-id" data-marketo-id={ postData?.__typename == "Event" ? postData?.eventbuilder?.marketoProgramId : postData?.resourcebuilder?.marketoProgramId}></span>
			{/* <span className='hidden' id="marketo-program-id" data-marketo-id={`${postData?.resourcebuilder?.marketoProgramId}`}></span> */}
			{ postData?.webinarPage?.others?.gatedAsset 
			|| postData?.videoPage?.gatedAsset 
			|| postData?.demoPage?.gatedAsset 
			|| postData?.onepager?.gatedAsset 
			|| postData?.ebook?.gatedAsset 
			|| postData?.analystReportDetails?.gatedAsset
			|| postData?.podcast?.gatedAsset
			|| postData?.infographic?.gatedAsset 
			? 
			<GatedResource data={postData}/>
			: postData?.__typename == 'CaseStudy'
			? <CaseStudy data={postObj}/>
			: postData?.__typename == 'University'
			? <UniversitySinglePage />
			: <NonGated data={postData}/>
			}
		</>
		
	);
}
