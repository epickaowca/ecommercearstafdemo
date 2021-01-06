import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import CartItem from '../structure/CartItem'
import { Close } from '../elements/CloseImg'
import { useDispatch, useSelector } from 'react-redux'
import { toggleState } from '../../redux/ducks/shopReducer'
import { Button } from '../elements/Button'
import gsap, { Power2 } from "gsap";

const CartElem = styled.div`
position: absolute;
width: 100vw;
max-width: 450px;
background: white;
top: 0;
right: 0;
z-index: 15;
color: white;
min-height: 100vh;
transform: translateX(100%);

& > form{
    max-height: 100vh;
    overflow: auto;
    & > h1{
        color: black;
        text-align: center;
        margin-top: 40px;
    }
    & > div{
        //top level
        &:nth-child(1){
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: ${p=>p.theme.color1};
            & > h1{
                font-size: 1.5rem;
            }
            & > svg{
                width: 25px;
                &:hover{
                    opacity: .8;
                }
            }
        }
        //orders
        &:nth-child(2){
            height: 70vh;
            min-height: 100px;
            max-height: 500px;
            overflow: auto;
        }
        //checkout
        &:nth-child(3){
            padding: 0px 20px;
            & > hr{
                margin: 20px 0px;
                border: none;
                height: 1px;
                background: ${p=>p.theme.color1};
                margin: 
            }
            & > div{
                //do zapłaty
                padding-bottom: 50px;
                &:nth-child(2){
                    padding: 0px 15px;
                    color: black;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                    & > h1{
                        font-size: 1rem;
                        margin-right: 20px;
                        font-weight: normal;
                    }
                    & > p{
                        font-size: 1rem;
                    }
                }
                //buttons
                &:nth-child(3){
                    & > div{
                        display: flex;
                        flex-direction: column;
                        & > button{
                            font-size: .9rem;
                            display: flex;
                            justify-content: center;
                            &:nth-child(1){
                                margin-bottom: 25px;
                            }
                        }
                        @media(min-width: 450px){
                            flex-direction: row;
                            & > button{
                                margin: auto;
                                &:nth-child(1){
                                    margin-bottom: 0px;
                                    margin-right: 15px;
                                }
                                &:nth-child(2){
                                    margin-left: 15px;
                                }
                            }
                        }
                    }
                    & > p{
                        margin-top: 15px;
                        color: rgba(0,0,0,.6);
                    }
                }
            }
            
        }
    }
    }
`
let firstTime = true
export default React.memo(()=> {
    const refCart = useRef();
    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.shopReducer.cartProducts)
    const freeDelivery  = useSelector(state => state.mainPageReducer.freeDelivery)
    const cartEject = useSelector(state => state.shopReducer.cartEject)
    const cartItems =  Object.values(cartProducts);
    let sum = 0;
    cartItems.forEach(elem => {
        sum += elem.cena*elem.quantity
    });
    useEffect(()=>{
        const { current } = refCart
        let tl = gsap.timeline({ease: Power2.easeOuteaseOut})
        const scroll =  document.documentElement.scrollTop
        if(cartEject){
            tl.set(current, {top: scroll})
            .to(current, {transform: 'translateX(0)', duration: .4})
        }else if(!cartEject && !firstTime){
            tl.to(current, {transform: 'translateX(450px)', duration: .4})
        }

    }, [cartEject])

    useEffect(()=>{
        firstTime=false
    }, [])
    return (
        <CartElem ref={refCart}>
            {Object.values(cartProducts).length ? 
            <form>
                <div>
                    <h4>Moje zamówienia</h4>
                    <Close onClick={()=>dispatch(toggleState('cartEject'))} />
                </div>
                <div>
                    {cartItems.map(item=><CartItem key={item.id} item={item} />)}
                </div>
                <div>
                    <hr />
                    <div>
                        <h1>Do Zapłaty:</h1>
                        <p>{sum.toFixed(2)} PLN</p>
                    </div>
                    <div>
                        <div>
                            <Button type="submit" value="strapi" name="strapi">Zapłać teraz</Button>
                            <Button type="submit" value="pod" name="pod"> płatność przy odbiorze </Button>
                        </div>
                        {freeDelivery && <p>przy zakupie {freeDelivery} lub więcej produktów darmowa dostawa!</p> }
                        
                    </div>
                </div>
            </form>:
            <form>
            <div>
                <h4>Moje zamówienia</h4>
                <Close onClick={()=>dispatch(toggleState('cartEject'))} />
            </div>
            <h1>Twój koszyk jest pusty</h1>
            </form>}
   
            
        </CartElem>
    )
})
