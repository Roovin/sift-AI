import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef, Children } from 'react';
import { useRouter } from 'next/router';
import styles from './header.module.css';
import Btn_Pink from '../button/Button_Pink';
import Button_Black from '../button/Button_Black';

function NavItem({ data }) {

    // toggle multilevel menu
    const toggleSubMenu = (event) => {
        event.preventDefault();
        const parentListItem = event.target.closest('li');
        const hasOpenSibling = parentListItem.parentNode.querySelector('li.header_open__WQ8dW');
        const hasOpenChild = parentListItem.parentNode.querySelector('li.header_open__WQ8dW li.header_open__WQ8dW');

        if (hasOpenSibling && hasOpenSibling !== parentListItem) {
            hasOpenSibling.classList.remove(styles.open);
            if (hasOpenChild != null) {
                hasOpenChild.classList.remove(styles.open);
            }
        }
        parentListItem.classList.toggle(styles.open);
    };


    // Function to update styles based on the current route

    const { pathname, asPath } = useRouter();

    const normalizedHref = data.url && data.url.replace ? data.url.replace(/\/$/, '') : '';
    const normalizedPath = asPath && asPath.replace ? asPath.replace(/\/$/, '') : '';

    const isActive = normalizedHref && normalizedPath === normalizedHref;



    return (
        <li className={`${styles.scrollBarHidden}`}>
            {data.subItems ? (
                <>
                    <p className={`${styles.borderBottom} py-4 pl-6 block relative group hover:text-pink`} onClick={toggleSubMenu}>
                        {data.label}
                        <span className='w-[14px] h-[6px] absolute left-6 top-2/4'>
                            <span className={`absolute top-0 left-0 w-[10px] h-[2px] bg-black inline-block transition-all rotate-45`}></span>
                            <span className={`absolute top-0 left-[6px] w-[10px] h-[2px] bg-black inline-block transition-all -rotate-45`}></span>
                        </span>
                    </p>
                    <ul className={`${styles.borderBottom} ${styles.scrollBarHidden} max-h-0 overflow-hidden transition-[max-height] duration-500`}>
                        {data.subItems.map((subItem, subIndex) => (
                            <NavItem key={subIndex} data={subItem} />
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    {!data.button ? (
                        <Link href={`${data.url}`} aria-label="first link" className={` ${data.category === "category" ? "text-blue font-bold text-sm pointer-events-none" : "text-[15px] font-semibold hover:text-pink transition-all"} py-[11px] pl-[50px] pr-[15px] block rounded-tr-full rounded-br-full rounded-bl-none rounded-tl-none ${isActive ? 'bg-pink/[0.1] text-pink' : ''}`} {...(data.externalLink ? { target: "_blank" } : {})}>
                            {data.label}
                        </Link>
                    ) : (
                        <div className={`${styles.customBtn} text-center my-3`}>
                            <Button_Black text={data.label} link={data.url} />
                        </div>
                    )}
                </>
            )}
        </li>
    );
}


export default function Header({ data, ribbonVisible, ribbonHeight }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [fillColor, setFillColor] = useState("");
    const [fillColorBlue, setFillColorBlue] = useState("");
    const [strokeColorBlack, setStrokeColorBlack] = useState("");
    const [toggleBtnColor, setToggleBtnColor] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [isScrolled, setIsScrolled] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [navigationTop, setNavigationTop] = useState(0);
    const navigationRef = useRef(null);
    const router = useRouter();

    // toggle menu on smaller width
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Toggle searchBar
    const handleSearchClick = () => {
        setExpanded(!expanded);
    };


    const handleWindowResize = () => {
        const banner = document.querySelector('.banner.bg-white');
        const bannerSkyBlue = document.querySelector('.banner.bg-skyblue');
        if (window.innerWidth > 992) {
            setIsMenuOpen(false);
            setFillColor("#000");
            setFillColorBlue("#2E69FF");
            setStrokeColorBlack("#fff");
            if (banner !== null || bannerSkyBlue !== null) {
                setStrokeColorBlack("#000");
            } else {
                setStrokeColorBlack("#fff");
            }
        } else {
            setStrokeColorBlack("#000");
            if (banner !== null || bannerSkyBlue !== null) {
                setFillColor("#000");
                setFillColorBlue("#2E69FF");
                setToggleBtnColor("bg-black");
            } else {
                setFillColor("#fff");
                setFillColorBlue("#fff");
                setToggleBtnColor("bg-white");
            }
        }
    };

    useEffect(() => {

        // hide and show navigation on scroll
        let lastScrollTop = 0;

        const handleScroll = () => {
            const currentScrollTop = window.scrollY;

            const isScrolledDown = currentScrollTop < lastScrollTop;
            if (currentScrollTop > 100) {
                setIsScrolled(isScrolledDown);
            }

            // Additional logic for the banner
            const banner = document.querySelector('.banner.bg-white');
            const bannerSkyBlue = document.querySelector('.banner.bg-skyblue');
            let isScrolled;
            if (window.innerWidth > 992) {
                isScrolled = currentScrollTop > 100;
            } else {
                isScrolled = currentScrollTop > 10;
            }
            // const isScrolled = currentScrollTop > 10;

            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
                if (banner !== null || bannerSkyBlue !== null) {
                    if (isScrolled) {
                        setStrokeColorBlack("#fff");
                        setToggleBtnColor("bg-white");
                    } else {
                        setStrokeColorBlack("#000");
                        setToggleBtnColor("bg-black");
                    }
                }
            }


            lastScrollTop = currentScrollTop;
        };

        // adjust header according to ribbon availability

        setNavigationTop(ribbonVisible ? ribbonHeight : 0);

        setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleWindowResize);
            handleWindowResize();
        }, 500);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [scrolled, ribbonVisible, ribbonHeight]);

    useEffect(() => {
        const handleRouteChange = () => {
            setTimeout(() => {
                handleWindowResize();
                const page = document.querySelector('.fraud-benchmarking-hub');
                if (page) {
                    setTimeout(() => {
                        page.style.opacity = "1";
                    }, 500);
                }
            }, 500);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);


    return (
        <header ref={navigationRef} id='header' className={`${styles.header} fixed w-full lg-up:h-[100px] lg:h-[70px] top-0 left-0 flex transition-all duration-300 ease-in-out wide-nav-screen:max-w-[2776px] wide-nav-screen:left-[calc(50%-138px)] wide-nav-screen:translate-x-[-50%] lg:z-[100] ${scrolled ? 'lg:bg-black' : 'lg:transparent'} ${isScrolled ? 'lg-up:z-[98]' : 'lg-up:z-0'}`} style={{ top: `${navigationTop}px` }}>
            <div className={`relative w-full flex items-center xxl-up:pr-20  pr-5`}>
                <div className={`${styles.shadow} absolute top-0 lg:w-60 xl:w-[240px] xl-up:w-[276px] lg-up:left-0 h-full bg-white transition-all duration-300 ease-in-out ${isDesktop && !isMenuOpen ? 'left-[-100%]' : 'left-0'}`}></div>
                <div className="row flex justify-between w-full items-center">
                    <Link href={'/'} aria-label="first link" className={`relative z-[1] pl-6 desktop:w-[146px] lg:w-[108px]`}>
                        <svg width="138" height="48" viewBox="0 0 138 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${scrolled && !isMenuOpen ? styles.navScroll : ''} xl:w-full xl:h-full`}>
                            <g clipPath="url(#clip0_1311_6081)">
                                <path d="M136.824 37.4206C136.628 37.471 136.353 37.529 135.997 37.5871C135.64 37.6452 135.228 37.6761 134.758 37.6761C134.13 37.6761 133.55 37.5794 133.021 37.3858C132.492 37.1923 132.06 36.8206 131.735 36.271C131.406 35.7213 131.245 34.9084 131.245 33.8361V17.5858H137.439V12.6929H131.245V5.96516H125.086V12.6929H112.709V8.77935C112.709 7.49806 113.007 6.7858 113.603 6.10838C114.199 5.43096 115.199 5.09032 116.598 5.09032C117.202 5.09032 117.719 5.14064 118.159 5.24516C118.598 5.34967 118.954 5.44645 119.229 5.53548L120.625 0.646448C120.205 0.491609 119.562 0.321287 118.7 0.13161C117.833 -0.0541964 116.802 -0.15097 115.595 -0.15097C113.956 -0.15097 112.45 0.162578 111.074 0.789675C109.698 1.41677 108.597 2.36129 107.765 3.62322C106.934 4.88516 106.519 6.38322 106.519 8.26838V12.6929H100.32V17.5858H106.519V42.4529H112.709V17.5781H125.082V35.0129C125.098 36.8361 125.451 38.3497 126.282 39.5535C127.113 40.7574 128.207 41.6439 129.563 42.2206C130.92 42.7974 132.402 43.0723 134.013 43.0452C134.969 43.0181 135.769 42.929 136.42 42.7935C137.071 42.6581 137.655 42.5071 138.051 42.3871L136.82 37.4206H136.824ZM74.0534 25.7148L69.1607 24.6271C67.5377 24.24 66.3615 23.7523 65.6323 23.1639C64.907 22.5755 64.5424 21.8013 64.5424 20.8452C64.5424 19.7342 65.0874 18.8206 66.1733 18.1084C67.2593 17.3961 68.6079 17.04 70.2192 17.04C71.4111 17.04 72.4069 17.2297 73.2066 17.6129C74.0064 17.9961 74.6415 18.4839 75.112 19.0877C75.4648 19.5368 75.7432 20.0013 75.947 20.4813C76.0176 20.6439 76.0764 20.8103 76.1313 20.9806H81.9257C81.8787 20.7019 81.8238 20.4116 81.7493 20.1058C81.6042 19.5019 81.4121 18.9329 81.1808 18.391C80.4948 16.7729 79.4519 15.4761 78.0131 14.4116C76.0999 12.9948 73.4811 12.2864 70.1526 12.2864C67.8474 12.2864 65.8087 12.6581 64.0328 13.4013C62.2568 14.1445 60.869 15.1819 59.8653 16.5135C58.8656 17.8452 58.3638 19.3974 58.3638 21.1703C58.3638 23.3032 59.0381 25.0684 60.3867 26.4581C61.7354 27.8477 63.8328 28.8542 66.6752 29.4735L71.7835 30.5806C73.2106 30.8903 74.273 31.3548 74.9669 31.9664C75.6608 32.5819 76.0058 33.3484 76.0058 34.2658C76.0058 35.3768 75.4452 36.3174 74.3279 37.0877C73.2066 37.8581 71.7129 38.2413 69.839 38.2413C68.11 38.2413 66.7065 37.8774 65.6245 37.1458C64.5424 36.4142 63.825 35.3303 63.4721 33.8942H57.415C57.415 34.1652 57.4307 34.44 57.4778 34.711C57.713 36.0426 58.1599 37.2232 58.8225 38.2529C59.4811 39.2826 60.3554 40.1613 61.4374 40.889C63.6054 42.3445 66.4164 43.0723 69.8742 43.0723C72.3363 43.0723 74.5004 42.6735 76.3665 41.88C78.2327 41.0826 79.695 39.9871 80.7574 38.5935C81.8199 37.1961 82.3491 35.5935 82.3491 33.7819C82.3491 31.6761 81.663 29.9574 80.2948 28.6335C78.9266 27.3097 76.8409 26.3342 74.0378 25.7148H74.0534ZM88.567 42.4413H94.7613V12.6813H88.567V42.4374V42.4413Z" fill={`${isMenuOpen ? '#000' : fillColor}`} className='transition-all duration-300 ease-in-out' />
                                <path d="M91.6521 9.6271C93.7048 9.6271 95.3687 7.98413 95.3687 5.95743C95.3687 3.93072 93.7048 2.28775 91.6521 2.28775C89.5995 2.28775 87.9355 3.93072 87.9355 5.95743C87.9355 7.98413 89.5995 9.6271 91.6521 9.6271Z" fill={`${isMenuOpen ? '#2E69FF' : fillColorBlue}`} className='transition-all duration-300 ease-in-out' />
                                <path d="M26.2909 26.3497C25.0834 27.5419 23.1192 27.5419 21.9117 26.3497C20.7042 25.1574 20.7042 23.2181 21.9117 22.0258C23.1192 20.8336 25.0834 20.8336 26.2909 22.0258C27.4984 23.2181 27.4984 25.1574 26.2909 26.3497ZM14.2904 14.5007C13.0829 15.6929 13.0829 17.6323 14.2904 18.8245C15.4979 20.0168 17.462 20.0168 18.6695 18.8245C19.877 17.6323 19.877 15.6929 18.6695 14.5007C17.462 13.3084 15.4979 13.3084 14.2904 14.5007ZM6.66899 11.2994C7.87649 12.4916 9.84064 12.4916 11.0481 11.2994C12.2556 10.1071 12.2556 8.16775 11.0481 6.97549C9.84064 5.78324 7.87649 5.78324 6.66899 6.97549C5.46149 8.16775 5.46149 10.1071 6.66899 11.2994ZM41.5297 37.0723C40.3222 35.88 38.358 35.88 37.1505 37.0723C35.943 38.2645 35.943 40.2039 37.1505 41.3961C38.358 42.5884 40.3222 42.5884 41.5297 41.3961C42.7372 40.2039 42.7372 38.2645 41.5297 37.0723ZM33.9083 33.871C35.1158 32.6787 35.1158 30.7394 33.9083 29.5471C32.7008 28.3549 30.7367 28.3549 29.5292 29.5471C28.3217 30.7394 28.3217 32.6787 29.5292 33.871C30.7367 35.0632 32.7008 35.0632 33.9083 33.871ZM29.5292 14.4968C28.3217 15.689 28.3217 17.6284 29.5292 18.8207C30.7367 20.0129 32.7008 20.0129 33.9083 18.8207C35.1158 17.6284 35.1158 15.689 33.9083 14.4968C32.7008 13.3045 30.7367 13.3045 29.5292 14.4968ZM26.2869 6.97162C25.0794 5.77936 23.1153 5.77936 21.9078 6.97162C20.7003 8.16388 20.7003 10.1032 21.9078 11.2955C23.1153 12.4878 25.0794 12.4878 26.2869 11.2955C27.4944 10.1032 27.4944 8.16388 26.2869 6.97162ZM14.2864 3.77033C15.4939 4.96259 17.4581 4.96259 18.6656 3.77033C19.6143 2.83356 19.8143 1.44388 19.2772 0.309687C17.2307 0.708397 15.2744 1.35872 13.4435 2.22582C13.5612 2.79098 13.8395 3.32904 14.2864 3.77033ZM44.768 29.5432C43.5605 30.7355 43.5605 32.6749 44.768 33.8671C45.211 34.3045 45.7598 34.5832 46.3322 34.6994C47.2104 32.8916 47.8691 30.96 48.2729 28.9394C47.1242 28.409 45.7167 28.6065 44.768 29.5432ZM37.1466 22.0181C35.9391 23.2103 35.9391 25.1497 37.1466 26.3419C38.3541 27.5342 40.3183 27.5342 41.5258 26.3419C42.7333 25.1497 42.7333 23.2103 41.5258 22.0181C40.3183 20.8258 38.3541 20.8258 37.1466 22.0181ZM37.1466 6.96775C35.9391 8.16001 35.9391 10.0994 37.1466 11.2916C38.3541 12.4839 40.3183 12.4839 41.5258 11.2916C42.7333 10.0994 42.7333 8.16001 41.5258 6.96775C40.3183 5.77549 38.3541 5.77549 37.1466 6.96775ZM29.5252 3.76646C30.7327 4.95872 32.6969 4.95872 33.9044 3.76646C34.3474 3.32904 34.6297 2.78711 34.7473 2.22195C32.9164 1.35485 30.9601 0.704526 28.9137 0.305817C28.3765 1.44001 28.5765 2.82969 29.5252 3.76646ZM44.768 18.8168C45.7167 19.7536 47.1242 19.951 48.2729 19.4207C47.8691 17.4 47.2104 15.4684 46.3322 13.6607C45.7598 13.7768 45.2149 14.0516 44.768 14.4929C43.5605 15.6852 43.5605 17.6245 44.768 18.8168ZM11.0442 41.3884C12.2517 40.1961 12.2517 38.2568 11.0442 37.0645C9.83672 35.8723 7.87257 35.8723 6.66507 37.0645C5.45757 38.2568 5.45757 40.1961 6.66507 41.3884C7.87257 42.5807 9.83672 42.5807 11.0442 41.3884ZM3.42285 29.5394C2.4741 28.6026 1.06666 28.4052 -0.0820312 28.9355C0.321776 30.9561 0.980412 32.8878 1.85859 34.6955C2.43098 34.5794 2.97984 34.3045 3.42285 33.8632C4.63035 32.671 4.63035 30.7316 3.42285 29.5394ZM18.6656 44.5897C17.4581 43.3974 15.4939 43.3974 14.2864 44.5897C13.8434 45.0271 13.5612 45.569 13.4435 46.1342C15.2744 47.0013 17.2307 47.6516 19.2772 48.0503C19.8143 46.9161 19.6143 45.5265 18.6656 44.5897ZM18.6656 33.8632C19.8731 32.671 19.8731 30.7316 18.6656 29.5394C17.4581 28.3471 15.4939 28.3471 14.2864 29.5394C13.0789 30.7316 13.0789 32.671 14.2864 33.8632C15.4939 35.0555 17.4581 35.0555 18.6656 33.8632ZM6.66507 22.0142C5.45757 23.2065 5.45757 25.1458 6.66507 26.3381C7.87257 27.5303 9.83672 27.5303 11.0442 26.3381C12.2517 25.1458 12.2517 23.2065 11.0442 22.0142C9.83672 20.8219 7.87257 20.8219 6.66507 22.0142ZM3.42285 18.8129C4.63035 17.6207 4.63035 15.6813 3.42285 14.489C2.97984 14.0516 2.43098 13.7729 1.85859 13.6568C0.980412 15.4645 0.321776 17.3961 -0.0820312 19.4168C1.06666 19.9471 2.4741 19.7497 3.42285 18.8129ZM33.9044 44.5858C32.6969 43.3936 30.7327 43.3936 29.5252 44.5858C28.5765 45.5226 28.3765 46.9123 28.9137 48.0465C30.9601 47.6478 32.9164 46.9974 34.7473 46.1303C34.6297 45.5652 34.3513 45.0271 33.9044 44.5858ZM21.9039 37.0607C20.6964 38.2529 20.6964 40.1923 21.9039 41.3845C23.1114 42.5768 25.0755 42.5768 26.283 41.3845C27.4905 40.1923 27.4905 38.2529 26.283 37.0607C25.0755 35.8684 23.1114 35.8684 21.9039 37.0607Z" fill={`${isMenuOpen ? '#2E69FF' : fillColorBlue}`} className='transition-all duration-300 ease-in-out' />
                            </g>
                            <defs>
                                <clipPath id="clip0_1311_6081">
                                    <rect width="138" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                    <div className={`${styles.scrollBarHidden} flex lg:flex-wrap lg-up:justify-between lg:overflow-y-scroll lg:absolute lg:top-[100%] lg:h-[calc(100vh-80px)] lg:w-60 lg:bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'menu-open left-0' : 'lg:left-[-100%]'}`}>
                        <div className={`${scrolled ? 'bg-black' : 'bg-transparent'} ${isScrolled ? 'lg-up:translate-y-[0] show' : 'lg-up:translate-y-[-112px]'} absolute h-full xl:w-[calc(100%-244px)] xl-up:w-[calc(100%-276px)] right-0 top-0 transition-all lg:hidden`}></div>
                        <div className='lg-up:flex'>
                            <aside className={`${styles.scrollBarHidden} lg-up:bg-white lg-up:absolute lg-up:overflow-y-scroll lg-up:left-0 lg-up:top-[100%] lg-up:h-[calc(100vh-112px)] xl-up:w-[276px] xl:w-[240px] lg-up:transition-all`}>
                                <nav className='pr-4 h-full lg-up:flex lg-up:flex-col lg-up:justify-between'>
                                    <ul className={`${styles.scrollBarHidden}`}>
                                        {data.items.map((item, index) => (
                                            <NavItem key={index} data={item} />
                                        ))}
                                    </ul>
                                    <div className='fibr-logo lg:hidden lg-up:pb-16'>
                                        <Link href={'/fibr-fraud-industry-benchmarking-resource'} className='group block pt-3 pr-4 pb-3 pl-6 rounded-tr-[100px] rounded-br-[100px] hover:bg-black transition-all duration-300 text-[0]'>
                                            .
                                            <svg width="98" height="48" viewBox="0 0 98 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_2510_3763)">
                                                    <path d="M3.65332 8.2037H27.3067L28.6649 0.339844H5.01153L3.65332 8.2037Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M18.5161 10.6621H3.34942L1.99121 18.5251H17.1579L18.5161 10.6621Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M10.3301 20.7637H1.75567L0.397461 28.6275H8.97193L10.3301 20.7637Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M41.2151 0.364258H33.4359L28.6787 28.5407H36.4579L41.2151 0.364258Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M59.7012 0.364258H47.2767L42.5195 28.5407H56.0078C62.2188 28.5407 66.6403 25.1839 67.4244 20.5618C68.0958 16.5998 65.5782 13.9582 61.8831 13.8482L61.939 13.5731C65.3535 12.9121 67.9839 10.4914 68.5433 7.40965C69.2706 3.11758 66.2487 0.36595 59.7003 0.36595L59.7012 0.364258ZM59.3655 19.5707C59.0858 21.442 57.5743 22.4323 54.9999 22.4323H51.3625L52.3136 16.4889H56.0638C58.4703 16.4889 59.7012 17.5892 59.3655 19.5707ZM60.2606 9.05927C59.9809 10.7656 58.3567 11.7559 56.3435 11.7559H53.1528L54.048 6.36266H57.3497C59.2519 6.36266 60.5404 7.29792 60.2598 9.05927H60.2606Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M83.2456 19.2406L86.7005 28.5407H95.1502L91.1065 18.0294C94.3945 16.5854 96.6891 13.8473 97.3321 9.93952C98.34 3.94112 94.7026 0.364258 88.3221 0.364258H75.9544L71.1973 28.5407H78.9764L80.5576 19.2406H83.2439H83.2456ZM82.7283 6.47354H85.4705C88.1568 6.47354 89.6123 7.51883 89.219 9.94037C88.8273 12.3619 87.0371 13.2972 84.2948 13.2972H81.5663L82.7283 6.47354Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M83.054 41.6932H83.0471L81.9222 41.4443C81.5486 41.3555 81.2784 41.2437 81.1105 41.1092C80.9435 40.9746 80.86 40.7969 80.86 40.5776C80.86 40.3229 80.9857 40.1138 81.2353 39.9505C81.4849 39.7871 81.7956 39.7058 82.1658 39.7058C82.4395 39.7058 82.6693 39.749 82.8526 39.837C83.0368 39.9251 83.1823 40.0368 83.2907 40.1747C83.3716 40.278 83.4362 40.3838 83.4826 40.4938C83.499 40.5311 83.5128 40.5692 83.5248 40.6081H84.8787C84.8675 40.5438 84.8555 40.4769 84.8374 40.4058C84.8039 40.2662 84.7591 40.135 84.7057 40.0097C84.5465 39.6364 84.3046 39.3368 83.9715 39.0905C83.5283 38.763 82.9206 38.5996 82.1494 38.5996C81.6149 38.5996 81.1424 38.6851 80.7301 38.8569C80.3187 39.0287 79.9967 39.2683 79.7635 39.5755C79.532 39.8827 79.4149 40.2416 79.4149 40.6513C79.4149 41.1439 79.5715 41.551 79.884 41.8726C80.1964 42.1934 80.6827 42.4262 81.342 42.5692L82.5264 42.8248C82.8569 42.8968 83.1039 43.0034 83.2649 43.1448C83.4258 43.2869 83.5059 43.4638 83.5059 43.6754C83.5059 43.9319 83.3759 44.1494 83.1168 44.3272C82.8569 44.5049 82.5109 44.5938 82.0762 44.5938C81.6751 44.5938 81.3498 44.51 81.0993 44.3407C80.848 44.1714 80.6819 43.9217 80.6001 43.59H79.1816C79.1816 43.6526 79.1851 43.7169 79.1963 43.7795C79.2514 44.0885 79.3555 44.3627 79.5096 44.6014C79.6628 44.8401 79.8668 45.0441 80.119 45.2133C80.6242 45.5511 81.2792 45.7195 82.084 45.7195C82.6572 45.7195 83.1616 45.6272 83.5963 45.4427C84.0309 45.2574 84.3718 45.0034 84.6188 44.6801C84.8667 44.3559 84.9898 43.9844 84.9898 43.5637C84.9898 43.0753 84.8297 42.6767 84.5112 42.3695C84.1927 42.0622 83.7064 41.8362 83.054 41.6923V41.6932Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M86.4248 45.6693V45.6701H87.8949V38.7119H86.4248V45.6693Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M97.7718 44.4044C97.7254 44.4162 97.6599 44.4298 97.5756 44.4433C97.4904 44.4569 97.3923 44.4636 97.2804 44.4636C97.1306 44.4636 96.992 44.4408 96.8664 44.3959C96.7398 44.3511 96.6374 44.2647 96.56 44.1369C96.4816 44.0091 96.4429 43.8204 96.4429 43.5715V39.7958H97.913V38.621H96.4429V37.0848H94.9728V38.621H92.1238V37.7077C92.1238 37.4089 92.1944 37.2422 92.3364 37.0839C92.4776 36.9256 92.7151 36.8461 93.0482 36.8461C93.192 36.8461 93.3142 36.8579 93.4183 36.8825C93.5225 36.907 93.6077 36.929 93.6722 36.9502L94.0036 35.8093C93.9038 35.7729 93.7514 35.7331 93.5466 35.6891C93.3409 35.6459 93.0956 35.623 92.8089 35.623C92.4199 35.623 92.0618 35.6958 91.7356 35.8423C91.4086 35.9887 91.1469 36.2088 90.9498 36.5041C90.7527 36.7987 90.6537 37.1482 90.6537 37.5884V38.621H89.1836V39.7958H90.6537V45.5792H92.1238V39.7958H94.9728V43.8449C94.9762 44.2681 95.0606 44.6202 95.2594 44.8995C95.4574 45.1788 95.719 45.3854 96.0427 45.5191C96.3663 45.6528 96.72 45.7172 97.1039 45.7104C97.332 45.7045 97.5231 45.6833 97.678 45.652C97.833 45.6207 97.9724 45.5851 98.0671 45.5572L97.7736 44.4035L97.7718 44.4044Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M87.1894 36.2471C86.7083 36.2471 86.3184 36.6305 86.3184 37.1036C86.3184 37.5768 86.7083 37.9602 87.1894 37.9602C87.6705 37.9602 88.0605 37.5768 88.0605 37.1036C88.0605 36.6305 87.6705 36.2471 87.1894 36.2471Z" fill="black" className='group-hover:fill-white transition-all duration-300 ' />
                                                    <path d="M67.269 44.3661C66.9858 44.6445 66.9858 45.0974 67.269 45.3758C67.5522 45.6543 68.0127 45.6543 68.2959 45.3758C68.579 45.0974 68.579 44.6445 68.2959 44.3661C68.0127 44.0876 67.5522 44.0876 67.269 44.3661Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M71.8671 38.3504C72.1503 38.072 72.1503 37.6191 71.8671 37.3407C71.584 37.0622 71.1235 37.0622 70.8403 37.3407C70.5571 37.6191 70.5571 38.072 70.8403 38.3504C71.1235 38.6289 71.584 38.6289 71.8671 38.3504Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M66.142 38.9012C65.9362 39.3236 65.7813 39.7739 65.6875 40.2462C65.9569 40.3697 66.2866 40.324 66.5086 40.1048C66.7918 39.8264 66.7918 39.3735 66.5086 39.0951C66.4045 38.9926 66.2762 38.9275 66.142 38.9004V38.9012Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M65.6865 42.4685C65.7812 42.9399 65.9353 43.391 66.141 43.8134C66.2753 43.7863 66.4035 43.722 66.5076 43.6187C66.7908 43.3403 66.7908 42.8874 66.5076 42.609C66.2856 42.3906 65.9551 42.3441 65.6865 42.4676V42.4685Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M70.0814 36.5936C70.3034 36.3752 70.3508 36.0502 70.2251 35.7861C69.7457 35.8792 69.2869 36.0307 68.8574 36.233C68.885 36.3651 68.9504 36.4903 69.0554 36.5936C69.3386 36.8721 69.799 36.8721 70.0822 36.5936H70.0814Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M70.8403 44.3651C70.5571 44.6436 70.5571 45.0964 70.8403 45.3748C71.1235 45.6533 71.584 45.6533 71.8671 45.3748C72.1503 45.0964 72.1503 44.6436 71.8671 44.3651C71.584 44.0866 71.1235 44.0866 70.8403 44.3651Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M74.4136 41.8631C74.6967 42.1416 75.1572 42.1416 75.4404 41.8631C75.7236 41.5847 75.7236 41.1318 75.4404 40.8534C75.1572 40.5749 74.6967 40.5749 74.4136 40.8534C74.1304 41.1318 74.1304 41.5847 74.4136 41.8631Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M75.4394 38.3504C75.7226 38.072 75.7226 37.6191 75.4394 37.3407C75.1562 37.0622 74.6958 37.0622 74.4126 37.3407C74.1294 37.6191 74.1294 38.072 74.4126 38.3504C74.6958 38.6289 75.1562 38.6289 75.4394 38.3504Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M72.6262 46.1221C72.4041 46.3404 72.3568 46.6654 72.4824 46.9304C72.9619 46.8373 73.4206 46.6858 73.8501 46.4835C73.8226 46.3514 73.7572 46.2262 73.6522 46.1229C73.369 45.8444 72.9085 45.8444 72.6253 46.1229L72.6262 46.1221Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M70.8423 40.8553C70.5591 41.1338 70.5591 41.5866 70.8423 41.8651C71.1254 42.1435 71.5859 42.1435 71.8691 41.8651C72.1523 41.5866 72.1523 41.1338 71.8691 40.8553C71.5859 40.5769 71.1254 40.5769 70.8423 40.8553Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M72.6274 39.0985C72.3442 39.377 72.3442 39.8298 72.6274 40.1082C72.9106 40.3867 73.3711 40.3867 73.6543 40.1082C73.9374 39.8298 73.9374 39.377 73.6543 39.0985C73.3711 38.82 72.9106 38.82 72.6274 39.0985Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M73.6533 36.5926C73.7575 36.4902 73.8238 36.3641 73.8513 36.2321C73.4218 36.0298 72.9639 35.8774 72.4836 35.7852C72.358 36.0501 72.4044 36.3742 72.6274 36.5926C72.9105 36.8711 73.371 36.8711 73.6542 36.5926H73.6533Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M67.269 40.8524C66.9858 41.1309 66.9858 41.5837 67.269 41.8622C67.5522 42.1406 68.0127 42.1406 68.2959 41.8622C68.579 41.5837 68.579 41.1309 68.2959 40.8524C68.0127 40.5739 67.5522 40.5739 67.269 40.8524Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M72.6274 42.6112C72.3442 42.8897 72.3442 43.3425 72.6274 43.6209C72.9106 43.8994 73.3711 43.8994 73.6543 43.6209C73.9374 43.3425 73.9374 42.8897 73.6543 42.6112C73.3711 42.3327 72.9106 42.3327 72.6274 42.6112Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M69.0544 46.1229C68.9503 46.2253 68.884 46.3514 68.8564 46.4835C69.2859 46.6858 69.7438 46.8381 70.2241 46.9304C70.3498 46.6654 70.3033 46.3413 70.0804 46.1229C69.7972 45.8444 69.3367 45.8444 69.0535 46.1229H69.0544Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M67.27 37.3417C66.9868 37.6201 66.9868 38.0729 67.27 38.3514C67.5532 38.6299 68.0137 38.6299 68.2968 38.3514C68.58 38.0729 68.58 37.6201 68.2968 37.3417C68.0137 37.0632 67.5532 37.0632 67.27 37.3417Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M76.1997 39.0971C75.9165 39.3756 75.9165 39.8284 76.1997 40.1069C76.4218 40.3253 76.7523 40.3718 77.0208 40.2482C76.9261 39.7768 76.7721 39.3257 76.5664 38.9033C76.4321 38.9304 76.3047 38.9947 76.1997 39.098V39.0971Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M76.1997 42.6103C75.9165 42.8888 75.9165 43.3416 76.1997 43.62C76.3038 43.7225 76.4321 43.7876 76.5664 43.8147C76.7721 43.3924 76.927 42.9421 77.0208 42.4698C76.7514 42.3462 76.4218 42.3919 76.1997 42.6111V42.6103Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M74.4145 44.3671C74.1314 44.6455 74.1314 45.0983 74.4145 45.3768C74.6977 45.6553 75.1582 45.6553 75.4414 45.3768C75.7245 45.0983 75.7245 44.6455 75.4414 44.3671C75.1582 44.0886 74.6977 44.0886 74.4145 44.3671Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M69.0561 39.0985C68.773 39.377 68.773 39.8298 69.0561 40.1082C69.3393 40.3867 69.7998 40.3867 70.083 40.1082C70.3661 39.8298 70.3661 39.377 70.083 39.0985C69.7998 38.82 69.3393 38.82 69.0561 39.0985Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M69.0552 42.6092C68.772 42.8877 68.772 43.3405 69.0552 43.619C69.3383 43.8975 69.7988 43.8975 70.082 43.619C70.3652 43.3405 70.3652 42.8877 70.082 42.6092C69.7988 42.3308 69.3383 42.3308 69.0552 42.6092Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M2.79634 39.7412C1.71958 39.7412 1.3314 40.3879 1.12999 40.7408H1.03531V39.8157H-0.0664062V47.6601H1.06286V44.6334H1.12999C1.33398 44.9973 1.75057 45.633 2.80753 45.633C4.21308 45.633 5.23217 44.5259 5.23217 42.6799C5.23217 40.8339 4.19759 39.7421 2.79634 39.7421V39.7412ZM2.55448 44.685C1.58359 44.685 1.04048 43.8674 1.04048 42.668C1.04048 41.4687 1.56896 40.6849 2.55448 40.6849C3.54 40.6849 4.09086 41.5356 4.09086 42.668C4.09086 43.8005 3.56238 44.685 2.55448 44.685Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M9.1691 39.7412C7.53288 39.7412 6.46387 40.9185 6.46387 42.6934C6.46387 44.4683 7.53288 45.6355 9.1691 45.6355C10.8053 45.6355 11.8743 44.4582 11.8743 42.6934C11.8743 40.9287 10.8053 39.7412 9.1691 39.7412ZM9.17255 44.7028C8.10353 44.7028 7.60518 43.7853 7.60518 42.6892C7.60518 41.5931 8.10353 40.6689 9.17255 40.6689C10.2416 40.6689 10.7322 41.5974 10.7322 42.6892C10.7322 43.7811 10.2338 44.7028 9.17255 44.7028Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M18.5886 43.9865H18.5327L17.3991 39.8154H16.2328L15.0907 44.0051H15.0339L13.8977 39.8154H12.7314L14.4382 45.5201H15.5856L16.7648 41.4016H16.8508L18.0292 45.5201H19.1817L20.885 39.8154H19.7188L18.5886 43.9865Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M24.4292 39.7412C22.8128 39.7412 21.748 40.9516 21.748 42.7053C21.748 44.459 22.7981 45.6355 24.5092 45.6355C25.7753 45.6355 26.6696 45.0227 26.9261 44.0942L25.8571 43.9046C25.6531 44.4429 25.1617 44.718 24.5204 44.718C23.5538 44.718 22.904 44.101 22.8747 43.0024H26.9993V42.6088C26.9993 40.547 25.7444 39.7412 24.43 39.7412H24.4292ZM22.8764 42.1704C22.9229 41.3604 23.5194 40.6587 24.4361 40.6587C25.3527 40.6587 25.8864 41.2977 25.8915 42.1704H22.8764Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M29.6359 40.7226H29.5748V39.8161H28.4834V45.5208H29.6127V42.037C29.6127 41.2905 30.1979 40.7522 30.9993 40.7522C31.2334 40.7522 31.4976 40.7928 31.5871 40.8191V39.7568C31.4753 39.7424 31.2506 39.7314 31.1086 39.7314C30.4286 39.7314 29.8468 40.1098 29.6359 40.7226Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M35.0005 39.7412C33.3832 39.7412 32.3193 40.9516 32.3193 42.7053C32.3193 44.459 33.3685 45.6355 35.0805 45.6355C36.3449 45.6355 37.2409 45.0227 37.4974 44.0942L36.4284 43.9046C36.2244 44.4429 35.7329 44.718 35.09 44.718C34.1234 44.718 33.4736 44.101 33.4443 43.0024H37.5689V42.6088C37.5689 40.547 36.3139 39.7412 35.0005 39.7412ZM33.4477 42.1704C33.4925 41.3604 34.0907 40.6587 35.0074 40.6587C35.924 40.6587 36.4577 41.2977 36.4611 42.1704H33.4469H33.4477Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M42.97 40.741H42.9011C42.698 40.3881 42.3115 39.7414 41.2331 39.7414C39.8301 39.7414 38.7998 40.8299 38.7998 42.6793C38.7998 44.5286 39.8154 45.6323 41.2244 45.6323C42.2823 45.6323 42.6989 44.9967 42.902 44.6327H42.9967V45.5206H44.0992V37.9141H42.97V40.741ZM41.4749 44.6852C40.4653 44.6852 39.9394 43.8126 39.9394 42.6683C39.9394 41.5239 40.4541 40.6852 41.4749 40.6852C42.4957 40.6852 42.9889 41.4757 42.9889 42.6683C42.9889 43.8608 42.4492 44.6852 41.4749 44.6852Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M51.926 39.7414C50.8492 39.7414 50.4611 40.3881 50.2596 40.741H50.1908V37.9141H49.0615V45.5206H50.1641V44.6327H50.2588C50.4619 44.9967 50.8776 45.6323 51.9363 45.6323C53.341 45.6323 54.361 44.5253 54.361 42.6793C54.361 40.8333 53.3255 39.7414 51.9251 39.7414H51.926ZM51.6841 44.6852C50.7124 44.6852 50.1693 43.8676 50.1693 42.6683C50.1693 41.4689 50.6978 40.6852 51.6841 40.6852C52.6705 40.6852 53.2214 41.5358 53.2214 42.6683C53.2214 43.8007 52.692 44.6852 51.6841 44.6852Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                    <path d="M57.9322 44.2429H57.8711L56.4018 39.8154H55.1934L57.3167 45.5946L57.1773 45.9738C56.8898 46.7313 56.4844 46.794 55.8664 46.6272L55.5945 47.5371C55.7287 47.5963 56.024 47.6598 56.3648 47.6598C57.297 47.6598 57.8874 47.1808 58.2222 46.2819L60.6133 39.8154H59.4005L57.9313 44.2429H57.9322Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2510_3763">
                                                        <rect width="98" height="48" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Link>
                                    </div>
                                </nav>
                            </aside>
                            <div className={`flex lg-up:justify-between lg-up:items-center lg:flex-wrap lg:mt-3 lg-up:z-0 transition-all ${isScrolled ? 'lg-up:translate-y-[0]' : 'lg-up:translate-y-[-112px]'}`}>
                                {/* <div className={`flex lg-up:justify-between lg-up:items-center lg:flex-wrap lg-up:z-0 transition-all`}> */}
                                <div className='lg:mx-5 items-center relative hidden'>
                                    <div className={`lg-up:translate-x-8 transition-all`}>
                                        <form className=''>
                                            <input type='search' id='search' aria-label="first link" name='search' placeholder='search for' className={`py-2 border-solid border-2 border-white rounded-3xl lg-up:text-white lg:text-black lg:bg-skyblue lg-up:bg-transparent focus:outline-none transition-all lg:w-56 lg:pl-3 lg:pr-10 ${expanded ? 'lg-up:visible lg-up:w-80 w-72 pl-2 pr-10' : 'lg-up:w-0 lg-up:invisible'}`} />
                                            <input type='submit' id='submit' aria-label="first link" className={`h-5 w-5 mr-5 cursor-pointer border-0 ${expanded ? 'lg-up:visible' : 'lg-up:invisible'}`} />
                                        </form>
                                    </div>
                                    <div onClick={handleSearchClick} className='lg:hidden cursor-pointer'>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.70833 15.0417C12.2061 15.0417 15.0417 12.2061 15.0417 8.70833C15.0417 5.21053 12.2061 2.375 8.70833 2.375C5.21053 2.375 2.375 5.21053 2.375 8.70833C2.375 12.2061 5.21053 15.0417 8.70833 15.0417Z" stroke={strokeColorBlack} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.6254 16.625L13.1816 13.1812" stroke={strokeColorBlack} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={`${styles.btnWrap} lg-up:mx-5 lg:my-5 lg:order-1 lg:flex-none lg:flex-shrink-0 lg:text-center lg:w-full`}>
                                    <Btn_Pink text='Speak to an expert' link='/contact-us' target="_blank" />
                                </div>
                                <Link href={'https://console.sift.com/login?_gl=1*4om7dj*_ga*MjEwNTQyODU2LjE2OTg2OTA0MjA.*_ga_R8SV2EK5NZ*MTcwNjYzODY3OC4zNC4xLjE3MDY2Mzg2OTAuMC4wLjA'} aria-label="first link" className='login transition-all lg:mt-4 lg:pl-12' target="_blank">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 21.5V19.5C20 18.4391 19.5786 17.4217 18.8284 16.6716C18.0783 15.9214 17.0609 15.5 16 15.5H8C6.93913 15.5 5.92172 15.9214 5.17157 16.6716C4.42143 17.4217 4 18.4391 4 19.5V21.5" stroke={strokeColorBlack} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lg:stroke-[#000!important] ${scrolled ? 'lg-up:stroke-[#fff]' : ''}`} />
                                        <path d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z" stroke={strokeColorBlack} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lg:stroke-[#000!important] ${scrolled ? 'lg-up:stroke-[#fff]' : ''}`} />
                                    </svg>
                                </Link>
                                {/* </div> */}

                            </div>
                        </div>
                        <div className='fibr-logo w-full self-end lg-up:hidden lg:pb-16'>
                            <Link href={'/fibr-fraud-industry-benchmarking-resource'} className='group block pt-3 pr-4 pb-3 pl-6 rounded-tr-[100px] rounded-br-[100px] hover:bg-black transition-all duration-300 text-[0]'>
                                .
                                <svg width="98" height="48" viewBox="0 0 98 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2510_3763)">
                                        <path d="M3.65332 8.2037H27.3067L28.6649 0.339844H5.01153L3.65332 8.2037Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M18.5161 10.6621H3.34942L1.99121 18.5251H17.1579L18.5161 10.6621Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M10.3301 20.7637H1.75567L0.397461 28.6275H8.97193L10.3301 20.7637Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M41.2151 0.364258H33.4359L28.6787 28.5407H36.4579L41.2151 0.364258Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M59.7012 0.364258H47.2767L42.5195 28.5407H56.0078C62.2188 28.5407 66.6403 25.1839 67.4244 20.5618C68.0958 16.5998 65.5782 13.9582 61.8831 13.8482L61.939 13.5731C65.3535 12.9121 67.9839 10.4914 68.5433 7.40965C69.2706 3.11758 66.2487 0.36595 59.7003 0.36595L59.7012 0.364258ZM59.3655 19.5707C59.0858 21.442 57.5743 22.4323 54.9999 22.4323H51.3625L52.3136 16.4889H56.0638C58.4703 16.4889 59.7012 17.5892 59.3655 19.5707ZM60.2606 9.05927C59.9809 10.7656 58.3567 11.7559 56.3435 11.7559H53.1528L54.048 6.36266H57.3497C59.2519 6.36266 60.5404 7.29792 60.2598 9.05927H60.2606Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M83.2456 19.2406L86.7005 28.5407H95.1502L91.1065 18.0294C94.3945 16.5854 96.6891 13.8473 97.3321 9.93952C98.34 3.94112 94.7026 0.364258 88.3221 0.364258H75.9544L71.1973 28.5407H78.9764L80.5576 19.2406H83.2439H83.2456ZM82.7283 6.47354H85.4705C88.1568 6.47354 89.6123 7.51883 89.219 9.94037C88.8273 12.3619 87.0371 13.2972 84.2948 13.2972H81.5663L82.7283 6.47354Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M83.054 41.6932H83.0471L81.9222 41.4443C81.5486 41.3555 81.2784 41.2437 81.1105 41.1092C80.9435 40.9746 80.86 40.7969 80.86 40.5776C80.86 40.3229 80.9857 40.1138 81.2353 39.9505C81.4849 39.7871 81.7956 39.7058 82.1658 39.7058C82.4395 39.7058 82.6693 39.749 82.8526 39.837C83.0368 39.9251 83.1823 40.0368 83.2907 40.1747C83.3716 40.278 83.4362 40.3838 83.4826 40.4938C83.499 40.5311 83.5128 40.5692 83.5248 40.6081H84.8787C84.8675 40.5438 84.8555 40.4769 84.8374 40.4058C84.8039 40.2662 84.7591 40.135 84.7057 40.0097C84.5465 39.6364 84.3046 39.3368 83.9715 39.0905C83.5283 38.763 82.9206 38.5996 82.1494 38.5996C81.6149 38.5996 81.1424 38.6851 80.7301 38.8569C80.3187 39.0287 79.9967 39.2683 79.7635 39.5755C79.532 39.8827 79.4149 40.2416 79.4149 40.6513C79.4149 41.1439 79.5715 41.551 79.884 41.8726C80.1964 42.1934 80.6827 42.4262 81.342 42.5692L82.5264 42.8248C82.8569 42.8968 83.1039 43.0034 83.2649 43.1448C83.4258 43.2869 83.5059 43.4638 83.5059 43.6754C83.5059 43.9319 83.3759 44.1494 83.1168 44.3272C82.8569 44.5049 82.5109 44.5938 82.0762 44.5938C81.6751 44.5938 81.3498 44.51 81.0993 44.3407C80.848 44.1714 80.6819 43.9217 80.6001 43.59H79.1816C79.1816 43.6526 79.1851 43.7169 79.1963 43.7795C79.2514 44.0885 79.3555 44.3627 79.5096 44.6014C79.6628 44.8401 79.8668 45.0441 80.119 45.2133C80.6242 45.5511 81.2792 45.7195 82.084 45.7195C82.6572 45.7195 83.1616 45.6272 83.5963 45.4427C84.0309 45.2574 84.3718 45.0034 84.6188 44.6801C84.8667 44.3559 84.9898 43.9844 84.9898 43.5637C84.9898 43.0753 84.8297 42.6767 84.5112 42.3695C84.1927 42.0622 83.7064 41.8362 83.054 41.6923V41.6932Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M86.4248 45.6693V45.6701H87.8949V38.7119H86.4248V45.6693Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M97.7718 44.4044C97.7254 44.4162 97.6599 44.4298 97.5756 44.4433C97.4904 44.4569 97.3923 44.4636 97.2804 44.4636C97.1306 44.4636 96.992 44.4408 96.8664 44.3959C96.7398 44.3511 96.6374 44.2647 96.56 44.1369C96.4816 44.0091 96.4429 43.8204 96.4429 43.5715V39.7958H97.913V38.621H96.4429V37.0848H94.9728V38.621H92.1238V37.7077C92.1238 37.4089 92.1944 37.2422 92.3364 37.0839C92.4776 36.9256 92.7151 36.8461 93.0482 36.8461C93.192 36.8461 93.3142 36.8579 93.4183 36.8825C93.5225 36.907 93.6077 36.929 93.6722 36.9502L94.0036 35.8093C93.9038 35.7729 93.7514 35.7331 93.5466 35.6891C93.3409 35.6459 93.0956 35.623 92.8089 35.623C92.4199 35.623 92.0618 35.6958 91.7356 35.8423C91.4086 35.9887 91.1469 36.2088 90.9498 36.5041C90.7527 36.7987 90.6537 37.1482 90.6537 37.5884V38.621H89.1836V39.7958H90.6537V45.5792H92.1238V39.7958H94.9728V43.8449C94.9762 44.2681 95.0606 44.6202 95.2594 44.8995C95.4574 45.1788 95.719 45.3854 96.0427 45.5191C96.3663 45.6528 96.72 45.7172 97.1039 45.7104C97.332 45.7045 97.5231 45.6833 97.678 45.652C97.833 45.6207 97.9724 45.5851 98.0671 45.5572L97.7736 44.4035L97.7718 44.4044Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M87.1894 36.2471C86.7083 36.2471 86.3184 36.6305 86.3184 37.1036C86.3184 37.5768 86.7083 37.9602 87.1894 37.9602C87.6705 37.9602 88.0605 37.5768 88.0605 37.1036C88.0605 36.6305 87.6705 36.2471 87.1894 36.2471Z" fill="black" className='group-hover:fill-white transition-all duration-300 ' />
                                        <path d="M67.269 44.3661C66.9858 44.6445 66.9858 45.0974 67.269 45.3758C67.5522 45.6543 68.0127 45.6543 68.2959 45.3758C68.579 45.0974 68.579 44.6445 68.2959 44.3661C68.0127 44.0876 67.5522 44.0876 67.269 44.3661Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M71.8671 38.3504C72.1503 38.072 72.1503 37.6191 71.8671 37.3407C71.584 37.0622 71.1235 37.0622 70.8403 37.3407C70.5571 37.6191 70.5571 38.072 70.8403 38.3504C71.1235 38.6289 71.584 38.6289 71.8671 38.3504Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M66.142 38.9012C65.9362 39.3236 65.7813 39.7739 65.6875 40.2462C65.9569 40.3697 66.2866 40.324 66.5086 40.1048C66.7918 39.8264 66.7918 39.3735 66.5086 39.0951C66.4045 38.9926 66.2762 38.9275 66.142 38.9004V38.9012Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M65.6865 42.4685C65.7812 42.9399 65.9353 43.391 66.141 43.8134C66.2753 43.7863 66.4035 43.722 66.5076 43.6187C66.7908 43.3403 66.7908 42.8874 66.5076 42.609C66.2856 42.3906 65.9551 42.3441 65.6865 42.4676V42.4685Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M70.0814 36.5936C70.3034 36.3752 70.3508 36.0502 70.2251 35.7861C69.7457 35.8792 69.2869 36.0307 68.8574 36.233C68.885 36.3651 68.9504 36.4903 69.0554 36.5936C69.3386 36.8721 69.799 36.8721 70.0822 36.5936H70.0814Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M70.8403 44.3651C70.5571 44.6436 70.5571 45.0964 70.8403 45.3748C71.1235 45.6533 71.584 45.6533 71.8671 45.3748C72.1503 45.0964 72.1503 44.6436 71.8671 44.3651C71.584 44.0866 71.1235 44.0866 70.8403 44.3651Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M74.4136 41.8631C74.6967 42.1416 75.1572 42.1416 75.4404 41.8631C75.7236 41.5847 75.7236 41.1318 75.4404 40.8534C75.1572 40.5749 74.6967 40.5749 74.4136 40.8534C74.1304 41.1318 74.1304 41.5847 74.4136 41.8631Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M75.4394 38.3504C75.7226 38.072 75.7226 37.6191 75.4394 37.3407C75.1562 37.0622 74.6958 37.0622 74.4126 37.3407C74.1294 37.6191 74.1294 38.072 74.4126 38.3504C74.6958 38.6289 75.1562 38.6289 75.4394 38.3504Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M72.6262 46.1221C72.4041 46.3404 72.3568 46.6654 72.4824 46.9304C72.9619 46.8373 73.4206 46.6858 73.8501 46.4835C73.8226 46.3514 73.7572 46.2262 73.6522 46.1229C73.369 45.8444 72.9085 45.8444 72.6253 46.1229L72.6262 46.1221Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M70.8423 40.8553C70.5591 41.1338 70.5591 41.5866 70.8423 41.8651C71.1254 42.1435 71.5859 42.1435 71.8691 41.8651C72.1523 41.5866 72.1523 41.1338 71.8691 40.8553C71.5859 40.5769 71.1254 40.5769 70.8423 40.8553Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M72.6274 39.0985C72.3442 39.377 72.3442 39.8298 72.6274 40.1082C72.9106 40.3867 73.3711 40.3867 73.6543 40.1082C73.9374 39.8298 73.9374 39.377 73.6543 39.0985C73.3711 38.82 72.9106 38.82 72.6274 39.0985Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M73.6533 36.5926C73.7575 36.4902 73.8238 36.3641 73.8513 36.2321C73.4218 36.0298 72.9639 35.8774 72.4836 35.7852C72.358 36.0501 72.4044 36.3742 72.6274 36.5926C72.9105 36.8711 73.371 36.8711 73.6542 36.5926H73.6533Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M67.269 40.8524C66.9858 41.1309 66.9858 41.5837 67.269 41.8622C67.5522 42.1406 68.0127 42.1406 68.2959 41.8622C68.579 41.5837 68.579 41.1309 68.2959 40.8524C68.0127 40.5739 67.5522 40.5739 67.269 40.8524Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M72.6274 42.6112C72.3442 42.8897 72.3442 43.3425 72.6274 43.6209C72.9106 43.8994 73.3711 43.8994 73.6543 43.6209C73.9374 43.3425 73.9374 42.8897 73.6543 42.6112C73.3711 42.3327 72.9106 42.3327 72.6274 42.6112Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M69.0544 46.1229C68.9503 46.2253 68.884 46.3514 68.8564 46.4835C69.2859 46.6858 69.7438 46.8381 70.2241 46.9304C70.3498 46.6654 70.3033 46.3413 70.0804 46.1229C69.7972 45.8444 69.3367 45.8444 69.0535 46.1229H69.0544Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M67.27 37.3417C66.9868 37.6201 66.9868 38.0729 67.27 38.3514C67.5532 38.6299 68.0137 38.6299 68.2968 38.3514C68.58 38.0729 68.58 37.6201 68.2968 37.3417C68.0137 37.0632 67.5532 37.0632 67.27 37.3417Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M76.1997 39.0971C75.9165 39.3756 75.9165 39.8284 76.1997 40.1069C76.4218 40.3253 76.7523 40.3718 77.0208 40.2482C76.9261 39.7768 76.7721 39.3257 76.5664 38.9033C76.4321 38.9304 76.3047 38.9947 76.1997 39.098V39.0971Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M76.1997 42.6103C75.9165 42.8888 75.9165 43.3416 76.1997 43.62C76.3038 43.7225 76.4321 43.7876 76.5664 43.8147C76.7721 43.3924 76.927 42.9421 77.0208 42.4698C76.7514 42.3462 76.4218 42.3919 76.1997 42.6111V42.6103Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M74.4145 44.3671C74.1314 44.6455 74.1314 45.0983 74.4145 45.3768C74.6977 45.6553 75.1582 45.6553 75.4414 45.3768C75.7245 45.0983 75.7245 44.6455 75.4414 44.3671C75.1582 44.0886 74.6977 44.0886 74.4145 44.3671Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M69.0561 39.0985C68.773 39.377 68.773 39.8298 69.0561 40.1082C69.3393 40.3867 69.7998 40.3867 70.083 40.1082C70.3661 39.8298 70.3661 39.377 70.083 39.0985C69.7998 38.82 69.3393 38.82 69.0561 39.0985Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M69.0552 42.6092C68.772 42.8877 68.772 43.3405 69.0552 43.619C69.3383 43.8975 69.7988 43.8975 70.082 43.619C70.3652 43.3405 70.3652 42.8877 70.082 42.6092C69.7988 42.3308 69.3383 42.3308 69.0552 42.6092Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M2.79634 39.7412C1.71958 39.7412 1.3314 40.3879 1.12999 40.7408H1.03531V39.8157H-0.0664062V47.6601H1.06286V44.6334H1.12999C1.33398 44.9973 1.75057 45.633 2.80753 45.633C4.21308 45.633 5.23217 44.5259 5.23217 42.6799C5.23217 40.8339 4.19759 39.7421 2.79634 39.7421V39.7412ZM2.55448 44.685C1.58359 44.685 1.04048 43.8674 1.04048 42.668C1.04048 41.4687 1.56896 40.6849 2.55448 40.6849C3.54 40.6849 4.09086 41.5356 4.09086 42.668C4.09086 43.8005 3.56238 44.685 2.55448 44.685Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M9.1691 39.7412C7.53288 39.7412 6.46387 40.9185 6.46387 42.6934C6.46387 44.4683 7.53288 45.6355 9.1691 45.6355C10.8053 45.6355 11.8743 44.4582 11.8743 42.6934C11.8743 40.9287 10.8053 39.7412 9.1691 39.7412ZM9.17255 44.7028C8.10353 44.7028 7.60518 43.7853 7.60518 42.6892C7.60518 41.5931 8.10353 40.6689 9.17255 40.6689C10.2416 40.6689 10.7322 41.5974 10.7322 42.6892C10.7322 43.7811 10.2338 44.7028 9.17255 44.7028Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M18.5886 43.9865H18.5327L17.3991 39.8154H16.2328L15.0907 44.0051H15.0339L13.8977 39.8154H12.7314L14.4382 45.5201H15.5856L16.7648 41.4016H16.8508L18.0292 45.5201H19.1817L20.885 39.8154H19.7188L18.5886 43.9865Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M24.4292 39.7412C22.8128 39.7412 21.748 40.9516 21.748 42.7053C21.748 44.459 22.7981 45.6355 24.5092 45.6355C25.7753 45.6355 26.6696 45.0227 26.9261 44.0942L25.8571 43.9046C25.6531 44.4429 25.1617 44.718 24.5204 44.718C23.5538 44.718 22.904 44.101 22.8747 43.0024H26.9993V42.6088C26.9993 40.547 25.7444 39.7412 24.43 39.7412H24.4292ZM22.8764 42.1704C22.9229 41.3604 23.5194 40.6587 24.4361 40.6587C25.3527 40.6587 25.8864 41.2977 25.8915 42.1704H22.8764Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M29.6359 40.7226H29.5748V39.8161H28.4834V45.5208H29.6127V42.037C29.6127 41.2905 30.1979 40.7522 30.9993 40.7522C31.2334 40.7522 31.4976 40.7928 31.5871 40.8191V39.7568C31.4753 39.7424 31.2506 39.7314 31.1086 39.7314C30.4286 39.7314 29.8468 40.1098 29.6359 40.7226Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M35.0005 39.7412C33.3832 39.7412 32.3193 40.9516 32.3193 42.7053C32.3193 44.459 33.3685 45.6355 35.0805 45.6355C36.3449 45.6355 37.2409 45.0227 37.4974 44.0942L36.4284 43.9046C36.2244 44.4429 35.7329 44.718 35.09 44.718C34.1234 44.718 33.4736 44.101 33.4443 43.0024H37.5689V42.6088C37.5689 40.547 36.3139 39.7412 35.0005 39.7412ZM33.4477 42.1704C33.4925 41.3604 34.0907 40.6587 35.0074 40.6587C35.924 40.6587 36.4577 41.2977 36.4611 42.1704H33.4469H33.4477Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M42.97 40.741H42.9011C42.698 40.3881 42.3115 39.7414 41.2331 39.7414C39.8301 39.7414 38.7998 40.8299 38.7998 42.6793C38.7998 44.5286 39.8154 45.6323 41.2244 45.6323C42.2823 45.6323 42.6989 44.9967 42.902 44.6327H42.9967V45.5206H44.0992V37.9141H42.97V40.741ZM41.4749 44.6852C40.4653 44.6852 39.9394 43.8126 39.9394 42.6683C39.9394 41.5239 40.4541 40.6852 41.4749 40.6852C42.4957 40.6852 42.9889 41.4757 42.9889 42.6683C42.9889 43.8608 42.4492 44.6852 41.4749 44.6852Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M51.926 39.7414C50.8492 39.7414 50.4611 40.3881 50.2596 40.741H50.1908V37.9141H49.0615V45.5206H50.1641V44.6327H50.2588C50.4619 44.9967 50.8776 45.6323 51.9363 45.6323C53.341 45.6323 54.361 44.5253 54.361 42.6793C54.361 40.8333 53.3255 39.7414 51.9251 39.7414H51.926ZM51.6841 44.6852C50.7124 44.6852 50.1693 43.8676 50.1693 42.6683C50.1693 41.4689 50.6978 40.6852 51.6841 40.6852C52.6705 40.6852 53.2214 41.5358 53.2214 42.6683C53.2214 43.8007 52.692 44.6852 51.6841 44.6852Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                        <path d="M57.9322 44.2429H57.8711L56.4018 39.8154H55.1934L57.3167 45.5946L57.1773 45.9738C56.8898 46.7313 56.4844 46.794 55.8664 46.6272L55.5945 47.5371C55.7287 47.5963 56.024 47.6598 56.3648 47.6598C57.297 47.6598 57.8874 47.1808 58.2222 46.2819L60.6133 39.8154H59.4005L57.9313 44.2429H57.9322Z" fill="black" className='group-hover:fill-white transition-all duration-300' />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2510_3763">
                                            <rect width="98" height="48" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <button aria-label="first link" className={`menu-toggle w-9 h-[25px] relative transition-transform duration-500 cursor-pointer lg-up:hidden ${isMenuOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
                        <ul>
                            <li className={`h-0.5 absolute w-full transition-all duration-300 ease-in-out ${toggleBtnColor} ${scrolled ? '!bg-white' : ''} ${isMenuOpen ? 'menu-open transform rotate-[135deg] top-3' : 'top-0'}`}></li>
                            <li className={`h-0.5 absolute w-full transition-all duration-300 ease-in-out ${toggleBtnColor} ${scrolled ? '!bg-white' : ''} ${isMenuOpen ? 'menu-open opacity-0 left-[-60px]' : 'top-[11px] left-0'}`}></li>
                            <li className={`h-0.5 absolute w-full transition-all duration-300 ease-in-out ${toggleBtnColor} ${scrolled ? '!bg-white' : ''} ${isMenuOpen ? 'menu-open transform rotate-[-135deg] top-3' : 'top-[22px]'}`}></li>
                        </ul>
                    </button>
                </div>
            </div>
        </header>
    );
}

