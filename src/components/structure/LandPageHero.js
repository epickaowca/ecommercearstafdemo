import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Wrapper = styled.div`
& > div{
    &:nth-child(1){
        width: 100vw;
        height: 100vh;
        background-image: url(${p=>p.background});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    &:nth-child(2){
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,.3);
    }
}
`


export default function LandPageHero({background}) {
    return (
        <Wrapper background={background}>
            <div></div>
            <div></div>
        </Wrapper>
    )
}
