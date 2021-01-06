import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setQuantity, toggleState, removeCartProduct } from '../../redux/ducks/shopReducer'
import plus from '../../asset/plus.png'
import minus from '../../asset/minus.png'
import {ReactComponent as  Edit } from '../../asset/edit.svg'
import { Close } from '../elements/CloseImg'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    margin: 40px 0;
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    & > input{
        display: none;
    }
    & > div{
        //content
        &:nth-child(5){
            display: flex;
            & > div{
                //zdj
                &:nth-child(1){
                    background: ${p=>p.theme.color2};
                    width: 150px;
                    height: 150px;
                    & > img{
                        width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                    }
                }
                //full content
                &:nth-child(2){
                    margin-left: 20px;
                    color: black;
                    display: flex;
                    flex-direction: column;
                    //title
                    & > h3{
                        font-size: 1rem;
                        font-weight: 500;
                    }
                    //div pod title
                    & > div{
                        display: flex;
                        justify-content: space-between;
                        padding-right: 5px;
                        & > div{
                            //config
                            &:nth-child(1){
                                & > div{
                                    //color and size
                                    &:nth-child(1){
                                        margin-top: 10px;
                                        display: flex;
                                        flex-direction: column;
                                        & > span{
                                            display: flex;
                                            align-items: center;
                                            & > p{
                                                font-size: 1rem;
                                                margin-right: 10px;
                                                color: ${p=>p.theme.color3};
                                            }
                                            & > span{
                                                font-size: 1rem;
                                            }
                                            //color
                                            &:nth-child(1){
                                                
                                            }
                                            //size
                                            &:nth-child(2){
                                                margin-top: 5px;
                                            }
                                        }
                                    }
                                    //edit, delete
                                    &:nth-child(2){
                                        display: flex;
                                        margin-top: 5px;
                                        & > a{
                                            display: flex;
                                            margin-right: 15px;
                                            & > svg{
                                                width: 19px;
                                                margin: auto;
                                            }
                                        }
                                        & > div{
                                            display: flex;
                                            margin-left: 15px;
                                            & > svg{
                                                width: 19px;
                                                margin: auto;
                                            }
                                        }
                                    }
                                    //quantity, price
                                    &:nth-child(3){
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;
                                        & > div{
                                            margin-top: 15px;
                                            display: flex;
                                            align-items: center;
                                            & > span{
                                                display: flex;
                                                cursor: pointer;
                                                & > img{
                                                    margin: auto;
                                                    width: 24px;
                                                }
                                            }
                                            & > p{
                                                margin: 0 10px;
                                                font-size: .9rem;
                                            }
                                        }
                                        //price
                                        & > p{
                                            margin-top: 10px;
                                            font-size: .9rem;
                                        }
                                    }
                                }
                        
                            }
                        }
                    }
                }
            }
        }
    }
    @media(min-width: 450px){
        & > input{
            display: none;
        }
        & > div{
            //content
            &:nth-child(5){
                & > div{
                    //zdj
                    &:nth-child(1){
                        width: 45%;
                        height: 180px;
                    }
                    //full content
                    &:nth-child(2){
                        margin-left: 20px;
                        width: 55%;
                        //title
                        & > h3{
                            font-size: 1.1rem;
                            font-weight: 500;
                        }
                        //div pod title
                        & > div{
                            & > div{
                                //config
                                width: 100%;
                                &:nth-child(1){
                                    & > div{
                                        //color, size
                                        &:nth-child(1){
                                            flex-direction: row;
                                            margin-top: 10px;
                                            & > span{
                                                //color
                                                &:nth-child(1){
                                                    margin-right: 15px;
                                                }
                                            }
                                        }
                                        //edit, delete
                                        &:nth-child(2){
                                            margin-top: 10px;
                                            & > a{
                                                & > svg{
                                                    width: 24px;
                                                }
                                            }
                                            & > div{
                                                & > svg{
                                                    width: 24px;
                                                }
                                            }
                                        }
                                        //quantity, price
                                        &:nth-child(3){
                                            flex-direction: row;
                                            align-items: center;
                                            margin-top: 35px;
                                            & > div{
                                                margin: unset;
                                                & > span{
                                                    & > img{
                                                        width: 30px;
                                                    }
                                                }
                                                & > p{
                                                    font-size: 1rem;
                                                }
                                            }
                                            //price
                                            & > p{
                                                margin-top: 0px;
                                                font-size: 1rem;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default function CartItem({item}) {
    const dispatch = useDispatch()
    const { rozmiar, kolorSlownie, nazwa, quantity, cena, id, img } = item
    return (
        <Wrapper>
            <input readOnly value={id} name="id[]" type="number" />
            <input readOnly value={quantity} name="quantity[]" type="number" />
            <input readOnly value={kolorSlownie} name="color[]" type="text" />
            <input readOnly value={rozmiar} name="size[]" type="text" />
            <div>
                <div>
                    <img src={img} alt="hoodie" />
                </div>
                <div>
                    <h3>{nazwa}</h3>
                    <div>
                        <div>
                            <div>
                                <span>
                                    <p>kolor:</p>
                                    <span>{kolorSlownie}</span>
                                </span>
                                <span>
                                    <p>rozmiar:</p>
                                    <span>{rozmiar}</span>
                                </span>
                            </div>
                            <div>
                                <Link onClick={()=>dispatch(toggleState('cartEject'))} to={`/products/${id}`}><Edit /></Link>
                                <div onClick={()=>dispatch(removeCartProduct(id))}><Close color="#373737" /></div>
                            </div>
                            <div>
                                <div>
                                    <span onClick={()=>dispatch(setQuantity(id,'minus'))}><img src={minus} alt="reduce"/></span>
                                    <p>{quantity}</p>
                                    <span onClick={()=>dispatch(setQuantity(id,'plus'))}><img src={plus} alt="increase"/></span>
                                </div>
                                <p>{(cena*quantity).toFixed(2)} PLN</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
