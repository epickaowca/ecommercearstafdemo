import React from 'react'
import styled from 'styled-components'
import img1 from '../../asset/insta1.png'
import img2 from '../../asset/insta2.png'
import img3 from '../../asset/insta3.png'

const Wrapper = styled.div`
    & > div{
        &:nth-child(1){
            display: none;
        }
        //content
        &:nth-child(2){
            text-align: center;
            padding: 10px;
            max-width: 400px;
            margin: auto;
            & > h1{
                font-size: 1.5rem;
                color: ${p=>p.theme.color1};
            }
            & > h3{
                color: #FF5712;
                margin-top: 10px;
                margin-bottom: 20px;
                font-weight: 500;
            }
            & > p{
                font-size: .9rem;
                color: ${p=>p.theme.color3};
            }
        }
    }
    ${p=>p.theme.media.special2}{
        display: flex;
        justify-content: space-around;
        & > div{
            &:nth-child(1){
                display: flex;
                align-items: flex-start;
                & div{
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                & > div{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    //2 zdj po lewej
                    &:nth-child(1){
                        & > div{
                            &:nth-child(1){
                                width: 200px;
                                height: 180px;
                                background-image: url(${p=>p.img.img1});
                            }
                            &:nth-child(2){
                                margin-top: 10px;
                                width: 180px;
                                height: 130px;
                                background-image: url(${p=>p.img.img2});
                            }
                        }
                    }
                    //1 zdj po prawej
                    &:nth-child(2){
                        margin-left: 10px;
                        width: 200px;
                        height: 250px;
                        background-image: url(${p=>p.img.img3});
                    }
                }
            }
            //content
            &:nth-child(2){
                padding: 0px;
                max-width: 270px;
                margin: unset;
                text-align: left;
                & > h3{
                    margin-top: 10px;
                    margin-bottom: 30px;
                }
                & > p{
                    font-size: .8rem;
                }
            }
        }
    }
    ${p=>p.theme.media.desktop2}{
        & > div{
            &:nth-child(2){
                max-width: 350px;
                & > h1{
                    font-size: 1.7rem;
                }
            }
        }
    }
    ${p=>p.theme.media.mobile2}{
        max-width: 1000px;
        margin: auto;
        & > div{
            &:nth-child(1){
                & > div{
                    //2 zdj po lewej
                    &:nth-child(1){
                        & > div{
                            &:nth-child(1){
                                width: 250px;
                                height: 220px;
                            }
                            &:nth-child(2){
                                width: 230px;
                                height: 150px;
                            }
                        }
                    }
                    //1 zdj po prawej
                    &:nth-child(2){
                        width: 250px;
                        height: 330px;
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop3}{
        max-width: 1300px;
        & > div{
            &:nth-child(1){
                & > div{
                    &:nth-child(1){
                        & > div{
                            &:nth-child(1){
                                width: 280px;
                                height: 250px;
                            }
                            &:nth-child(2){
                                width: 260px;
                                height: 200px;
                            }
                        }
                    }
                    &:nth-child(2){
                        width: 280px;
                        height: 400px;
                    }
                }
            }
            &:nth-child(2){
                max-width: 400px;
                & > h1{
                    font-size: 1.9rem;
                }
                & > p{
                    font-size: .9rem;
                }
            }
        }
    }
    ${p=>p.theme.media.desktop4}{
        & > div{
            &:nth-child(1){
                & > div{
                    &:nth-child(1){
                        & > div{
                            &:nth-child(1){
                                width: 360px;
                                height: 300px;
                            }
                            &:nth-child(2){
                                width: 340px;
                                height: 250px;
                            }
                        }
                    }
                    &:nth-child(2){
                        width: 360px;
                        height: 500px;
                    }
                }
            }
            &:nth-child(2){
                & > h1{
                    font-size: 2.2rem;
                }
                & > p{
                    font-size: 1.1rem;
                }
            }
        }
    }
    ${p=>p.theme.media.desktop5}{
        max-width: 1500px;
        & > div{
            &:nth-child(1){
                & > div{
                    &:nth-child(1){
                        & > div{
                            &:nth-child(1){
                                width: 420px;
                                height: 350px;
                            }
                            &:nth-child(2){
                                width: 400px;
                                height: 280px;
                            }
                        }
                    }
                    &:nth-child(2){
                        width: 420px;
                        height: 530px;
                    }
                }
            }
            &:nth-child(2){
                & > h1{
                    font-size: 2.3rem;
                }
                & > h3{
                    font-size: 1.5rem;
                    margin-top: 20px;
                    margin-bottom: 40px;
                }
                & > p{
                    font-size: 1.2rem;
                }
            }
        }
    }
`

export default function SocialsInsta() {
    return (
        <Wrapper img={{img1, img2, img3}}>
            <div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
            <div>
                <h1>Zobacz nas na insta</h1>
                <h3>@Nazwa</h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p>
            </div>
        </Wrapper>
    )
}
