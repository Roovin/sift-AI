import React, {useEffect, useState} from "react";
import ArrowBtn from '../../components/button/Black_arrowBtn'

const accData = [
    {
        title:'Lorem ipsum dolor sit amet consectetur. Rhoncus velit proin sit cras ultrices arcu.',
        blurb:'Lorem ipsum dolor sit amet consectetur. Morbi turpis quis lectus fames. Lacus a commodo fermentum molestie. Maecenas lectus purus magna semper eget tellus iaculis risus. Adipiscing dictum nibh vulputate molestie vitae arcu. Quam egestas viverra accumsan urna et elementum urna enim. Gravida aliquet phasellus quis tortor. Varius tristique suscipit tellus nibh ut. Praesent molestie arcu quam euismod duis morbi ut. Semper sed nunc ligula aliquam sed blandit cras metus purus. Ut cursus nullam non eu felis varius. Ut turpis scelerisque aliquet consequat sit purus lorem. ',
        ctaText:'Optional CTA',
        ctaLink:'/'
    },
    {
        title:'Est tation latine aliquip id, mea ad tale illud definitiones.',
        blurb:'Lorem ipsum dolor sit amet consectetur. Morbi turpis quis lectus fames. Lacus a commodo fermentum molestie. Maecenas lectus purus magna semper eget tellus iaculis risus. Adipiscing dictum nibh vulputate molestie vitae arcu. Quam egestas viverra accumsan urna et elementum urna enim. Gravida aliquet phasellus quis tortor. Varius tristique suscipit tellus nibh ut. Praesent molestie arcu quam euismod duis morbi ut. Semper sed nunc ligula aliquam sed blandit cras metus purus. Ut cursus nullam non eu felis varius. Ut turpis scelerisque aliquet consequat sit purus lorem. ',
        ctaText:'Optional CTA',
        ctaLink:'/'
    },
    {
        title:'Periculis omitur necessitus eum ad, pro eripuit minimum stet prompta.',
        blurb:'Lorem ipsum dolor sit amet consectetur. Morbi turpis quis lectus fames. Lacus a commodo fermentum molestie. Maecenas lectus purus magna semper eget tellus iaculis risus. Adipiscing dictum nibh vulputate molestie vitae arcu. Quam egestas viverra accumsan urna et elementum urna enim. Gravida aliquet phasellus quis tortor. Varius tristique suscipit tellus nibh ut. Praesent molestie arcu quam euismod duis morbi ut. Semper sed nunc ligula aliquam sed blandit cras metus purus. Ut cursus nullam non eu felis varius. Ut turpis scelerisque aliquet consequat sit purus lorem. ',
        ctaText:'Optional CTA',
        ctaLink:'/'
    },
    {
        title:'Pharetra adipiscing est, venenatis viverra nunc non aenean amet. ',
        blurb:'Lorem ipsum dolor sit amet consectetur. Morbi turpis quis lectus fames. Lacus a commodo fermentum molestie. Maecenas lectus purus magna semper eget tellus iaculis risus. Adipiscing dictum nibh vulputate molestie vitae arcu. Quam egestas viverra accumsan urna et elementum urna enim. Gravida aliquet phasellus quis tortor. Varius tristique suscipit tellus nibh ut. Praesent molestie arcu quam euismod duis morbi ut. Semper sed nunc ligula aliquam sed blandit cras metus purus. Ut cursus nullam non eu felis varius. Ut turpis scelerisque aliquet consequat sit purus lorem. ',
        ctaText:'Optional CTA',
        ctaLink:'/'
    },
    {
        title:'Est tation latine aliquip id, mea ad tale illud definitiones.',
        blurb:'Lorem ipsum dolor sit amet consectetur. Morbi turpis quis lectus fames. Lacus a commodo fermentum molestie. Maecenas lectus purus magna semper eget tellus iaculis risus. Adipiscing dictum nibh vulputate molestie vitae arcu. Quam egestas viverra accumsan urna et elementum urna enim. Gravida aliquet phasellus quis tortor. Varius tristique suscipit tellus nibh ut. Praesent molestie arcu quam euismod duis morbi ut. Semper sed nunc ligula aliquam sed blandit cras metus purus. Ut cursus nullam non eu felis varius. Ut turpis scelerisque aliquet consequat sit purus lorem. ',
        ctaText:'Optional CTA',
        ctaLink:'/'
    }
]

export default function Accordion(){
    const [open,setOpen] =useState([])

    function clickHandler(index) {
        if (open.includes(index)) {
            setOpen(open.filter(item => item !== index));
        } else {
            setOpen([...open, index]);
        }
    }

    const icon = 'after:content-[""] after:absolute after:w-[32px] after:h-[32px]  lg:after:w-[22px] lg:after:h-[22px] after:top-0 after:right-[-2px] after:bg-contain after:z-[-1]'

    return(
        <section className="accordion bg-white">
            <div className="container">
                <div className="intro mb-[64px] laptop-landscape:mb-[24px]">
                    <h2>Frequently asked questions</h2>
                </div>
                {
                    accData.map((item,i)=>{
                        return (
                            <div key={i} className="acc-wrapper px-[24px] pb-[15px] pt-[22px] mb-[16px] last:mb-0 border-[2px] duration-300 hover:shadow-black-shadow hover:outline hover:outline-[1px] hover:outline-black border-black rounded-[16px]">
                                <div className={`relative mb-[10px] cursor-pointer  z-[2] ${icon} ${open.includes(i) ? 'after:bg-[url("/logos/minus.svg")]' : 'after:bg-[url("/logos/plus.svg")]'}`}>
                                    <h4 className="pr-[30px]" onClick={() => clickHandler(i)}>{item.title}</h4>
                                </div>
                    
                                <div className={`content  overflow-hidden transition-all ${open.includes(i) ? ' max-h-[1000px] pb-[12px]' : 'max-h-0'}`}>
                                    <p className="small_font max-w-[950px] wide-screen:max-w-[calc(100%-80px)]  wide-screen:pt-[20px]">{item.blurb}</p>
                                    {item.ctaText ? (<div className="btn mt-[16px] wide-screen:mt-[30px]"><ArrowBtn text={item.ctaText} link={item.ctaLink} /></div>) : ''}
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </section>
    )
}