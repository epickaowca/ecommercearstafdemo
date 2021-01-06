import React from 'react'
import styled from 'styled-components'
import { Button } from '../elements/Button'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCartProduct, setCartEject } from '../../redux/ducks/shopReducer'
import axios from 'axios'
import Heart from '../elements/Heart'

const ProductElem = styled.div` 
    display: ${p=>p.display==='true' ? 'block' : 'none'};
    width: 320px;
    margin: 20px 25px;
    margin-bottom: 40px;
    & > div{
        width: 100%;
        &:nth-child(1){
            background: ${p=>p.theme.color2};
            & > div{
                width: 100%;
                height: 100%;
                display: flex;
                & > a{
                    margin: auto;
                    width: 100%;
                    & > img{
                        object-fit: contain;
                        width: 100%;
                        height: 320px;
                    }
                }
            }
        }
        &:nth-child(2){
            background: white;
            height: 150px;
            padding: 15px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            & > div{
                &:nth-child(1){
                    & > button {
                        border: none;
                        outline: none;
                        background: none;
                        position: absolute;
                        right: 0;
                        top: -10px;
                        width: 40px;
                        display: block;
                        cursor: pointer;
                        & > svg{
                            width: 100%;
                            transform: scale(.7);
                            & > path{
                                ${p=>p.wishList && `
                                    fill: #FF7979;
                                    stroke: #FF7979;
                                `}
                            }
                        }
                    }
                }
                //price
                position: relative;
                display: flex;
                justify-content: space-between;
                &:nth-child(2){
                    justify-content: flex-start;
                    & > p{
                        font-weight: 500;
                        font-size: 1.1rem;
                        &:first-child{
                            margin-right: 15px;
                            text-decoration: line-through;
                        }
                        &:nth-child(2){
                            color: red;
                        }
                    }
                }
                }
                & > h5{
                    opacity: .6;
                    max-width: 170px;
                }
                & > a{
                    & > button{
                        font-size: 1rem;
                    }
                }
                & > button{
                    font-size: 1rem;
                }
            }
            & > p{
                font-weight: 500;
                font-size: 1.1rem;
            }
        }
    }

    ${p=>p.theme.media.mobile2}{
        margin 20px 25px;
        margin-bottom: 40px;
        width: 280px;
    }
    
`

export default React.memo(({product}) => {
    const search = useSelector(state=>state.shopReducer.search)
    const cat = useSelector(state=>state.shopReducer.currentCategory.cat)
    const wishListListen = useSelector(state=>state.shopReducer.wishListProducts)
    const dispatch = useDispatch();
    const preUrl = useSelector(state=>state.shopReducer.preUrl)
    let url = `${preUrl}${product.img}`
    const { nazwa, cena, display, id, wishList, cena_promocyjna } = product
    const addProduct = async()=>{
        const data = await axios(`${preUrl}/products/${product.id}`).then(res=>res.data)
        let confI, rozI
        data.config.every((element, configIndex) => {
            confI = configIndex
            let elem = element.rozmiar.findIndex((e)=>e.ilosc>0)
            rozI = elem
            if(elem!==-1){
                return false
            } else{
                return true
            }
        });
        const cartProduct = {
            id: data.id,
            nazwa: data.nazwa,
            kolor: data.config[confI].kolor,
            kolorSlownie: data.config[confI].kolorSlownie,
            rozmiar: data.config[confI].rozmiar[rozI].rozmiar,
            cena: cena_promocyjna ? cena_promocyjna : cena,
            img: preUrl+data.config[0].img[0].url,
            maxQuantity: data.config[confI].rozmiar[rozI].ilosc
        }
        dispatch(setCartProduct(cartProduct))
        dispatch(setCartEject(true))
    }
    return (
        <ProductElem wishList={wishList} display={display}>
            <div>
                <div>
                    <Link to={`/products/${id}`}>
                        <img src={url} alt="productImg"></img>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <h5>{nazwa}</h5>
                    <button>
                        <Heart id={id} />
                    </button>
                </div>
                {cena_promocyjna ? 
                <div>
                    <p>{cena}</p>
                    <p>{cena_promocyjna} PLN</p>
                </div>
                :
                <p>{cena} PLN</p>
                }
                <div>
                    <Button onClick={addProduct}>Dodaj</Button>
                    <Link to={`/products/${id}`}>
                        <Button >Zobacz</Button>
                    </Link>
                </div>
            </div>
        </ProductElem>
    )
})
