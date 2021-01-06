import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
margin: 20px 25px;
margin-bottom: 40px;
& > div{
    &:nth-child(1){
        width: 320px;
        height: 320px;
        animation-name: loadAnim1;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        background: linear-gradient(90deg, rgba(243,243,243,1) 40%, rgba(203,203,203,.1) 50%, rgba(243,243,243,1) 60%);
        background-position: -152px;
        ${p=>p.theme.media.desktop2}{
            animation-name: loadAnim2;
            background-position: -135px;
            width: 280px;
        }
        
        @keyframes loadAnim1 {
            from {background-position: -152px;}
            to {background-position: 152px;}
        }
        @keyframes loadAnim2 {
            from {background-position: -135px;}
            to {background-position: 135px;}
        }
    }
    &:nth-child(2), &:nth-child(4){
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        & > section{
            background: rgba(203,203,203,.1);
            height: 15px;
            &:nth-child(1){
                width: 100px; 
            }
            &:nth-child(2){
                width: 15px;
                border-radius: 50%;
            }
        }
    }
    &:nth-child(3){
        margin-top: 15px;
        background: rgba(203,203,203,.1);
        height: 20px;
        width: 150px;
    }
    &:nth-child(4){
        & > section{
            height: 45px;
            &:nth-child(2){
                width: 150px;
                border-radius: 0px;
            }
        }
    }
}

${p=>p.theme.media.desktop6}{
    margin: 45px;
}





`


export default function LoadingDiv() {
    return (
        <Wrapper>
            <div>

            </div>
            <div>
                <section></section>
                <section></section>
                
            </div>
            <div></div>
            <div>
                <section></section>
                <section></section>
            </div>
        </Wrapper>
    )
}
