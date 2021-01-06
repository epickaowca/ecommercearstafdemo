import React, { useRef } from 'react'
import styled from 'styled-components'
import insta from '../../asset/instaIco.png'
import fb from '../../asset/fbIco.png'
import logo from '../../asset/logo.svg'
import { ReactComponent as ArrowDown } from '../../asset/arrowDown.svg'
import axios from 'axios'
import gsap from 'gsap'
import { useSelector } from 'react-redux'
import { LoadingCircle } from '../elements/LoadingCircle'
const Wrapper = styled.div`
    background: black;
    color: rgba(255,255,255,.9);
    padding: 40px 30px;
    & > div{
        max-width: 400px;
        margin: auto;
        & > section{
            //newsletter contact and help
            &:nth-child(1){
                & > div{
                    //newsletter
                    &:nth-child(1){
                        position: relative;
                        & > h1{
                            text-transform: uppercase;
                            font-size: 1.3rem;
                            letter-spacing: 10px;
                            font-weight: 500;
                            margin-bottom: 20px;
                        }
                        & > form{
                            display: flex;
                            flex-direction: column;
                       
                            & > input{
                                background: rgba(255,255,255,.9);
                                border: 1px solid black;
                                padding: 15px;
                                outline: none;
                                margin-bottom: 15px;
                            }
                            & > button{
                                font-size: 1rem;
                                cursor: pointer;
                                padding: 15px;
                                background: ${p=>p.theme.color1};
                                color: white;
                                border: none;
                                outline: none;
                                border: 1px solid ${p=>p.theme.color1};
                                &:hover{
                                    background: rgba(255,255,255,.9);
                                    color: ${p=>p.theme.color1};
                                }
                            }
                        }
                        & > section{
                            display: none;
                            z-index: 6;
                        }
                        & > p{
                            color: white;
                            left: 50%;
                            top: 50%;
                            padding: 15px;
                            display: none;
                            z-index: 6;
                            position: absolute;
                            font-size: 1.5rem;
                            text-align: center;
                            transform: translate(-50%,-50%);
                        }
                        & > div{
                            background: ${p=>p.theme.color1};
                            width: 100%;
                            position: absolute;
                            z-index: 5;
                            left: 0px;
                            top: 0px;
                        }
                    }
                    //contact and help
                    &:nth-child(2){
                        margin-top: 40px;
                        & > div{
                            position: relative;
                            margin-bottom: 20px;
                            & > svg{
                                position: absolute;
                                right: 0px;
                                top: 5px;
                                cursor: pointer;
                                &:hover{
                                    & > path{
                                        stroke: ${p=>p.theme.color5};
                                    }
                                }
                            }
                            & > h1{
                                text-transform: uppercase;
                                margin-bottom: 15px;
                                font-weight: 500;
                            }
                            & > a{
                                text-decoration: none;
                                display: none;
                                margin-bottom: 10px;
                                color: rgba(255,255,255,.8);
                            }
                        }
                    }
                }
            }
            //logo 
            &:nth-child(2){
                display: flex;
                flex-direction: column-reverse;
                justify-content: center;
                & > div{
                    //logo
                    &:nth-child(1){
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        & > img{
                            margin-bottom: 15px;
                        }
                        & > p{
                            color: rgba(255,255,255,.60);
                            text-align: center;
                        }
                    }
                    //fb insta
                    &:nth-child(2){
                        margin: 20px 0px;
                        display: flex;
                        justify-content: center;
                        & > a{
                            & > img{
                                width: 35px;
                                margin: 0px 15px;
                                cursor: pointer;
                                transition: opacity .1s ease;
                                &:hover{
                                    opacity: .8;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.special2}{
        padding-bottom: 20px;
        & > div{
            max-width: 765px;
            padding: 20px 30px;
            padding-bottom: 0px;
            & > section{
                //newsletter contact and help
                display: flex;
                justify-content: space-between;
                &:nth-child(1){
                    & > div{
                        //newsletter
                        &:nth-child(1){
                            & > h1{
                                font-size: 1.2rem;
                            }
                            & > form{
                                max-width: 300px;
                                display: flex;
                                flex-direction: row;
                                & > input{
                                    margin: unset;
                                    width: 60%;
                                    font-size: .9rem;
                                }
                                & > button{
                                    font-size: .9rem;
                                    margin: unset;
                                    width: 40%;
                                }
                            }
                        }
                        //contact and help
                        &:nth-child(2){
                            width: 250px;
                            margin: unset;
                            & > div{
                                margin: 0px;
                                & > h1{
                                    font-size: 1.4rem;
                                }
                                & > a{
                                    font-size: .9rem;
                                }
                            }
                        }
                    }
                }
                //logo 
                &:nth-child(2){
                    margin-top: 15px;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    & > div{
                        //logo
                        &:nth-child(1){
                            flex-direction: row;
                            align-items: flex-end;
                            & > img{
                                width: 100px;
                                margin-bottom: 0px;
                                margin-right: 25px;
                            }
                        }
                        //fb insta
                        &:nth-child(2){
                            & > img{
                                width: 28px;
                                &:nth-child(2){
                                    margin-right: 0px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.mobile2}{
        & > div{
            max-width: 980px;
            & > section{
                //newsletter contact and help
                &:nth-child(1){
                    & > div{
                        //newsletter
                        &:nth-child(1){
                            & > form{
                                max-width: 350px;
                                & > input{
                                    font-size: .9rem;
                                }
                            }
                        }
                        //contact and help
                        &:nth-child(2){
                            width: unset;
                            margin: unset;
                            display: flex;
                            & > div{
                                margin: 0px 25px;
                                & > h1{
                                    font-size: 1.4rem;
                                }
                                & > svg{
                                    display: none;
                                }
                                & > a{
                                    font-size: .9rem;
                                    display: block !important;
                                }
                            }
                        }
                    }
                }
                //logo 
                &:nth-child(2){
                    & > div{
                        //logo
                        &:nth-child(1){
                            & > img{
                                width: 150px;
                            }
                        }
                        //fb insta
                        &:nth-child(2){
                            & > a{
                                & > img{
                                    width: 35px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop3}{
        & > div{
            max-width: 1100px;
        }
    }
`


export default function Footer() {
    const newsLetterRef = useRef(null)
    let preUrl = useSelector(state=>state.shopReducer.COD)
    let imgPreUrl = useSelector(state=>state.shopReducer.preUrl)
    const contentHandler = (e)=>{
        let name = e.target.nodeName
        let svg;
        let target;
        if(name==='svg'){
            svg = e.target
            target = Array.from(e.target.parentElement.children).slice(2)
        }else if(name==='path'){
            svg = e.target.parentElement
            target = Array.from(e.target.parentElement.parentElement.children).slice(2)
        }
        if(target[0].style.display==='block'){
            target.forEach(e=>e.style.display="none")
            svg.style.transform = 'rotate(0deg)'
        }else{
            target.forEach(e=>e.style.display="block")
            svg.style.transform = 'rotate(180deg)'
        }
    }

    const newsLetterHandler = async (e)=>{
        e.preventDefault()
        let target = e.target.children
        let email = target[0].value
        let tl = gsap.timeline()
        let animTarget = newsLetterRef.current

        let div = animTarget.children[1]
        let circle = animTarget.children[2]
        let p = animTarget.children[3]

        tl.to(div, {duration: .2, height: '100%'})
        .set(circle, {display: 'flex', onComplete: async()=>{
            let res = await axios.post(``, {email})
            circle.style.display = 'none'
            if(res.data==='succes'){
                p.innerHTML = 'Sukces! Od teraz jesteś subskrybentem'
                p.style.display = 'block'
            }else{
                console.log('coś poszło nie tak')
                p.innerHTML = 'Oops! Coś poszło nie tak, spróbuj ponownie poźniej'
                p.style.display = 'block'
            }
        }})
    }
    return (
        <Wrapper id="contact">
            <div>
                <section>
                    <div ref={newsLetterRef}>
                        <h1>Newsletter</h1>
                        <div></div>
                        <LoadingCircle>
                            <div></div>
                        </LoadingCircle>
                        <p></p>
                        <form onSubmit={newsLetterHandler}>
                            <input required type="email" placeholder="E-mail" />
                            <button type="submit">Zapisz się</button>
                        </form>
                    </div>
                    <div>
                        <div>
                            <ArrowDown onClick={contentHandler} />
                            <h1>kontakt</h1>
                            <a href='#'>000000000</a>
                            <a href='#'>email@email.com</a>
                        </div>
                        <div>
                            <ArrowDown onClick={contentHandler} />
                            <h1>pomoc</h1>
                            <a href='#'>lorem ipsu</a>
                            <a href='#'>lorem ipsum</a>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <img alt="logo" src={logo} />
                        <p>© 2020 ArsTaf - Wszelkie prawa zastrzeżone</p>
                    </div>
                    <div>
                        <a href='https://www.facebook.com/'>
                            <img alt='socialIco' src={fb} />
                        </a>
                        <a href='instagram.com'>
                            <img alt='https://www.instagram.com/' src={insta} />
                        </a>
                    </div>
                </section>
            </div>
        </Wrapper>
    )
}