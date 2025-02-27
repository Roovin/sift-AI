import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '../../styles/popups/popups.module.css';
import DynamicButton from '../global-components/Buttons';
export default function SidebarPopup(props) {
	let data = props.items;
	const [isRemovePopup, setRemovePopup] = useState(true);
	const removePopup = (val) => {
		setRemovePopup(val);
	}
	return (
		<section className={`Popup z-[99] p-0 ${data?.backgroundColor== 'white' ? 'bg-white' : 'bg-oceanGreen'} ${isRemovePopup === true ? '' : 'hidden'}  text-black fixed md:absolute top-[160px] right-[0] w-[545px] sm:w-fit sm:mx-[20px] sm:rounded-[16px] wide-screen:w-[800px] h-fit border-[2px] border-black rounded-tl-[16px] rounded-bl-[16px]`}>
			<div className={`popupWrap`}>
				<div className={`imgWithContent pt-[37px] pb-[34px] px-[30px] sm:p-[20px]`}>
					<div className="crossBtn w-fit ml-auto cursor-pointer absolute top-[22px] group right-[20px] sm:w-[30px]" onClick={() => removePopup(false)}>
						<svg width="40" height="40" className='sm:w-[30px] sm:h-[30px]' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.8802 15.1879L22.0663 20L26.8802 24.8121C27.016 24.9479 27.1237 25.1091 27.1972 25.2865C27.2707 25.464 27.3085 25.6541 27.3085 25.8461C27.3085 26.0382 27.2707 26.2283 27.1972 26.4058C27.1237 26.5832 27.016 26.7444 26.8802 26.8802C26.7444 27.016 26.5832 27.1237 26.4058 27.1972C26.2284 27.2707 26.0382 27.3085 25.8462 27.3085C25.6541 27.3085 25.464 27.2707 25.2865 27.1972C25.1091 27.1237 24.9479 27.016 24.8121 26.8802L20 22.0662L15.1879 26.8802C15.0521 27.016 14.8909 27.1237 14.7135 27.1972C14.536 27.2707 14.3459 27.3085 14.1539 27.3085C13.9618 27.3085 13.7717 27.2707 13.5942 27.1972C13.4168 27.1237 13.2556 27.016 13.1198 26.8802C12.984 26.7444 12.8763 26.5832 12.8028 26.4058C12.7293 26.2283 12.6915 26.0382 12.6915 25.8461C12.6915 25.6541 12.7293 25.464 12.8028 25.2865C12.8763 25.1091 12.984 24.9479 13.1198 24.8121L17.9338 20L13.1198 15.1879C12.8456 14.9136 12.6915 14.5417 12.6915 14.1538C12.6915 13.766 12.8456 13.394 13.1198 13.1198C13.3941 12.8456 13.766 12.6915 14.1539 12.6915C14.5417 12.6915 14.9136 12.8456 15.1879 13.1198L20 17.9337L24.8121 13.1198C24.9479 12.984 25.1091 12.8763 25.2865 12.8028C25.464 12.7293 25.6541 12.6915 25.8462 12.6915C26.0382 12.6915 26.2284 12.7293 26.4058 12.8028C26.5832 12.8763 26.7444 12.984 26.8802 13.1198C27.016 13.2556 27.1237 13.4168 27.1972 13.5942C27.2707 13.7716 27.3085 13.9618 27.3085 14.1538C27.3085 14.3459 27.2707 14.536 27.1972 14.7135C27.1237 14.8909 27.016 15.0521 26.8802 15.1879ZM39 20C39 23.7578 37.8857 27.4313 35.7979 30.5558C33.7102 33.6804 30.7428 36.1156 27.271 37.5537C23.7992 38.9918 19.9789 39.368 16.2933 38.6349C12.6077 37.9018 9.22218 36.0922 6.56498 33.435C3.90778 30.7778 2.09821 27.3924 1.36509 23.7067C0.631969 20.0211 1.00823 16.2008 2.4463 12.729C3.88436 9.25722 6.31964 6.28982 9.44417 4.20208C12.5687 2.11433 16.2422 1 20 1C25.0375 1.00532 29.8671 3.00881 33.4292 6.57085C36.9912 10.1329 38.9947 14.9625 39 20ZM36.0769 20C36.0769 16.8203 35.134 13.712 33.3675 11.0681C31.6009 8.4243 29.09 6.36368 26.1524 5.14686C23.2147 3.93004 19.9822 3.61166 16.8636 4.23199C13.7449 4.85232 10.8803 6.3835 8.63191 8.6319C6.38351 10.8803 4.85233 13.7449 4.232 16.8635C3.61167 19.9822 3.93004 23.2147 5.14687 26.1524C6.36369 29.09 8.42431 31.6009 11.0681 33.3675C13.712 35.134 16.8203 36.0769 20 36.0769C24.2624 36.0721 28.3488 34.3767 31.3628 31.3628C34.3767 28.3488 36.0721 24.2624 36.0769 20Z" className='group-hover:fill-[#ff3b84]' fill="black" /></svg>
					</div>
					<div className="icon-wrapper mb-[16px] sm:w-[40px] sm:mb-[15px]">
						<Image src={`${data?.backgroundColor== 'white' ? '/popups/chats-fill.svg' : '/popups/chats-fill-black.svg'}`} width={60} height={60} alt="Chat Icon"/>
					</div>
					<div className="content mb-[16px]">
						{data?.title && <h3 className="mb-[16px]">{data?.title}</h3>}
						{data.blurb && <p className='mb-[16px]'>{data?.blurb}</p>}
					</div>
					<div className={`btn`}>
						<DynamicButton cta={data?.buttons} />
					</div>
				</div>
			</div>
		</section>
	);
}



