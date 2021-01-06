import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/components/Header'
import styled from 'styled-components'
import DetailsItem from '../components/components/DetailsItem'
import Cart from '../components/components/Cart'
import gsap from 'gsap'
import { Overlay } from '../components/elements/Overlay'
import { setCartEject } from '../redux/ducks/shopReducer'
import Menu from '../components/components/Menu'


const DetailsElem = styled.div`
    background: white;
    min-height: 100vh;
    & > div{
        max-width: 1920px;
        margin: auto;
        & > div{
            &:nth-child(1){
                & > div{
                    &:nth-child(2){
                        display: none;
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.special2}{
        & > div{
            & > div{
                &:nth-child(1){
                    & > div{
                        &:nth-child(2){
                            display: block;
                        }
                    }
                }
            }
        }
    }
`
let scroll2;
let firstTime = true
export default function Product() {  
    const dispatch = useDispatch()  
    const state = useSelector(state=>state.shopReducer)
    const refOverlay = useRef(null)

    useEffect(()=>{
        const { current } = refOverlay
        const scroll =  document.documentElement.scrollTop
        if(state.cartEject){
            let tl = gsap.timeline();
            tl.set(document.body, {top: -scroll, position: 'fixed', overflow: 'hidden'})
            .set(current, {display: 'block'})
            .to(current, {autoAlpha: 1, duration: .4})
            scroll2 = scroll
        }else if(!state.cartEject && !firstTime){
            let tl = gsap.timeline()
            tl.set(document.body, {top: 0, position: 'static', overflow: '', onComplete: ()=>{
                window.scrollTo(0, scroll2)
            }})
            .to(current, {autoAlpha: 0, duration: .4})
            .set(current, {display: 'none'})
        }
    }, [state.cartEject])

    useEffect(()=>{
        firstTime=false
    }, [])


    return (
        <DetailsElem>
            <div>
                <div>
                    <Header/>
                    <Menu noFilters title='Opis Produktu' />
                    <DetailsItem />
                </div>
                <Overlay onClick={()=>dispatch(setCartEject(false))} ref={refOverlay}></Overlay>
                <Cart />
            </div>
        </DetailsElem>
    )
}
