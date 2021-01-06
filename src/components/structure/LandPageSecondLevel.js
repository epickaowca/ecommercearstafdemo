import React from 'react'
import { HomeButton } from '../elements/HomeButton'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 80%;
max-width: 300px;
text-align: center;
color: white;
& > p{
    margin: 20px 0;
    color: white;
    font-size: .9rem;
}
& > h1{
    font-size: 1.6rem;
}
${p=>p.theme.media.mobile1}{
    max-width: 400px;
    & > h1{
        font-size: 2rem;    
    }
    & > p{
        margin: 40px 0;
        font-size: 1rem;
    }
    & > a{
        & > button{
            font-size: 1.2rem;
        }
    }
}
${p=>p.theme.media.desktop2}{
    text-align: left;
    left: 100px;
    transform: translateY(-50%);
    max-width: 500px;
    & > h1{
        font-size: 2.5rem;    
    }
    & > p{
        color: white;
        font-size: 1.3rem;
    }
    & > a {
        & > button{
            font-size: 1.3rem;
        }
    }
}
${p=>p.theme.media.mobile2}{
    left: 150px;
}
${p=>p.theme.media.desktop3}{
    max-width: 650px;
    left: 200px;
    & > h1{
        font-size: 3rem;    
    }
    & > p{
        font-size: 1.5rem;
    }
    & > a{
        & > button{
            font-size: 1.5rem;
        }
    }
}
${p=>p.theme.media.desktop5}{
    left: 300px;
}
`

export default function LandPageSecondLevel({content}) {
    return (
        <Wrapper>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <Link to="/sklep"><HomeButton landPage>{content.button}</HomeButton></Link>
        </Wrapper>
    )
}
