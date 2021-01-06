import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {ReactComponent as RemoveImg} from '../../asset/close.svg'
import { removeWishListProduct } from '../../redux/ducks/shopReducer'

const Wrapper = styled.div`
position: relative;
& > button{
    outline: none;
    border: none;
    background: none;
    position: absolute;
    top: 15px;
    right: 40px;
    z-index: 2;
    & > svg{
        width: 40px;
        height: 40px;    
        padding: 10px;
        cursor: pointer;
        & > g{
            & > line{
                stroke: black;
            }
        }
    }
}
& > a{
    cursor: pointer;
    z-index: 1;
    min-width: 190px;
    margin: 0px 20px;
    width: 60vw;
    height: 300px;
    background-color: ${p=>p.theme.color2};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    max-width: 300px;
    padding: 15px;
    & > div{
        &:nth-child(1){
            width: 100%;
            height: 80%;
            background-image: url(${p=>p.img});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        &:nth-child(3){
            display: flex;
            justify-content: space-between;
            & > p{
                color: black;
                font-size: .9rem;
            }
        }
    }
    & > p{
        font-size: .9rem;
        color: ${p=>p.theme.color3};
    }
}
    ${p=>p.theme.media.desktop6}{
        & > a{
            max-width: unset;
            width: 370px;
            margin: 0px 30px;
        }
    }
`

export default function RecommendedItem({item, wishList}) {
    const preUrl = useSelector(state=>state.shopReducer.preUrl)
    const dispatch = useDispatch()
    let url = preUrl+item.img
    if(item.lack){
        return null
    }
    return (
        <Wrapper img={url}>
            {wishList && <button onClick={()=>dispatch(removeWishListProduct(item.id))}><RemoveImg /></button>}
            <Link to={`/products/${item.id}`}>
                <div></div>
                <p>{item.category}</p>
                <div>
                    <p>{item.name}</p>
                    <p>{item.price} PLN</p>
                </div>
            </Link>
        </Wrapper>
    )
}
