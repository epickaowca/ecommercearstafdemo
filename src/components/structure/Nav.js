import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLink as SmoothLink } from 'react-router-hash-link'
import { ReactComponent as  Heart } from '../../asset/heart.svg'

const NavElem = styled.nav`

 
    & > div{
        display: flex;
        flex-direction: column;
        &:hover > a{
            opacity: .5;
        }
        & > a{
            margin: auto;
            display: block;
            position: relative;
            font-size: 1.5rem;
            text-decoration: none;
            color: white;
            &:after{
                transition: width .3s ease;
                content: '';
                display: block;
                width: 0px;
                height: 2px;
                background: ${p=>p.white ? 'white' : p.theme.color3} ;
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
            }
            &:hover{
                opacity: 1;
            }
            &:hover:after{
                width: 100%;
            }
            &:nth-child(1){
                margin-bottom: 50px;
            }
            &:nth-child(${p=>p.pagePath==='/' ? '1' : '2'}){
              &:after{
                  width: 100%;
              }
            }
        }
        & > button{
            cursor: pointer;
            border: none;
            background: none;
            margin: 10px 0px;
            outline: none;
            & > a{
                text-transform: uppercase;
                color: white;
                font-size: .9rem;
            }
            &:hover{
                & > a{
                    color: #F8C76C !important;
                }
            }
        }
        & > span{
            margin-top: 35px;
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
    }

    ${p=>p.theme.media.desktop2}{
        & > div{
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            & > a{
                color: ${p=>p.color ? p.color : p.theme.color1};
                margin: unset;
                font-size: 1rem;
                font-weight: 500;
                &:nth-child(1){
                    margin-bottom: 0;
                    margin-right: 50px;
                }
            }
            & > button{
                margin: 0px 15px;
            }
            & > span{
                display: none;
            }
        }
    }
`

export default function Nav({ toggleNav, color, case2 }) {
    const pagePath = useSelector(state=>state.shopReducer.pagePath)
    const categories = useSelector(state=>state.shopReducer.allCategories)
    const page = pagePath.toLowerCase()
    const scrollHandler = (elem)=>{
        if(toggleNav){
            toggleNav()
        }
    }
    return (
        <NavElem pagePath={page} color={color}>
            {case2 ? 
            <div>
                <button><Link to="/kategoria/news" onClick={toggleNav}>nowości</Link></button>
                <button><Link to="/kategoria/cena_promocyjna" onClick={toggleNav}>przeceny</Link></button>
                {categories && categories.map((e, index)=><button key={index}><Link to={`/filter/${e.kategoria}`} onClick={toggleNav}>{e.kategoria}</Link></button>)}
                <button><SmoothLink smooth to="#contact" onClick={toggleNav}>kontakt</SmoothLink></button>
            </div>:
            <div>
                <Link onClick={toggleNav} to="/">strona główna</Link>
                <Link onClick={toggleNav} to="/sklep">sklep</Link>
                <span onClick={toggleNav}>
                    <Link to="/wishList">
                        <Heart />
                    </Link>
                </span>
            </div>
            }
        </NavElem>
    )
}
