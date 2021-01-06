import React, { useRef, useEffect } from 'react'
import Nav from '../structure/Nav'
import styled from 'styled-components'
import { Hamburger } from '../elements/HamburgerImg'
import MobileMenu from '../structure/MobileMenu'
import { useSelector, useDispatch } from 'react-redux'
import { toggleState } from '../../redux/ducks/shopReducer'
import { ReactComponent as  Bag } from '../../asset/bag.svg'
import { ReactComponent as  Heart } from '../../asset/heart.svg'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { HashLink as SmoothLink } from 'react-router-hash-link'
import { ReactComponent as Logo } from '../../asset/logo.svg'

const HeaderElem = styled.header`
position: sticky;
background: ${p=>p.case2 ? 'transparent' : 'white'};
top: 0;
z-index: 7;
${p=>p.noBorder ? '' : `border-bottom: 1px solid ${p.case2 ? 'white' : 'black' } `};
& > div{
    margin: auto;
    max-width: 1750px;
    display: flex;
    justify-content: space-between;
    padding: 25px 25px;
    & > a{
        margin: 0px 35px;
        cursor: pointer;
        & > svg{
            width: 100%;
            & > g{
                & > path{
                    fill: black;
                }
                & > text{
                    fill: black;
                }
                & > g{
                    & > line{
                        stroke: black;
                    }
                }
            }
        }
    }
    & > nav{
        display: none;
    }
    & > span{
        & > svg{
            transform: rotate(180deg);
        }
    }
    & > div{
        &:nth-child(4){
            display: flex;
            justify-content: flex-end;
            & > a{
                display: none;
            }
            & > span{
                cursor: pointer;
                position: relative;
                display: flex;
                &:nth-child(2){
                    display: none;
                }
                & > p{
                    position: absolute;
                    right: -10px;
                    top: 0px;
                    border: 2px solid ${p=>p.productLength > 0 ? p.case2 ? 'white' : 'black' : 'transparent !important'};
                    color: ${p=>p.productLength > 0 ? p.case2 ? 'white' : 'black' : 'transparent !important'};
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 20px;
                    font-size: .8rem;
                }
                & > svg{
                    margin: auto;
                    & > path{
                        fill: ${p=>p.case2 ? 'white' : 'black'};
                    }
                }
                & > a{
                    & > svg{
                        & > path{
                            fill: black;
                        }
                    }
                }
            }
        }
        &:nth-child(5){
            display: ${p=>p.navEject ? 'block' : 'none'} ;
            text-align: center;
            & > div{
                & > div{
                    & > nav{
                        margin-top: 60px;
                        margin-bottom: 30px;
                    }
                    & > div{
                        & > hr{
                            width: 50%;
                        }
                        align-items: center;
                        display: flex;
                        flex-direction: column;
                        & > a{
                            margin: 20px 0px;
                            color: ${p=>p.theme.color5};
                        }
                        & > span{
                            & > a{
                                width: 40px;
                                display: flex;
                                & > svg{
                                    width: 100%;
                                }
                            }
                            &:hover{
                                & > a{
                                    & > svg{
                                        & > path{
                                            stroke: #E80C7A;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
${p=>p.case2 && `
position: fixed;
transition: .3s all ease;
width: 100%;
& > div{
    padding: 10px 20px;
    & > a{
        transition: .3s all ease;
        & > svg{
            & > g{
                & > path{
                    fill: white;
                }
                & > text{
                    fill: white;
                }
                & > g{
                    & > line{
                        stroke: white;
                    }
                }
            }
        }
    }
    & > nav{
        & > a{
            color: white;
            transition: .3s all ease;
        }
    }
    & > span{
        & > p{
            background: transparent;
        }
        & > svg{
            & > g{
                & > line{
                    stroke: white;
                }
            }
        }
    }
}
`}
${p=>p.theme.media.desktop2}{
    & > div{
        padding: 25px 40px;
        ${p=>p.case2 && `
        padding: 25px 50px;
        & > nav{
            order: 2;
        }
        & > a{
            width: 120px;
            & > svg{
                order: 1;
                margin: 0px;
                width: 100%;
            }
        }
        `}
        & > nav{
            display: flex;
            & > div{
                & > button{
                    margin: 0px 15px;
                    & > a{
                        font-size: .8rem;
                    }
                }
            }
        }
        & > a{
            margin: unset;
        }
        & > span{
            display: none;
        }
        & > div{
            &:nth-child(4){
                order: 3;
                display: flex;
                align-items: center;
                & > a{
                    display:  ${p=>p.case2 ? 'block' : 'none'};
                    color: white;
                    margin-right: 15px;
                    color: ${p=>p.theme.color5};
                }
                & > span{
                    &:nth-child(2){
                        display: flex;
                        margin-right: 20px;
                        & > a{
                            margin: auto;
                            & > svg{
                                width: 25px;
                                display: block;
                                & > path{
                                    fill: none;
                                    stroke: ${p=>p.case2 ? 'white' : 'black'} ;
                                }
                            }
                        }
                        &:hover{
                            & > a{
                                & > svg{
                                    & > path{
                                        stroke: #E80C7A
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(3){
                        & > svg{
                            width: 25px;
                        }
                        &:hover{
                            & > svg{
                                & > path{
                                    fill: #FF5712;
                                }
                            }
                        }
                    }
                    & > p{
                        top: -10px;
                    }
                }
            }
            &:nth-child(5){
                display: none;
            }
        }
    }
}

${p=>p.theme.media.desktop3}{
    & > div{
        & > nav{
            & > div{
                & > button{
                    margin: 0px 15px;
                    & > a{
                        font-size: 1rem;
                    }
                }
            }
        }
        & > div{
            &:nth-child(4){
                & > a{
                    font-size: 1.2rem;
                }
                & > span{
                    & > svg{
                        width: 30px !important;
                    }
                    & > a{
                        & > svg{
                            width: 30px !important;
                            margin: 0px 15px;
                        }
                    }
                }
            }
        }
    }
}
${p=>p.theme.media.desktop4}{
    & > div{
        & > a{
            width: 170px;
        }
    }
}
`

export default function Header ({ noBorder, case2 }) {
    const bag = useRef()
    const headerRef = useRef()
    const state = useSelector(state=>state.shopReducer);
    const { navEject } = state
    const { cartProducts } = state
    const dispatch = useDispatch()
    let productLength = Object.values(cartProducts).length

    
    const stickyHandler = (e)=>{
        if(case2){
            let header = headerRef.current 
            let svg = Array.from(header.children[0].children[2].children[0].children[0].children)
            let button = Array.from(header.children[0].children[1].children[0].children)
            let rightSide = header.children[0].children[3]
            let svg2 = Array.from(header.children[0].children[0].children[0].children[0].children)            
            if(window.scrollY>0){
                rightSide.children[2].children[1].children[0].style.fill="black"
                rightSide.children[1].children[0].children[0].children[0].style.stroke="black"
                rightSide.children[2].children[0].style.color="black"
                rightSide.children[2].children[0].style.border="2px solid black"
                header.style.background = "white"
                header.style.borderBottom = "2px solid black"
                svg.forEach(e=>{
                    e.style.fill="black"
                })
                Array.from(svg[4].children).forEach(e=>{
                    e.style.stroke="black"
                })
                svg2.forEach(e=>{
                    e.style.stroke="black"
                })
                button.forEach(e=>e.children[0].style.color="black")
                
            }else{
                rightSide.children[2].children[1].children[0].style.fill="white"
                rightSide.children[1].children[0].children[0].children[0].style.stroke="white"
                rightSide.children[2].children[0].style.color="white"
                rightSide.children[2].children[0].style.border="2px solid white"
                headerRef.current.style.background = "transparent"
                header.style.borderBottom = "2px solid white"
                svg.forEach(e=>{
                    e.style.fill="white"
                })
                Array.from(svg[4].children).forEach(e=>{
                    e.style.stroke="white"
                })
                svg2.forEach(e=>{
                    e.style.stroke="white"
                })
                button.forEach(e=>e.children[0].style.color="white")
            }
        }
    }

    useEffect(()=>{
        if(productLength){
            const { current } = bag
            let tl = gsap.timeline()
            tl.to(current, {duration: .3, y: '-10px'})
            .to(current, {duration: .2, y: '0'})
        }
    }, [productLength] )

    useEffect(()=>{
        window.addEventListener('scroll', stickyHandler);
        return () => {
        window.removeEventListener('scroll', stickyHandler);
        };
    }, [])
    
    return (
        <HeaderElem ref={headerRef} case2={case2} productLength={productLength} noBorder={noBorder} navEject={navEject}>
            <div>
                <span onClick={()=>dispatch(toggleState('navEject'))}>
                    <Hamburger />
                </span>
                <Nav case2={case2} />
                <SmoothLink smooth to="#top"><Logo /></SmoothLink>
                <div>
                    <Link to="/sklep">Sklep</Link>
                    <span>
                        <Link to="/wishList">
                            <Heart />
                        </Link>
                    </span>
                    <span>
                        <p ref={bag}>{productLength > 0 && productLength}</p>
                        <Bag  onClick={()=>dispatch(toggleState('cartEject'))} />
                    </span>
                </div>
                
            
                <MobileMenu toggle={()=>dispatch(toggleState('navEject'))} title='Nawigacja'>
                    {case2 ?
                    <div>
                        <Nav case2 toggleNav={()=>dispatch(toggleState('navEject'))} />
                        <div>
                            <hr />
                            <Link onClick={()=>dispatch(toggleState('navEject'))} to="/sklep">Sklep</Link>
                            <span onClick={()=>dispatch(toggleState('navEject'))}>
                                <Link to="/wishList">
                                    <Heart />
                                </Link>
                            </span>
                        </div>
                    </div>:

                    <Nav toggleNav={()=>dispatch(toggleState('navEject'))} />}
                    
                </MobileMenu>
            </div>
        </HeaderElem>
    )
}
