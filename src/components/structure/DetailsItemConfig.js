import React, { useEffect } from 'react'
import { Button } from '../elements/Button'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { updateDetailProduct, setCartProduct, setCartEject } from "../../redux/ducks/shopReducer"

const DetailsItemConfigElem = styled.div`
    padding-left: 30px;
    & p{
    font-weight: 500;
    }

& > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 320px;
    margin: 25px 0px;
    & > div{
        display: flex;
        margin: 25px;
        margin-left: 0px;
        width: 240px;
        justify-content: space-between;
        align-items: flex-end;
        & > span{
            font-weight: 500;
            margin-left: 30px;
            & > select{
                border: 1px solid black;
                width: 130px;
                padding: 5px 10px;
            }
        }
        //cena
        &:nth-child(1){
        }
        //color
        &:nth-child(2){
        }
        //sizes
        &:nth-child(3){
        }
    }
    & > span{
        margin: auto;
     
  
    }
}
& > button{
    max-width: 300px;
    width: 100%;
    margin: 50px 0px;
}
${p=>p.theme.media.mobile1}{
    & > div{
        & > div{
            width: 300px;
            & > span{
                & > select{
                    font-size: 1rem;
                }
            }
            & > p{
                font-size: 1.2rem;
            }
        }
    }
}
${p=>p.theme.media.special2}{
    padding-left: 0px;
}
${p=>p.theme.media.desktop3}{
    & > div{
        & > div{
            width: 450px;
            & > span{
                & > select{
                    width: 200px;
                }
            }
        }
    }
}
`

export default React.memo(()=>{
    const dispatch = useDispatch()
    const state = useSelector(state=>state.shopReducer)
    let colorSlownie = [];
    let rozmiar = [];
    const { detailFullProduct } = state
    if(Object.keys(detailFullProduct).length){
        detailFullProduct.config.map(item=>{
            colorSlownie.push(item.kolorSlownie)
            if(item.kolorSlownie===state.detailProduct.kolorSlownie){
                rozmiar.push(...item.rozmiar)
            }
            return null
        })
    }
    useEffect(()=>{
        if(rozmiar.length){
            dispatch(updateDetailProduct({key: 'rozmiar', value: rozmiar[0].rozmiar}))
        }
    },[state.detailProduct.kolorSlownie, dispatch])

    const addProductHandler = ()=>{
        dispatch(setCartProduct(state.detailProduct))
        dispatch(setCartEject(true))
    }

    useEffect(()=>{
        if(Object.keys(detailFullProduct).length){
            const config = detailFullProduct.config.find(elem=>elem.kolor===state.detailProduct.kolor)
            dispatch(updateDetailProduct({key: 'img', value: state.preUrl+config.img[0].url}))
        }
    },[state.detailProduct.kolor, dispatch, detailFullProduct, state.preUrl])



    const colorHandler = (e)=>{
        console.log(console.log('xddd'))
        let color = e.target.value
        let img = detailFullProduct.config.find(item=>item.kolorSlownie===color)
        let helper = detailFullProduct.config.find(e=>e.kolorSlownie===color)
        dispatch(updateDetailProduct({key: 'img', value: state.preUrl+img.img[0].url}))
        dispatch(updateDetailProduct({key: 'maxQuantity', value: helper.rozmiar[0].ilosc}))
        dispatch(updateDetailProduct({key: 'kolorSlownie', value: color}))
    
    }

    const sizeHandler = (e)=>{
        let size = e.target.value
        let findHelper = detailFullProduct.config.find(e=>e.kolorSlownie===state.detailProduct.kolorSlownie)
        let findHelper2 = findHelper.rozmiar.find(e=>e.rozmiar===size)
        dispatch(updateDetailProduct({key: 'maxQuantity', value: findHelper2.ilosc}))
        dispatch(updateDetailProduct({key: 'rozmiar', value: size}))
    
    }
    return (
        <DetailsItemConfigElem>
            <div>
                <div>
                    <p>cena:</p>
                    <span>{state.detailProduct.cena} PLN</span>
                </div>
                <div>
                    <p>kolor:</p>
                    <span>
                        <select onChange={colorHandler}>
                            {colorSlownie && colorSlownie.map((item, index)=><option value={item} key={index}>{item}</option>)}
                        </select>
                    </span>
                </div>
                <div>
                    <p>rozmiar:</p>
                    <span>             
                        <select onChange={sizeHandler}>
                            {rozmiar && rozmiar.map((item, index)=><option key={index}>{item.rozmiar}</option>)}
                        </select>       
                    </span>
                </div>
            </div>
            <Button onClick={addProductHandler} width="150px;">Dodaj</Button>
        </DetailsItemConfigElem>
    )
})
