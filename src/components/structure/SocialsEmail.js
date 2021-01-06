import React from 'react'
import styled from 'styled-components'
import { HomeButton } from '../elements/HomeButton'
import monkeyImg from '../../asset/monkey.png'

const Wrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin: 75px auto;
    position: relative;
    & > input{
        padding: 10px 15px;
        border: 1px solid black;
        margin: 25px 0px;
        z-index: 2;
    }
    & > h1{
        font-size: 1.5rem;
        color: ${p=>p.theme.color1};
    }
    & > button{
        z-index: 2;
    }
    & > img{
        display: none;
        position: absolute;
        z-index: 1;
        &:nth-child(4){
            display: block;
            opacity: .02;
            width: 100%;
            top: -50px;
        }
    }
    ${p=>p.theme.media.special2}{
        max-width: 400px;
        & > img{
            display: block;
            &:nth-child(4){
                width: 80%;
            }
            &:nth-child(5){
                left: -140px;
                width: 80px;
                transform: rotate(-20deg);
                opacity: .8;
            }
            &:nth-child(6){
                left: -100px;
                bottom: -140px;
                width: 50px;
                opacity: 1;
            }
            &:nth-child(7){
                right: -120px;
                bottom: -100px;
                width: 100px;
                opacity: .5;
                transform: rotate(20deg);
            }
        }
    }
    ${p=>p.theme.media.mobile2}{
        margin: 200px auto;
        max-width: 450px;
        & > h1{
            font-size: 1.8rem;
        }
        & > input{
            font-size: 1rem;
            margin: 25px 0px;
        }
        & > img{
            &:nth-child(4){
                width: 90%;
                top: -100px;
            }
        }
    }
`

export default function SocialsEmail() {
    return (
        <Wrapper>
            <h1>Subskrybuj Nasz Newsletter</h1>
            <input placeholder="Wpisz email" type="email" />
            <HomeButton>Zapisz się</HomeButton>
            <img alt='decorationImg' src={monkeyImg} />
            <img alt='decorationImg' src={monkeyImg} />
            <img alt='decorationImg' src={monkeyImg} />
            <img alt='decorationImg' src={monkeyImg} />
        </Wrapper>
    )
}
