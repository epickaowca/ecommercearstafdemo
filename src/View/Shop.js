import React, { useRef, useEffect } from 'react'
import { usePath } from '../helpers/usePath'
import Header from '../components/components/Header'
import Menu from '../components/components/Menu'
import Products from '../components/components/Products'
import Footer from '../components/components/Footer'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Cart from '../components/components/Cart'
import gsap from 'gsap'
import { Overlay } from '../components/elements/Overlay'
import { setCartEject, setSortState, setCategory } from '../redux/ducks/shopReducer'


const ShopElem = styled.div`
width: 100vw;
position: relative;

& > button{
    margin: auto;
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
const categoriesTab = {wszystko: 'wszystko'}

export default function Shop() {
    const { pathname } = useLocation(path=>path)
    const dispatch = useDispatch()
    const refOverlay = useRef(null)
    const state = useSelector(state=>state.shopReducer.cartEject)
    const allCategories = useSelector(state=>state.shopReducer.allCategories)
    const currentCategory = useSelector(state=>state.shopReducer.currentCategory)
    const sortState = useSelector(state=>state.shopReducer.sortState)
    usePath()
    
    useEffect(()=>{
        allCategories.forEach(elem => {categoriesTab[elem.kategoria]=elem.kategoria});
        if(pathname.slice(1,10)==='kategoria'){
            let categoryHelper = pathname.slice(11)
            dispatch(setSortState([categoryHelper]))
        }else if(pathname.slice(1,7)==='filter'){
            let categoryHelper = pathname.slice(8)
            dispatch(setCategory({cat: categoryHelper, index: 999}))
        }
    }, [])

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
            <ShopElem>
                <Header />
                <Menu title='Katalog' />
                <Products />
            </ShopElem>
            <Overlay onClick={()=>dispatch(setCartEject(false))} ref={refOverlay}></Overlay>
            <Cart />
            <Footer />
        </div>
    )
}
