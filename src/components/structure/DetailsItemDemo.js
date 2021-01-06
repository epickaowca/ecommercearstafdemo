import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as BackArrow } from '../../asset/backArrow.svg'
import { Link } from 'react-router-dom'
import { updateDetailProduct } from '../../redux/ducks/shopReducer' 
import Heart from '../elements/Heart'

const DetailsItemDemoElem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    & > div{
        &:nth-child(1){
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 30px;
            & > svg{
                cursor: pointer;
                width: 30px;
                &:hover{
                    & > path{
                        stroke: #FF7979;
                        fill: #FF7979;
                    }
                }
                ${p=>p.amIOnWishList && `
                    & > path{
                        stroke: #FF7979;
                        fill: #FF7979;
                    }
                `}
            }
        }
        &:nth-child(2){
            width: 320px;
            height: 300px;
            margin: 25px 0px;
            & > img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &:nth-child(3){
            display: flex;
            & > div{
                cursor: pointer;
                margin: 0px 7px;
                width: 30px;
                height: 30px;
                border: 2px solid ${p=>p.theme.color1};
                border-radius: 50%;
                &:nth-child(${p=>p.whichImg+1}){
                    background: ${p=>p.theme.color1};
                }
                &:hover{
                    background: ${p=>p.theme.color1};
                }
            }
        }
    }
    ${p=>p.theme.media.special2}{
        position: relative;
        width: 400px;
        max-height: 580px;
        & > div{
            &:nth-child(1){
                width: auto;
                position: absolute;
                right: 27px;
                top: 15px;
                padding: 0px;
                & > a{
                    display: none;
                }
            }
            &:nth-child(2){
                width: 100%;
                height: 80%;
                margin: 25px 0px;
                margin-top: 50px;
            }
        }
    }
`
let amIOnWishList = false
export default React.memo(()=>{
    const dispatch = useDispatch()
    const stateImg = useSelector(state=>state.shopReducer.detailProduct.img)
    const price = useSelector(state=>state.shopReducer.detailProduct.cena)
    const color = useSelector(state=>state.shopReducer.detailProduct.kolorSlownie)
    const preUrl  = useSelector(state=>state.shopReducer.preUrl)
    const detailFullProduct  = useSelector(state=>state.shopReducer.detailFullProduct)
    const wishList = useSelector(state=>state.shopReducer.wishListProducts)
    wishList.forEach(e=>{
        if(+e===+detailFullProduct.id){
            amIOnWishList = true
        }else{
            amIOnWishList = false
        }
    })
    let img
    if(detailFullProduct && price){
        img = detailFullProduct.config.find(item=>item.kolorSlownie===color)
        img = img.img
    }
    let whichImg = 0;
    if(img){
        img.forEach((e, index)=>{
            if(preUrl+e.url===stateImg){
                whichImg=index
            }
        })
    }
    return (
        <DetailsItemDemoElem whichImg={whichImg} amIOnWishList={amIOnWishList}>
            <div>
                <Link to="/shop"><BackArrow /></Link>
                <Heart id={detailFullProduct.id}/>
            </div>
            <div>
                <img alt="ItemImg" src={stateImg} />
            </div>
            <div>
            {img && img.map((item)=>
                <div onClick={()=> dispatch(updateDetailProduct({key: 'img', value: preUrl+item.url}))} key={item.url}></div>)}
            </div>
        </DetailsItemDemoElem>
    )
})
