import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import LandPageHero from '../structure/LandPageHero'
import LandPageSecondLevel from '../structure/LandPageSecondLevel'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSlides } from '../../redux/ducks/mainPageReducer'
import gsap from 'gsap'
import { loading } from '../../redux/ducks/mainPageReducer'
import { LoadingCircle } from '../elements/LoadingCircle'
import LandPage1 from '../../asset/landPage1.jpg'
const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    & > section{
        & > section{
            width: 100vw;
            height: 100vh;
            background: ${p=>p.theme.color3};
        }
        & > img{
            display: none;
        }
        ${p=>!p.loadingState && `display: none`}
    }
    & > div{
        position: relative;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        z-index: 1;
        &:nth-child(1){
            z-index: 2;
            opacity: 1;
            visibility: visible;
            & > div{
                &:nth-child(2){
                    //content div
                    opacity: 1;
                    visibility: visible;
                    & > div{
                        //strange thing
                        &:nth-child(2){
                            opacity: 1;
                            visibility: visible;
                        }
                    }
                }
            }
        }
        & > div{
            &:nth-child(2){
                opacity: 0;
                visibility: hidden;
            }
            //indicator
            &:nth-child(3){
                display: flex;
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                & > div{
                    cursor: pointer;
                    margin: 0 15px;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    background: white;
                    transition: all .3s ease;
                    &:nth-child(${p=>p.indicat+1}){
                        background: ${p=>p.theme.color5};
                    }
                }
            }
        }
    }
`

let bgLength = 0
let currentSlide = 0
let removed = false
let loadingImgHelper = true
let bgSliderHelperSpec = [1,2,3]
let landPageFakeContent = [{title:'Donec ut semper urna. Phasellus ut ultrices', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim semper est, id semper magna. Sed varius velit eu scelerisque auctor. Duis vitae malesuada dui, eget fermentum libero. Cras congue maximus tincidunt. Phasellus sed urna consequat, auctor mauris at, malesuada augue', button:'Lorem ipsum'}, {title:'Sed faucibus pellentesque blandit', description: 'Praesent fringilla metus velit, ut sollicitudin orci pulvinar sed. Sed et erat a dolor elementum hendrerit. Curabitur laoreet felis enim, eu faucibus dui accumsan ut', button:'Lorem'}, {title:'Lorem ipsum dolor sit amet', description: 'Sed fermentum lacus massa. Fusce vitae vulputate ex. Quisque luctus orci dolor, sit amet tristique libero facilisis eu', button:'Lorem now!!'}]
export default function LandPage() {
    const [canISlide, setCanISlide] = useState(true)
    const mainDiv = useRef(null)
    const testImg = useRef(null)
    const loadingState = useSelector(state=>state.mainPageReducer.slides_loading)
    const dispatch = useDispatch()
    useEffect(()=>{
        autoSlider()
        removed = false
        return ()=>{
            removed = true
        }
    }, [])
    const SlidesHandler = (e)=>{
        if(!mainDiv.current) return
        if(removed) return
        if(currentSlide === e) return
        if(bgLength){
            console.log('dziala')
            if(canISlide){
                setCanISlide(false)
                let nextSlide
                if(e || e===0){
                    nextSlide = e
                }else{
                    nextSlide = currentSlide+1
                }
             
                if(nextSlide===bgLength){
                    nextSlide = 0
                }
                let nextSlideDiv = mainDiv.current.children[nextSlide]
                let currentSlideDiv = mainDiv.current.children[currentSlide]
                if(e || e===0){
                    currentSlide = e
                }else{
                    currentSlide++
                    if(currentSlide===bgLength){
                        currentSlide=0
                    }
                }
                let tl = gsap.timeline()
                tl.to(currentSlideDiv.children[1], {duration: .3, autoAlpha: 0})
                .set(nextSlideDiv, {zIndex:1 , opacity: 1, visibility: 'visible'})
                .set(currentSlideDiv, {zIndex:2})
                .to(currentSlideDiv, {duration: .5, opacity: 0})
                .set(currentSlideDiv, {visibility: 'hidden'})
                .to(nextSlideDiv.children[1], {duration: .3, autoAlpha: 1, onComplete: ()=>{
                    setCanISlide(true)
                }})
            }
        }
    }
    
    const imgLoadHandler = ()=>{
        dispatch(loading('slides_loading'))
    }
    const autoSlider = ()=>{
        if(!loadingImgHelper){
            if(bgLength>1){   
                if(bgLength){
                    SlidesHandler()
                }
            }
        }
        setTimeout(autoSlider, 8000)
    }
    bgLength = 3
    loadingImgHelper=loadingState
    return (
        <Wrapper id="home" indicat={currentSlide} loadingState={loadingState} ref={mainDiv}>
        {loadingState ? 
        <section>
            <section></section>
            <LoadingCircle>
                <div></div>
            </LoadingCircle>
            {<img onLoad={imgLoadHandler} ref={testImg} src={LandPage1} alt="bg"></img>}
        </section>:
        bgSliderHelperSpec.map((e, index)=>
            <div key={index}>
                <LandPageHero background={require(`../../asset/landPage${index+1}.jpg`)} />
                <LandPageSecondLevel content={landPageFakeContent[index]}/>
                <div>
                    {bgSliderHelperSpec.map((e, index)=><div onClick={()=>SlidesHandler(index)} key={index}></div>)}
                </div>
            </div>
        )
        }
        </Wrapper>
    )
}
