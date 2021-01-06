import React, { useRef, useEffect } from 'react'
import { usePath } from '../helpers/usePath'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/components/Header'
import LandPage from '../components/components/LandPage'
import Recommended from '../components/components/Recommended'
import Footer from '../components/components/Footer'
import { Overlay } from '../components/elements/Overlay'
import { setCartEject } from '../redux/ducks/shopReducer'
import Cart from '../components/components/Cart'
import gsap from 'gsap'
import Instagram from '../components/components/Instagram'

let scroll2;
let firstTime = true

export default function Shop() {
    const state = useSelector(state=>state.shopReducer.cartEject)
    const recomendedTab = ['5ff5b28eeb641e2ca8db7e1a', '5ff5e965570a372298c27dfc']
    const veryFirstAnimDivSelector = useSelector(state=>state.mainPageReducer.veryFirstAnimationDiv)
    const refOverlay = useRef(null)
    const dispatch = useDispatch()
    usePath()


    useEffect(()=>{
        const { current } = refOverlay
        const scroll =  document.documentElement.scrollTop
        if(state){
            let tl = gsap.timeline();
            tl.set(document.body, {top: -scroll, position: 'fixed', overflow: 'hidden'})
            .set(current, {display: 'block'})
            .to(current, {autoAlpha: 1, duration: .4})
            scroll2 = scroll
        }else if(!state && !firstTime){
            let tl = gsap.timeline()
            tl.set(document.body, {top: 0, position: 'static', overflow: '', onComplete: ()=>{
                window.scrollTo(0, scroll2)
            }})
            .to(current, {autoAlpha: 0, duration: .4})
            .set(current, {display: 'none'})
        }
    }, [state])

    useEffect(()=>{
        firstTime=false
    }, [])


    return (
        <div>
            <Header case2/>
            <LandPage  />
            <Recommended title='DLA CIEBIE' item={recomendedTab} />
            <Instagram />
            <Footer />
            <Overlay onClick={()=>dispatch(setCartEject(false))} ref={refOverlay}></Overlay>
            <Cart />
        </div>
    )
}
