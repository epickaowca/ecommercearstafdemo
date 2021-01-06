import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
const DetailsItemTitleElem = styled.div`
    padding: 20px 0px;
    padding-left: 30px;
    margin: auto;
    border-top: 1px solid ${p=>p.theme.color3};
    border-bottom: 1px solid ${p=>p.theme.color3};
    & > h1{
        font-weight: 500;
        margin: 20px 0px;
        font-size: 1.5rem;
    }
    & > p{
        color: ${p=>p.theme.color3};
        font-size: .85rem;
        max-width: 400px;
        margin-bottom: 30px;
    }
    ${p=>p.theme.media.special2}{
        padding-left: 0px;
        border-top: none;
        & > h1{
            font-size: 1.2rem;
            margin-top: 0px;
        }
        & > p{
            font-size: .8rem;
        }    
    }
    ${p=>p.theme.media.desktop3}{
        & > h1{
            font-size: 2rem;
        }
        & > p{
            font-size: 1rem;
        }    
    }
`

export default React.memo(()=> {
    const name = useSelector(state=>state.shopReducer.detailProduct.nazwa)
    const description = useSelector(state=>state.shopReducer.detailProduct.opis)
    return (
        <DetailsItemTitleElem>
            <h1>{name}</h1>
            <p>{description}</p>
        </DetailsItemTitleElem>
    )
})
