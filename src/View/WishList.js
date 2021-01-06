import React, { useRef, useEffect } from 'react'
import Header from '../components/components/Header'
import Menu from '../components/components/Menu'
import Footer from '../components/components/Footer'
import Cart from '../components/components/Cart'
import Recommended from '../components/components/Recommended'
import gsap from 'gsap'
import { Overlay } from '../components/elements/Overlay'
import { setCartEject } from '../redux/ducks/shopReducer'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'  

const WishListElem = styled.div`
width: 100vw;
position: relative;
& > section{
    text-align: center;
    margin-top: 100px;
    height: 200px;
    & > p{
        margin-top: 10px;
    }
}
${p=>p.theme.media.desktop4}{
    margin: auto;
    padding:  0 50px;
}
${p=>p.theme.media.desktop6}{
    width: 1920px;
}
`
let scroll2;
let firstTime = true

export default function WishList() {
    const dispatch = useDispatch()
    const refOverlay = useRef(null)
    const state = useSelector(state=>state.shopReducer.wishListProducts)
    const cartEject = useSelector(state=>state.shopReducer.cartEject)
    useEffect(()=>{
        const { current } = refOverlay
        const scroll =  document.documentElement.scrollTop
        if(cartEject){
            let tl = gsap.timeline();
            tl.set(document.body, {top: -scroll, position: 'fixed', overflow: 'hidden'})
            .set(current, {display: 'block'})
            .to(current, {autoAlpha: 1, duration: .4})
            scroll2 = scroll
        }else if(!cartEject && !firstTime){
            let tl = gsap.timeline()
            tl.set(document.body, {top: 0, position: 'static', overflow: '', onComplete: ()=>{
                window.scrollTo(0, scroll2)
            }})
            .to(current, {autoAlpha: 0, duration: .4})
            .set(current, {display: 'none'})
        }
    }, [cartEject])

    useEffect(()=>{
        firstTime=false
    }, [])
    return (
        <div>
            <WishListElem>
                <Header />
                <Menu noFilters title='Ulubione' />
                {state.length ? <Recommended wishList item={state} /> : <section><h1>Wygląda na to że nie masz jeszcze żadnych produktów w liście życzeń</h1><p>Możesz dodać produkt do listy życzeń klikając w ikone serca przy produkcie</p></section>}
            </WishListElem>
            <Overlay onClick={()=>dispatch(setCartEject(false))} ref={refOverlay}></Overlay>
            <Cart />
            <Footer />
        </div>
    )
}
