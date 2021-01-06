import React from 'react'
import styled from 'styled-components'
import { Close } from '../elements/CloseImg'

const Wrapper = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 100vh;
    background: #373737;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 8;
    padding: 30px;
    color: white;
    & > div{
        margin: auto;
        max-width: 500px;
        & > div{
            &:nth-child(1){
                display: flex !important;
                align-items: center;
                justify-content: space-between;
                & > p{
                    font-size: 1.5rem;
                }
                & > span{
                    display: block;
                    cursor: pointer;
                }
            }
        }
        & > nav{
            margin-top: 45px;
            & > a{
                margin: 20px auto !important;
            }
        }
        & > p{
            cursor: pointer;
            opacity: .7;
            font-size: 1.5rem;
            margin: 20px 0px;
            &:nth-child(4){
                margin-top: 50px;
            }
            &:hover{
                opacity: 1;
            }
        }
        & > hr{
            margin-top: 35px;
            border: 1px solid ${p=>p.theme.color3};
        }
    }
`

const MobileMenu = ({title, toggle, children})=>{
    return (
        <Wrapper>
            <div>
                <div>
                    <p>{title}</p>
                    <Close onClick={toggle} />
                </div>
                <hr></hr>
                {children}
            </div>
        </Wrapper>
    )
}

export default MobileMenu