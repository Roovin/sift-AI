import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { Inter } from 'next/font/google';
import Btn_pink from '../../components/button/Button_Pink'
// import Btn_Pink from '../button/Button_Pink';
import Layout from '../../components/Layout';
import FooterCtaWithSlider from '../../components/FooterCtaWithSlider';
import TbdContentWithCtaTwo from '../../components/TbdContentWithCtaTwo';
import BlogDetailStyle from '../../styles/blog/blogDetail.module.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})



function BlogDetail() {

  const [isHeight, setHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(true);
  const [ribbonHeight, setRibbonHeight] = useState(0);
  const [abc, setAbc] = useState(0);
  const [winWidth, isWinWidth] = useState(0);
  const [isFocus, setEleFocus] = useState(false);
  const [drpList, isSelectList] = useState('United states');
  const [isInputBox, setInputValue] = useState('');

  //Blog Filter router
  const router = useRouter()

  useEffect(() => {
    let lastScrollTop = 0;

    const handleNavScroll = () => {
      const currentScrollTop = window.scrollY;
      const isScrolledDown = currentScrollTop < lastScrollTop;

      setIsScrolled(isScrolledDown);
      lastScrollTop = currentScrollTop;
    };

    setTimeout(() => {
      window.addEventListener('scroll', handleNavScroll);
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleNavScroll);
    };

  }, []);

  useEffect(() => {
    // isWinWidth(window.innerWidth);
    const handleResize = () => {
      isWinWidth(window.innerWidth);

    }

    window.addEventListener('resize', handleResize);
    // Initial call to set window size
    handleResize();

  })

  useEffect(() => {
    const ribbonElement = document.getElementById('previewRibbon');
    if (ribbonElement) {
      //get ribbon height
      setRibbonHeight(document.getElementById('previewRibbon').clientHeight);
      setAbc(document.getElementById('previewRibbon'));
    }

    //get Header Height
    const headerElement = document.getElementById('header'); // Replace with your actual header ID

    if (headerElement) {
      const headerHeight = headerElement.clientHeight;
      setHeight(headerHeight);
    }
  })


  // const authorHandler = (val) => {
  //   console.log(val);
  //   router.push({
  //     ...router,
  //       query: {author: val}
  //   })
  // }

  const height = {
    top: `${isHeight + ribbonHeight}px`,
  };

  const selectDrop = (val, drpSelectValue) => {
    // console.log(drpSelectValue)

    if (val === true) {
      setEleFocus(true);
      isSelectList(drpSelectValue)

    }
  }
  useEffect(() => {
    var sectionId = document.getElementById('blogDetail');
    if (sectionId) {
      sectionId.addEventListener('click', function () {
        setEleFocus(false);
      })
    }

  })

  const listUpdate = (listValue) => {
    isSelectList(listValue);
  }

  const inputText = (inputVaue) => {
    // console.log(inputVaue);
    setInputValue(inputVaue);
  }


  const topicsData = [
    {
      "id": "1",
      "topic": "topic1"
    },
    {
      "id": "2",
      "topic": "topic2"
    },
    {
      "id": "3",
      "topic": "topic3"
    }, {
      "id": "4",
      "topic": "topic4"
    }
  ];

  const cardData = [
    {
      "id": "1",
      "title": "account fraud",
      "description": "Lorem ipsum dolor sit amet consectetur. Tortor sagittis sed vitae mauris habitant..."
    },
    {
      "id": "2",
      "title": "payment fraud",
      "description": "Ultrices mauris habitant egestas ac ipsum dolor sit amet consect"
    },
    {
      "id": "3",
      "title": "chargebacks",
      "description": "Lorem ipsum dolor sit amet consectetur. Tortor sagittis sed in vitae"
    },
  ]

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      className='sm:w-[10px]'
    >
      <path
        d="M13.6871 1.80909C14.1044 1.39531 14.1042 0.724429 13.6871 0.310796C13.2696 -0.103121 12.5931 -0.103121 12.1756 0.310937L8.06914 4.3823L8.068 4.38159C6.98501 5.30805 6.98501 5.30805 6.98501 5.30805C6.98501 5.30805 6.98501 5.30805 5.93063 4.38173L5.93177 4.38286L1.82446 0.310515C1.4071 -0.103261 0.730267 -0.103261 0.313052 0.310515C0.104445 0.517473 -3.15222e-07 0.788567 -3.03366e-07 1.0598C-2.91516e-07 1.3309 0.104445 1.60199 0.31291 1.80895L6.24454 7.68982C6.44488 7.88858 6.71661 8.00018 7.00017 8.00018C7.28373 8.00004 7.55532 7.88844 7.75609 7.68967L13.6871 1.80909Z"
        fill="black"
      />
    </svg>
  );

  return (
    <Layout>
      <div className="breadcrumbs bg-white relative">
        <div className="container">
          <ul className='absolute top-[39px] left-[20px] sm:z-[9] z-[99] sm:top-[60px] phablet:top-[70px] tablet:top-[60px]'>
            <li className='inline relative text-[16px] font-[400] leading-[24px] hover:text-pink transition-all delay-[0.3s] mr-[15px]'>
              <Link href="/" className='text-black hover:text-pink'>Home</Link>
            </li>
            <li className='inline relative text-[16px] font-[400] leading-[24px] text-black hover:text-pink transition-all delay-[0.3s] mr-[15px]'>
              <Link href="/blog-html" className='text-black hover:text-pink'>Blog</Link>
            </li>
            <li className='inline relative text-[16px] font-[700] leading-[24px] mr-[15px]'>
              <span className='text-pink'>Blog Detail</span>
            </li>
          </ul>
        </div>
      </div>
      <section className={`${BlogDetailStyle.bannerBlogDetail} banner bg-white padding-medium-bottom`}>
        <div className="container">
          <div>
            <Link href="#">Account fraud</Link>
            <h1>‘Tis the season for fraud: How businesses can stay secure during the holidays</h1>
            <p>As the holiday shopping season ramps up, risk teams should prepare for transaction volumes and fraud rates to skyrocket.</p>
            <div>
              <Image src="/blogFilter/topicAuther.png" width={56} height={56} alt='' />
              <div>
                <Link href={{ pathname: '/blog-html/', query: { author: 'Rebecca Alter' } }}>Rebecca Alter</Link>
                <div>
                  <p>Nov 14, 2023</p>
                  <p className={`${BlogDetailStyle.blackdots} relative`}>3 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${BlogDetailStyle.blogDetail}`} id='blogDetail'>
        <div className="container">
          <div>
            {
              winWidth > 991 ?

                <div style={isScrolled ? height : { top: ribbonHeight }}>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.25 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V20.25C2.25 20.6478 2.40804 21.0294 2.68934 21.3107C2.97064 21.592 3.35218 21.75 3.75 21.75H20.25C20.6478 21.75 21.0294 21.592 21.3107 21.3107C21.592 21.0294 21.75 20.6478 21.75 20.25V3.75C21.75 3.35218 21.592 2.97064 21.3107 2.68934C21.0294 2.40804 20.6478 2.25 20.25 2.25ZM20.25 20.25H3.75V3.75H20.25V20.25ZM9 10.5V16.5C9 16.6989 8.92098 16.8897 8.78033 17.0303C8.63968 17.171 8.44891 17.25 8.25 17.25C8.05109 17.25 7.86032 17.171 7.71967 17.0303C7.57902 16.8897 7.5 16.6989 7.5 16.5V10.5C7.5 10.3011 7.57902 10.1103 7.71967 9.96967C7.86032 9.82902 8.05109 9.75 8.25 9.75C8.44891 9.75 8.63968 9.82902 8.78033 9.96967C8.92098 10.1103 9 10.3011 9 10.5ZM17.25 13.125V16.5C17.25 16.6989 17.171 16.8897 17.0303 17.0303C16.8897 17.171 16.6989 17.25 16.5 17.25C16.3011 17.25 16.1103 17.171 15.9697 17.0303C15.829 16.8897 15.75 16.6989 15.75 16.5V13.125C15.75 12.6277 15.5525 12.1508 15.2008 11.7992C14.8492 11.4475 14.3723 11.25 13.875 11.25C13.3777 11.25 12.9008 11.4475 12.5492 11.7992C12.1975 12.1508 12 12.6277 12 13.125V16.5C12 16.6989 11.921 16.8897 11.7803 17.0303C11.6397 17.171 11.4489 17.25 11.25 17.25C11.0511 17.25 10.8603 17.171 10.7197 17.0303C10.579 16.8897 10.5 16.6989 10.5 16.5V10.5C10.5009 10.3163 10.5693 10.1393 10.692 10.0026C10.8148 9.86596 10.9834 9.7791 11.166 9.75852C11.3485 9.73794 11.5323 9.78508 11.6824 9.891C11.8325 9.99691 11.9385 10.1542 11.9803 10.3331C12.4877 9.98894 13.0792 9.78947 13.6914 9.75611C14.3036 9.72276 14.9133 9.85679 15.455 10.1438C15.9968 10.4308 16.4501 10.86 16.7664 11.3852C17.0826 11.9105 17.2498 12.5119 17.25 13.125ZM9.375 7.875C9.375 8.0975 9.30902 8.31501 9.1854 8.50002C9.06179 8.68502 8.88609 8.82922 8.68052 8.91436C8.47495 8.99951 8.24875 9.02179 8.03052 8.97838C7.81229 8.93498 7.61184 8.82783 7.4545 8.6705C7.29717 8.51316 7.19002 8.31271 7.14662 8.09448C7.10321 7.87625 7.12549 7.65005 7.21064 7.44448C7.29578 7.23891 7.43998 7.06321 7.62498 6.9396C7.80999 6.81598 8.0275 6.75 8.25 6.75C8.54837 6.75 8.83452 6.86853 9.0455 7.0795C9.25647 7.29048 9.375 7.57663 9.375 7.875Z" fill="black" />
                    </svg>
                  </Link>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6074 3H20.5975L14.065 10.6246L21.75 21H15.7327L11.0197 14.7074L5.627 21H2.63506L9.62227 12.8446L2.25 3H8.42007L12.6802 8.75169L17.6074 3ZM16.558 19.1723H18.2148L7.51978 4.73169H5.7418L16.558 19.1723Z" fill="black" />
                    </svg>
                  </Link>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97981 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43734 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46927 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12.75 20.2153V14.25H15C15.1989 14.25 15.3897 14.171 15.5303 14.0303C15.671 13.8897 15.75 13.6989 15.75 13.5C15.75 13.3011 15.671 13.1103 15.5303 12.9697C15.3897 12.829 15.1989 12.75 15 12.75H12.75V10.5C12.75 10.1022 12.908 9.72064 13.1893 9.43934C13.4706 9.15804 13.8522 9 14.25 9H15.75C15.9489 9 16.1397 8.92098 16.2803 8.78033C16.421 8.63968 16.5 8.44891 16.5 8.25C16.5 8.05109 16.421 7.86032 16.2803 7.71967C16.1397 7.57902 15.9489 7.5 15.75 7.5H14.25C13.4544 7.5 12.6913 7.81607 12.1287 8.37868C11.5661 8.94129 11.25 9.70435 11.25 10.5V12.75H9C8.80109 12.75 8.61032 12.829 8.46967 12.9697C8.32902 13.1103 8.25 13.3011 8.25 13.5C8.25 13.6989 8.32902 13.8897 8.46967 14.0303C8.61032 14.171 8.80109 14.25 9 14.25H11.25V20.2153C9.13575 20.0223 7.17728 19.0217 5.78197 17.4215C4.38667 15.8214 3.66194 13.7449 3.75855 11.6241C3.85515 9.50324 4.76564 7.50127 6.30063 6.0346C7.83563 4.56793 9.87695 3.74947 12 3.74947C14.123 3.74947 16.1644 4.56793 17.6994 6.0346C19.2344 7.50127 20.1449 9.50324 20.2415 11.6241C20.3381 13.7449 19.6133 15.8214 18.218 17.4215C16.8227 19.0217 14.8643 20.0223 12.75 20.2153Z" fill="black" />
                    </svg>
                  </Link>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.8944 17.4713C13.0349 17.6119 13.1139 17.8026 13.1139 18.0014C13.1139 18.2002 13.0349 18.3909 12.8944 18.5316L11.9625 19.4691C10.977 20.4539 9.64065 21.007 8.24741 21.0065C6.85416 21.0061 5.51815 20.4522 4.53328 19.4667C3.54842 18.4812 2.99537 17.1449 2.99581 15.7516C2.99625 14.3584 3.55014 13.0224 4.53563 12.0375L6.79688 9.77626C7.74346 8.82892 9.01628 8.27914 10.3549 8.2394C11.6935 8.19967 12.9967 8.67299 13.9978 9.56251C14.0717 9.62801 14.1319 9.70741 14.1751 9.79619C14.2183 9.88497 14.2436 9.98139 14.2495 10.0799C14.2554 10.1785 14.2419 10.2772 14.2096 10.3705C14.1774 10.4638 14.1271 10.5499 14.0616 10.6238C13.9961 10.6976 13.9167 10.7579 13.8279 10.8011C13.7391 10.8442 13.6427 10.8695 13.5441 10.8754C13.4456 10.8813 13.3468 10.8678 13.2535 10.8356C13.1602 10.8033 13.0742 10.753 13.0003 10.6875C12.2853 10.0525 11.3547 9.71473 10.3989 9.74313C9.44305 9.77153 8.53417 10.164 7.85813 10.8403L5.59688 13.0988C4.89347 13.8022 4.4983 14.7562 4.4983 15.7509C4.4983 16.7457 4.89347 17.6997 5.59688 18.4031C6.30028 19.1065 7.2543 19.5017 8.24906 19.5017C9.24383 19.5017 10.1978 19.1065 10.9012 18.4031L11.8331 17.4713C11.9028 17.4015 11.9855 17.3462 12.0765 17.3085C12.1676 17.2707 12.2652 17.2513 12.3638 17.2513C12.4623 17.2513 12.5599 17.2707 12.651 17.3085C12.742 17.3462 12.8247 17.4015 12.8944 17.4713ZM19.4644 4.53376C18.4787 3.55034 17.1433 2.99805 15.7509 2.99805C14.3586 2.99805 13.0231 3.55034 12.0375 4.53376L11.1056 5.46657C10.965 5.6073 10.8861 5.79813 10.8862 5.99706C10.8863 6.196 10.9654 6.38675 11.1061 6.52736C11.2468 6.66796 11.4376 6.7469 11.6366 6.74682C11.8355 6.74673 12.0263 6.66762 12.1669 6.52689L13.0988 5.59501C13.8022 4.89161 14.7562 4.49644 15.7509 4.49644C16.7457 4.49644 17.6997 4.89161 18.4031 5.59501C19.1065 6.29842 19.5017 7.25244 19.5017 8.2472C19.5017 9.24196 19.1065 10.196 18.4031 10.8994L16.1419 13.1625C15.4655 13.8384 14.5564 14.2304 13.6006 14.2583C12.6447 14.2862 11.7144 13.9478 10.9997 13.3125C10.9258 13.247 10.8398 13.1967 10.7465 13.1645C10.6532 13.1322 10.5544 13.1187 10.4559 13.1246C10.2568 13.1365 10.0707 13.2271 9.93844 13.3763C9.87294 13.4501 9.82263 13.5362 9.79039 13.6295C9.75815 13.7228 9.7446 13.8215 9.75052 13.9201C9.76248 14.1191 9.853 14.3052 10.0022 14.4375C11.0031 15.3273 12.3061 15.8009 13.6447 15.7615C14.9833 15.7222 16.2563 15.1727 17.2031 14.2256L19.4644 11.9644C20.4484 10.9787 21.001 9.6428 21.001 8.25001C21.001 6.85722 20.4484 5.52134 19.4644 4.53564V4.53376Z" fill="black" />
                    </svg>
                  </Link>
                </div> : <div style={height}>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.25 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V20.25C2.25 20.6478 2.40804 21.0294 2.68934 21.3107C2.97064 21.592 3.35218 21.75 3.75 21.75H20.25C20.6478 21.75 21.0294 21.592 21.3107 21.3107C21.592 21.0294 21.75 20.6478 21.75 20.25V3.75C21.75 3.35218 21.592 2.97064 21.3107 2.68934C21.0294 2.40804 20.6478 2.25 20.25 2.25ZM20.25 20.25H3.75V3.75H20.25V20.25ZM9 10.5V16.5C9 16.6989 8.92098 16.8897 8.78033 17.0303C8.63968 17.171 8.44891 17.25 8.25 17.25C8.05109 17.25 7.86032 17.171 7.71967 17.0303C7.57902 16.8897 7.5 16.6989 7.5 16.5V10.5C7.5 10.3011 7.57902 10.1103 7.71967 9.96967C7.86032 9.82902 8.05109 9.75 8.25 9.75C8.44891 9.75 8.63968 9.82902 8.78033 9.96967C8.92098 10.1103 9 10.3011 9 10.5ZM17.25 13.125V16.5C17.25 16.6989 17.171 16.8897 17.0303 17.0303C16.8897 17.171 16.6989 17.25 16.5 17.25C16.3011 17.25 16.1103 17.171 15.9697 17.0303C15.829 16.8897 15.75 16.6989 15.75 16.5V13.125C15.75 12.6277 15.5525 12.1508 15.2008 11.7992C14.8492 11.4475 14.3723 11.25 13.875 11.25C13.3777 11.25 12.9008 11.4475 12.5492 11.7992C12.1975 12.1508 12 12.6277 12 13.125V16.5C12 16.6989 11.921 16.8897 11.7803 17.0303C11.6397 17.171 11.4489 17.25 11.25 17.25C11.0511 17.25 10.8603 17.171 10.7197 17.0303C10.579 16.8897 10.5 16.6989 10.5 16.5V10.5C10.5009 10.3163 10.5693 10.1393 10.692 10.0026C10.8148 9.86596 10.9834 9.7791 11.166 9.75852C11.3485 9.73794 11.5323 9.78508 11.6824 9.891C11.8325 9.99691 11.9385 10.1542 11.9803 10.3331C12.4877 9.98894 13.0792 9.78947 13.6914 9.75611C14.3036 9.72276 14.9133 9.85679 15.455 10.1438C15.9968 10.4308 16.4501 10.86 16.7664 11.3852C17.0826 11.9105 17.2498 12.5119 17.25 13.125ZM9.375 7.875C9.375 8.0975 9.30902 8.31501 9.1854 8.50002C9.06179 8.68502 8.88609 8.82922 8.68052 8.91436C8.47495 8.99951 8.24875 9.02179 8.03052 8.97838C7.81229 8.93498 7.61184 8.82783 7.4545 8.6705C7.29717 8.51316 7.19002 8.31271 7.14662 8.09448C7.10321 7.87625 7.12549 7.65005 7.21064 7.44448C7.29578 7.23891 7.43998 7.06321 7.62498 6.9396C7.80999 6.81598 8.0275 6.75 8.25 6.75C8.54837 6.75 8.83452 6.86853 9.0455 7.0795C9.25647 7.29048 9.375 7.57663 9.375 7.875Z" fill="black" />
                    </svg>
                  </Link>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6074 3H20.5975L14.065 10.6246L21.75 21H15.7327L11.0197 14.7074L5.627 21H2.63506L9.62227 12.8446L2.25 3H8.42007L12.6802 8.75169L17.6074 3ZM16.558 19.1723H18.2148L7.51978 4.73169H5.7418L16.558 19.1723Z" fill="black" />
                    </svg>
                  </Link>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97981 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43734 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46927 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12.75 20.2153V14.25H15C15.1989 14.25 15.3897 14.171 15.5303 14.0303C15.671 13.8897 15.75 13.6989 15.75 13.5C15.75 13.3011 15.671 13.1103 15.5303 12.9697C15.3897 12.829 15.1989 12.75 15 12.75H12.75V10.5C12.75 10.1022 12.908 9.72064 13.1893 9.43934C13.4706 9.15804 13.8522 9 14.25 9H15.75C15.9489 9 16.1397 8.92098 16.2803 8.78033C16.421 8.63968 16.5 8.44891 16.5 8.25C16.5 8.05109 16.421 7.86032 16.2803 7.71967C16.1397 7.57902 15.9489 7.5 15.75 7.5H14.25C13.4544 7.5 12.6913 7.81607 12.1287 8.37868C11.5661 8.94129 11.25 9.70435 11.25 10.5V12.75H9C8.80109 12.75 8.61032 12.829 8.46967 12.9697C8.32902 13.1103 8.25 13.3011 8.25 13.5C8.25 13.6989 8.32902 13.8897 8.46967 14.0303C8.61032 14.171 8.80109 14.25 9 14.25H11.25V20.2153C9.13575 20.0223 7.17728 19.0217 5.78197 17.4215C4.38667 15.8214 3.66194 13.7449 3.75855 11.6241C3.85515 9.50324 4.76564 7.50127 6.30063 6.0346C7.83563 4.56793 9.87695 3.74947 12 3.74947C14.123 3.74947 16.1644 4.56793 17.6994 6.0346C19.2344 7.50127 20.1449 9.50324 20.2415 11.6241C20.3381 13.7449 19.6133 15.8214 18.218 17.4215C16.8227 19.0217 14.8643 20.0223 12.75 20.2153Z" fill="black" />
                    </svg>
                  </Link>
                  <Link href="#" className='text-[0]'>.
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.8944 17.4713C13.0349 17.6119 13.1139 17.8026 13.1139 18.0014C13.1139 18.2002 13.0349 18.3909 12.8944 18.5316L11.9625 19.4691C10.977 20.4539 9.64065 21.007 8.24741 21.0065C6.85416 21.0061 5.51815 20.4522 4.53328 19.4667C3.54842 18.4812 2.99537 17.1449 2.99581 15.7516C2.99625 14.3584 3.55014 13.0224 4.53563 12.0375L6.79688 9.77626C7.74346 8.82892 9.01628 8.27914 10.3549 8.2394C11.6935 8.19967 12.9967 8.67299 13.9978 9.56251C14.0717 9.62801 14.1319 9.70741 14.1751 9.79619C14.2183 9.88497 14.2436 9.98139 14.2495 10.0799C14.2554 10.1785 14.2419 10.2772 14.2096 10.3705C14.1774 10.4638 14.1271 10.5499 14.0616 10.6238C13.9961 10.6976 13.9167 10.7579 13.8279 10.8011C13.7391 10.8442 13.6427 10.8695 13.5441 10.8754C13.4456 10.8813 13.3468 10.8678 13.2535 10.8356C13.1602 10.8033 13.0742 10.753 13.0003 10.6875C12.2853 10.0525 11.3547 9.71473 10.3989 9.74313C9.44305 9.77153 8.53417 10.164 7.85813 10.8403L5.59688 13.0988C4.89347 13.8022 4.4983 14.7562 4.4983 15.7509C4.4983 16.7457 4.89347 17.6997 5.59688 18.4031C6.30028 19.1065 7.2543 19.5017 8.24906 19.5017C9.24383 19.5017 10.1978 19.1065 10.9012 18.4031L11.8331 17.4713C11.9028 17.4015 11.9855 17.3462 12.0765 17.3085C12.1676 17.2707 12.2652 17.2513 12.3638 17.2513C12.4623 17.2513 12.5599 17.2707 12.651 17.3085C12.742 17.3462 12.8247 17.4015 12.8944 17.4713ZM19.4644 4.53376C18.4787 3.55034 17.1433 2.99805 15.7509 2.99805C14.3586 2.99805 13.0231 3.55034 12.0375 4.53376L11.1056 5.46657C10.965 5.6073 10.8861 5.79813 10.8862 5.99706C10.8863 6.196 10.9654 6.38675 11.1061 6.52736C11.2468 6.66796 11.4376 6.7469 11.6366 6.74682C11.8355 6.74673 12.0263 6.66762 12.1669 6.52689L13.0988 5.59501C13.8022 4.89161 14.7562 4.49644 15.7509 4.49644C16.7457 4.49644 17.6997 4.89161 18.4031 5.59501C19.1065 6.29842 19.5017 7.25244 19.5017 8.2472C19.5017 9.24196 19.1065 10.196 18.4031 10.8994L16.1419 13.1625C15.4655 13.8384 14.5564 14.2304 13.6006 14.2583C12.6447 14.2862 11.7144 13.9478 10.9997 13.3125C10.9258 13.247 10.8398 13.1967 10.7465 13.1645C10.6532 13.1322 10.5544 13.1187 10.4559 13.1246C10.2568 13.1365 10.0707 13.2271 9.93844 13.3763C9.87294 13.4501 9.82263 13.5362 9.79039 13.6295C9.75815 13.7228 9.7446 13.8215 9.75052 13.9201C9.76248 14.1191 9.853 14.3052 10.0022 14.4375C11.0031 15.3273 12.3061 15.8009 13.6447 15.7615C14.9833 15.7222 16.2563 15.1727 17.2031 14.2256L19.4644 11.9644C20.4484 10.9787 21.001 9.6428 21.001 8.25001C21.001 6.85722 20.4484 5.52134 19.4644 4.53564V4.53376Z" fill="black" />
                    </svg>
                  </Link>
                </div>
            }
            <div>
              <Image src="/blogDetail/laptop-with-man.png" width={668} height={400} alt='' />
              <p>Although many consumers are still facing sticker shock as the price of goods and interest rates <a href="">remain high,</a> the <a href="">economy is holding strong</a> and inflation has slowed—spelling good news for merchants heading into the busy holiday season. Holiday shopping is expected to finally <a href="#">surpass pre-pandemic figures,</a> with consumers spending more overall, but on fewer purchases.</p>
              <p>This means more competition for customers attention, costlier chargebacks, and higher stakes. In order to ensure a profitable holiday season, businesses need to consider both how they’re keeping their sites secure from heightened fraudulent activity and how they’re enabling seamless customer experiences from login to transaction to checkout.</p>
              <h4>Top holiday shopping trends this year</h4>
              <p>If you’re a merchant that’s been in business through the holidays, you’re no stranger to the flurry of seasonal spending, but there are some specific trends unique to this year that you should be prepared to plan around.</p>
              <ul>
                <li>
                  <p><span className='font-bold '>Holiday shopping starts earlier every year.</span> Every year, it feels like holiday deals creep up earlier and earlier in the season—long before traditional Black Friday and Cyber Monday events post-Thanksgiving. And although some consumers may balk at holiday deals advertised before Halloween, it’s becoming the new norm, with <a href="#">41%</a> planning to start shopping by the end of October to get a head start on the holiday rush. However, last minute shopping will still remain popular, with nearly 40% waiting until November and 20% holding off until December. For merchants, this means a longer holiday shopping—and fraud season—to manage.</p>
                </li>
              </ul>
              <TbdContentWithCtaTwo/>
              {/* <div className="max-w-[665px] clear-both">
                <div>
                  <div>
                    <span>whitepaper</span>
                    <h4>Ullamcorper morbi tincidunt ornare massa eget</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                  </div>
                  <Image src="/blogDetail/social-laptop.png" width={300} height={250} alt='' />
                </div>
                <Btn_pink text="DOWNLOAD NOW" className={`blogDetailButton wide-screen:left-[24px] wide-screen:bottom-[22px]`} link="/" />
              </div> */}
              {/* <div
                  className={`xl-up:rounded-[300px] circle-img xl:rounded-[20px] md-up:py-10 md-up:pr-10 pl-24 tablet:pl-20 wide-screen:pl-[150px] md:p-[30px] md-up:overflow-hidden`}
                  data-aos="fade-up"
                >
                  <div className="xl-up:flex xl:block md-up:justify-between ">
                    <div className="text-wrap relative w-3/5 md:w-full pr-5 wide-screen:pr-16 md:pr-0 xl:w-full md:pt-0 pt-10 pb-16 md:pb-[48px] md-up:flex md-up:justify-center flex-col">
                      <span>whitepaper</span>
                      <h4>Ullamcorper morbi tincidunt ornare massa eget</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                      <div className="btn-wrap md-up:hidden md:mt-5">
                        <Btn_pink text="DOWNLOAD NOW" className="" link="/" />
                      </div>
                    </div>
                    <div className="w-[365px] laptop-landscape:w-[260px!important] xl:mx-auto xl:w-[226px] tablet:w-[223px] md:w-[286px] wide-screen:w-[465px] md:m-auto relative self-end">
                      <div className="p-10 desktop:p-5 tablet:p-5 sm:p-8 relative">
                        <div className="absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 w-full h-full z-[2]">
                          <div className="absolute w-full h-full border-l-transparent rounded-[50%] -rotate-[43deg] ">
                            <svg className="w-full h-full">
                              <circle cx="50%" cy="50%" r="75" />
                            </svg>
                          </div>
                          <div className="pink-circle absolute h-[5px]  md:h-[4px] tablet:h-[3px] desktop:h-[3px] laptop-landscape:h-[3.5px!important]  wide-screen:h-[6px] right-[50%] bottom-0 bg-pink "></div>
                        </div>
                        <div className="relative">
                          <Image
                            src="/laptop.png"
                            width={365}
                            height={365}
                            alt="laptop"
                            className="relative z-10 w-full"
                          />
                          <div className="absolute top-0 right-0 w-[164%] h-[calc(100%+80px)]">
                            <Image
                              src="/yellow-shadow.svg"
                              width={285}
                              height={410}
                              alt="yellow-graphic"
                              className="w-full h-full max-w-[unset]"
                            />
                            <div className="btn-wrap absolute bottom-[40px] desktop:bottom-[60px] tablet:bottom-[60px] left-[-54px] laptop-landscape:left-[-70px] md:bottom-auto md:top-[-112px] md:left-[50%] desktop:left-[-62px] md:hidden">
                              
                              <Btn_pink text="DOWNLOAD NOW" className="" link="/" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              <h4>Ensuring your business is secure for the busy holiday season</h4>
              <p>Navigating transaction surges and anomalous behavior can make the holidays a stressful time for risk teams. Here are a few tips to help secure your business from fraudulent activity and feel confident going into the holiday shopping season.</p>
              <Image src='/blogDetail/shopping-man.png' className='my-[64px]' width={668} height={400} alt='' />
              <h4>Sociis natoque penatibus et magnis dis parturient montes</h4>
              <p>Dolor morbi non arcu risus quis varius quam quisque id. Condimentum id venenatis a condimentum vitae sapien. Venenatis urna cursus eget nunc scelerisque viverra mauris. Suspendisse in est ante in nibh mauris cursus mattis. Diam vulputate ut pharetra sit amet aliquam. Enim nec dui nunc mattis enim. Justo donec enim diam vulputate ut pharetra sit amet aliquam. </p>
              <p>Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Ut diam quam nulla porttitor. Duis convallis convallis tellus id interdum velit. Arcu odio ut sem nulla. Interdum posuere lorem ipsum dolor. Dolor morbi non arcu risus quis varius quam quisque id. Condimentum id venenatis a condimentum vitae sapien. Venenatis urna cursus eget nunc scelerisque viverra mauris. Suspendisse in est ante in nibh mauris cursus mattis.</p>
              <blockquote>
                <Image src='/blogDetail/doublequote.svg' width={40} height={40} className='mb-[16px]' alt='' />
                <h4>Est tation latine aliquip id, mea ad tale illud definitiones. Periculis omitur necessitus eum ad, pro eripuit minimum stet prompta reformidans.”</h4>
                <div>
                  <p>Connie Robertson</p>
                  <p className='small_font'>CMO at Swan Bitcoin</p>
                </div>

              </blockquote>
              <p>Tristique senectus et netus et malesuada fames ac turpis. Massa massa ultricies mi quis hendrerit dolor magna. Sollicitudin ac orci phasellus egestas tellus rutrum. Condimentum mattis pellentesque id nibh tortor id aliquet. Platea dictumst vestibulum rhoncus est. Tristique senectus et netus et malesuada. Massa placerat duis ultricies lacus sed turpis tincidunt id. Dui nunc mattis enim ut tellus elementum sagittis. Tristique et egestas quis ipsum suspendisse. Sed id semper risus in hendrerit gravida. Sodales ut eu sem integer vitae justo eget magna. Nulla aliquet enim tortor at auctor urna nunc id. Id aliquet risus feugiat in ante. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Neque viverra justo nec ultrices dui sapien eget. Scelerisque eleifend donec pretium vulputate sapien nec. Tellus id interdum velit. Arcu odio ut sem nulla. Interdum posuere lorem ipsum dolor. Dolor morbi non arcu risus quis varius quam quisque id. Condimentum id venenatis a condimentum vitae sapien. Venenatis urna cursus eget nunc scelerisque viverra mauris. Suspendisse in est ante in nibh mauris cursus mattis.</p>
            </div>
            <div>
              <div>
                <p className={`small_font font-[700!important] laptop-landscape:text-[16px] lg:!text-[16px]`}>Sign up to get our latest insights in your inbox:</p>
                <form>
                  <div>
                    <label htmlFor="" className={`${inter.className}`}>email address*</label>
                    <input type="text" value={isInputBox} className={`${isInputBox != '' ? '!outline-[3px] !outline-pink ' : 'outline-transparent'}`} onChange={(e) => inputText(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="" className={`${inter.className}`}>Country*</label>
                    <div className={`hover:outline-pink mr-[16px] cursor-pointer p-[0] sm:mr-[5px] outline outline-[1px] border-[0] lg:p-0 ${isFocus === true ? 'outline-[2px] outline-pink' : 'outline-[1px] outline outline-black'} sm:mb-[10px]`}>
                      {/* <span className='inline relative'></span> */}
                      <p className='!font-[400] p-[10px] xl-up:!text-[18px]' onClick={() => selectDrop(true)}>United States</p>
                      <span className={`absolute w-[15px] h-[8px] top-1/2 right-[15px] -translate-y-[50%] duration-300 rotate-0`}>{arrow}</span>
                      <ul className={`absolute z-[1] top-[50px] duration-300 left-0 topic w-full p-[10px] overflow-auto bg-white ${isFocus === true ? 'h-full opacity-1 visible overflow-visible' : 'h-0 opacity-0 invisible overflow-hidden'} z-[99] shadow-filter-shadow rounded-[4px] sm:w-[230px]`}>
                        <li className={`mb-[16px] last:mb-0 hover:text-pink z-[99]`} onClick={() => listUpdate('India')}><p className='!font-[400]'>India</p></li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <button type='submit' className='button group arrow_btn bg-pink py-[16px] px-[24px] xl-up:text-[16px] w-full rounded-[100px] uppercase text-black relative transition-all wide-screen:text-[20px] duration-300 font-[700] leading-[1] pr-[26px]'>Submit</button>
                  </div>

                </form>
              </div>
              <div>
                <p className={`small_font font-[700!important] laptop-landscape:text-[16px] lg:!text-[16px]`}>Related topics</p>
                <div>
                  {topicsData.map((item, index) => {
                    return (
                      <div key={index} className='relative' >
                        <Link href='#' className='emptyLink'>.</Link>
                        <p>{item.topic}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className={`small_font font-[700!important] laptop-landscape:text-[16px] lg:!text-[16px] `}> You may also like</p>
                {cardData.map((item, i) => {
                  return (
                    <article key={i} className="relative hover:outline-[2px] hover:shadow-black-shadow">
                      <Link href='#' className='emptyLink'>.</Link>
                      <p className='text-blue text-[14px] font-[700] wide-screen:text-[18px] uppercase'>{item.title}</p>
                      <h4 className='wide-screen:text-[28px] xl-up:text-[20px]'>{item.description}</h4>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterCtaWithSlider bg='white' />
    </Layout>

  )
}

export default BlogDetail
