import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import instaIco from '../../asset/instaIcoColor.png'
import { useSelector } from 'react-redux'
import escaping from '../../asset/escaping.png'
import insta1Img from '../../asset/insta1.jpg'
import insta2Img from '../../asset/insta2.jpg'
import insta3Img from '../../asset/insta3.jpg'
import insta4Img from '../../asset/insta4.jpg'
import insta5Img from '../../asset/insta5.jpg'
const Wrapper = styled.div`
    padding: 50px 15px;
    margin-top: 100px;
    background: ${p=>p.theme.color2};
    & > div{
        //mobile
        &:nth-child(1){
            max-width: 300px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: auto;
            text-align: center;
            & > h1{
                font-size: 1.5rem;
                //section Name
                &:nth-child(1){
                    color: ${p=>p.theme.color1}
                }
            }
            
            //insta NickName
            & > a{
                & > h1{
                    max-width: 350px;
                    color: ${p=>p.theme.color5}        
                }
            }
            & > h4{
                max-width: 250px;
                margin: 20px 0px;
                font-weight: 500;
            }
            & > p{
                max-width: 350px;
            }
            //slider
            & > div{
                margin: 20px 0px;
                overflow: hidden;
                width: 300px;
                & > div{
                    display: flex;
                    width: 100%;
                    height: 300px;
                    & > div{
                        flex-shrink: 0;
                        width: 300px;
                        height: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        &:nth-child(1){
                            background-image: url(${p=>p.imgs[0]});
                        }
                        &:nth-child(2){
                            background-image: url(${p=>p.imgs[1]});
                        }
                        &:nth-child(3){
                            background-image: url(${p=>p.imgs[2]});
                        }
                        &:nth-child(4){
                            background-image: url(${p=>p.imgs[3]});
                        }
                        &:nth-child(5){
                            background-image: url(${p=>p.imgs[4]});
                        }
                        &:nth-child(6){
                            background-image: url(${p=>p.imgs[0]});
                        }
                    }
                }
            }
        }
        //desktop
        &:nth-child(2){
            display: none;
        }
    }
    ${p=>p.theme.media.desktop1}{
        & > div{
            &:nth-child(1){
                max-width: 600px;
                & > div{
                    width: 500px;
                    & > div{
                        & > div{
                            width: 500px;
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop2}{
        & > div{
            //mobile
            &:nth-child(1){
                display: none;
            }
            //desktop
            &:nth-child(2){
               display: block;
               margin: auto;
               max-width: 660px;
                & > h1{
                    font-size: 1.5rem;
                    //section Name
                    &:nth-child(1){
                        font-size: 1.5rem;
                        font-weight: 500;
                        max-width: 350px;
                        color: ${p=>p.theme.color1};
                        margin-bottom: 50px;
                        margin-top: 15px;
                    }
                }
                & > div{
                    //gallery
                    &:nth-child(2){
                        display: grid;
                        grid-template-columns: 150px 150px 150px 150px;
                        grid-template-rows: 150px 150px 150px 150px;
                        height: 660px;
                        grid-gap: 20px;
                        & > div{
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            position: relative;
                            //number
                            & > span{
                                background: white;
                                width: 40px;
                                height: 40px;
                                position: absolute;
                                left: 0px;
                                top: 0px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-weight: 500;
                            }
                            &:nth-child(1){
                                background-image: url(${p=>p.imgs[0]});
                                grid-column-start: 1;
                                grid-column-end: 3;
                                grid-row-start: 1;
                                grid-row-end: 4;
                            }
                            &:nth-child(2){
                                background-image: url(${p=>p.imgs[1]});
                                grid-column-start: 3;
                                grid-column-end: 4;
                                grid-row-start: 1;
                                grid-row-end: 2;
                            }
                            &:nth-child(3){
                                background-image: url(${p=>p.imgs[2]});
                            }
                            &:nth-child(4){
                                background-image: url(${p=>p.imgs[3]});
                                grid-column-start: 3;
                                grid-column-end: 5;
                                grid-row-start: 2;
                                grid-row-end: 5;
                            }
                            &:nth-child(5){
                                background-image: url(${p=>p.imgs[4]});
                                grid-column-start: 1;
                                grid-column-end: 3;
                                grid-row-start: 4;
                                grid-row-end: 5;
                            }
                        }
                    }
                    //div under gallery
                    &:nth-child(3){
                        display: flex;
                        justify-content: flex-end;
                        & > div{
                            transform: translate(70px, -150px);
                            padding: 40px;
                            background: white;
                            max-width: 400px;
                            text-align: right;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;
                            align-items: flex-end;
                            & > div{
                                & > a{
                                    & > img{
                                        display: none;
                                    }
                                }
                                & > section{
                                    & > a{
                                        & > h1{
                                            font-size: 1.5rem;
                                            color: red;
                                            color: ${p=>p.theme.color5}
                                        }
                                    }
                                    & > h4{
                                        max-width: 280px;
                                        font-size: 1.2rem;
                                        margin: 20px 0px;
                                        font-weight: 500;
                                    }
                                }
                            }
                            & > p{
                                max-width: 320px;
                                font-size: .9rem;
                                color: rgba(000, 000, 000, .6);
                            }
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop3}{
        & > div{
            &:nth-child(2){
                max-width: 920px;
                & > h1{
                    &:nth-child(1){
                        font-size: 2.3rem;
                        font-weight: bold;
                        max-width: 600px;
                        margin-bottom: 70px;
                    }
                }
                & > div{
                    //gallery
                    &:nth-child(2){
                        grid-template-columns: 200px 200px 200px 200px;
                        grid-template-rows: 150px 150px 150px 150px;
                        height: 720px;
                        grid-gap: 40px;
                    }
                    //div under gallery
                    &:nth-child(3){
                        & > div{
                            transform: translate(90px, -150px);
                            max-width: unset;
                            width: 550px;
                            padding: 50px 80px;
                            & > div{
                                display: flex;
                                & > a{
                                    & > img{
                                        width: 130px;
                                        height: 130px;
                                        display: block;
                                        object-fit: contain;
                                    }
                                }
                            }
                            & > p{
                                margin-top: 20px;
                                max-width: 420px;
                            }
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop5}{
        & > div{
            &:nth-child(2){
                max-width: 1080px;
                & > div{
                    //gallery
                    &:nth-child(2){
                        grid-template-columns: 240px 240px 240px 240px;
                        grid-template-rows: 180px 180px 180px 180px;
                        height: 840px;
                        grid-gap: 40px;
                    }
                    //div under gallery
                    &:nth-child(3){
                        & > div{
                            transform: translate(110px, -180px);
                            width: 650px;
                            padding: 50px 110px;
                            & > div{
                                display: flex;
                                & > a{
                                    & > img{
                                        width: 130px;
                                        height: 130px;
                                        display: block;
                                        object-fit: contain;
                                    }
                                }
                            }
                            & > p{
                                margin-top: 20px;
                                max-width: 420px;
                            }
                        }
                    }
                }
            }
        }
    }
`

let counter = 0;
let size = 0;
let removed = false;
const instaPics = {}
instaPics.pic = [ insta1Img, insta2Img, insta3Img, insta4Img, insta5Img ]
export default function Instagram() {
    const preUrl = useSelector(state=>state.mainPageReducer.preUrl)
    let sliderContainer = useRef()
    useEffect(()=>{
        removed = false
        sliderHandler()
        return ()=>{
            removed = true
        }
    }, [])
    const sliderHandler = ()=>{
        if(removed) return
        if(!sliderContainer.current) return
        if(counter === 5){
            sliderContainer.current.style.transition =  'none'
            counter = 0
            sliderContainer.current.style.transform = 'translateX(' + (-size * counter )+ 'px)'
        }else{
            counter++
            size = sliderContainer.current.children[0].clientWidth
            sliderContainer.current.style.transition =  'transform .5s ease'
            sliderContainer.current.style.transform = 'translateX(' + (-size * counter )+ 'px)'
        }
        setTimeout(sliderHandler, 5000)
    }
    return (
        <Wrapper id="gallery" escaping={escaping} imgs={instaPics.pic}>

            <div>
                <h1>Donec ut semper urna. Phasellus ut ultrices</h1>
                <div>
                    <div ref={sliderContainer}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div id="LastClone"></div>
                    </div>
                </div>
                <a href='https://www.instagram.com/'>
                    <h1>Instagram</h1>
                </a>
                <h4>tortor. Nam vel porttitor augue. Quisque eu ultrices ante. Praesent molestie lacinia metus nec lobortis</h4>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean non tempor sapien. Maecenas vitae mollis libero. Nulla in tellus sem. Phasellus nulla felis, malesuada commodo auctor in, dignissim nec nunc. Mauris sollicitudin velit posuere</p>                
            </div>

            <div>
                <h1>Donec ut semper urna. Phasellus ut ultrices</h1>
                <div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                </div>
                <div>
                    <div>
                        <div>
                            <a href='https://www.instagram.com/'>
                                <img src={instaIco} alt="instagram" />
                            </a>
                            <section>
                                <a href='https://www.instagram.com/'>
                                    <h1>Instagram</h1>
                                </a>
                                <h4>tortor. Nam vel porttitor augue. Quisque eu ultrices ante. Praesent molestie lacinia metus nec lobortis</h4>
                            </section>
                        </div>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean non tempor sapien. Maecenas vitae mollis libero. Nulla in tellus sem. Phasellus nulla felis, malesuada commodo auctor in, dignissim nec nunc. Mauris sollicitudin velit posuere</p>
                    </div>
                </div>
            </div>

        </Wrapper>
    )
}
