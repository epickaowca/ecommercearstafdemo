import React, { useEffect } from 'react'
import styled from 'styled-components'
import Product from '../structure/Product'
import Categories from '../structure/Categories'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../elements/Button'
import { loadProducts, loadCategories } from '../../redux/ducks/shopReducer'
import LoadingDiv from '../structure/LoadingDiv'

const ProductsElem = styled.div`
    margin-top: 50px;
    display: flex;
    width: 100%;

    & > div{
        &:nth-child(1){
            display: none;
            max-width: 200px;
        }
        &:nth-child(2){
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            padding-bottom: 100px;
            position: relative;
            & > section{
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    ${p=>p.theme.media.mobile1}{
        & > div{
            &:nth-child(2){
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }
    
    ${p=>p.theme.media.mobile2}{
        & > div{
            &:nth-child(1){
                display: block;
                width: 20%;
                margin-top: 0px;
                margin-left: 50px;
            }
            &:nth-child(2){
                width:80%;
            }
        }
    }
    ${p=>p.theme.media.desktop4}{
        & > div{
            &:nth-child(1){
                margin-left: 0px;
            }
            &:nth-child(2){
                width: 100%;
            }
        }
    }
    ${p=>p.theme.media.desktop6}{
        & > div{
            &:nth-child(1){
                max-width: 300px;
            }
            &:nth-child(2){
                width: 90%;
            }
        }
    }
`

const tab = Array.from({length:45},(v,k)=>k+1)
let firstTime = false

export default React.memo(()=> {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.shopReducer.products)
    const productsLoad = useSelector(state=>state.shopReducer.productsLoad)
    const isThereMore = useSelector(state=>state.shopReducer.isThereMore)
    const search = useSelector(state=>state.shopReducer.search)
    const cat = useSelector(state=>state.shopReducer.currentCategory.cat)
    const wishlist = useSelector(state=>state.shopReducer.wishListProducts)
    const sortState = useSelector(state=>state.shopReducer.sortState)
    let res = products
    if(products[0]==='error'){
        return(
            <h1 style={{color: 'red', position: 'absolute', left: '50%'}}>Server Error</h1>
        )
    }
    const dateInPastArrow = (firstDate, secondDate) => new Date(firstDate).setHours(0, 0, 0, 0) <= new Date(secondDate).setHours(0, 0, 0, 0)
    
    if(res.length>0){
        res.forEach(elem=>{
            let stillSomeTabHelper = []
            elem.config.forEach(e=>{
                e.rozmiar.forEach(roz=>{
                    stillSomeTabHelper.push(roz.ilosc)
                })
            })
            let isThereStillSome = stillSomeTabHelper.every(e=>e!==0)
            if(!isThereStillSome){
                elem.lack = true
            }
        })

        //lack filter
        let lackFiltered = res.filter(e=>e.lack!==true)
        res = lackFiltered
        //filter
        res.forEach(elem => {
            elem.wishList=false
            elem.kategoria === cat ? elem.display='true' : cat === 'wszystko' ? elem.display='true' : elem.display='false' 
        })
        res.forEach(elem=>{
            if(elem.display=='true'){
                search.trim()==="" ? elem.display='true' : elem.nazwa.toLowerCase().includes(search) ?  elem.display='true' : elem.display="false"
            }
        })
        res.forEach(elem=>{
            wishlist.forEach(wishElem=>{
                if(elem.id==wishElem){
                    elem.wishList=true
                }
            })
        })
        //sort
        if(sortState[0] === 'price'){
            if(sortState[1]==='high'){
                res.sort((a,b)=>{
                    if(a.cena_promocyjna){
                        if(b.cena_promocyjna){
                            return a.cena_promocyjna-b.cena_promocyjna
                        }else{
                            return a.cena_promocyjna-b.cena
                        }
                    }else{
                        if(b.cena_promocyjna){
                            return a.cena-b.cena_promocyjna
                        }else{
                            return a.cena-b.cena
                        }
                    }
                })
            }else if(sortState[1]==='low'){
                res.sort((a,b)=>{
                    if(b.cena_promocyjna){
                        if(a.cena_promocyjna){
                            return b.cena_promocyjna-a.cena_promocyjna
                        }else{
                            return b.cena_promocyjna-a.cena
                        }
                    }else{
                        if(a.cena_promocyjna){
                            return b.cena-a.cena_promocyjna
                        }else{
                            return b.cena-a.cena
                        }
                    }
                })
            }
        }else if(sortState[0] === 'news'){
        
        res.sort(function(a,b){
            return new Date(b.published_at.slice(0,10)) - new Date(a.published_at.slice(0,10));
        });
        }else if(sortState[0].length){
        let sortedTab1 = res.filter(e=>e[sortState[0]])   
        let sortedTab2 = res.filter(e=>!e[sortState[0]])
        res = sortedTab1.concat(sortedTab2)
        }else{
            res.sort((a,b)=>a.id-b.id)
        }
        
    }

    let resHelper = res
    let loadingTab1 = resHelper.concat(tab)
    let loadingTab2 = loadingTab1.map((product, index)=>product.id ? <Product key={index} product={product} /> : <LoadingDiv key={index}></LoadingDiv> )

    useEffect(()=>{
        if(!firstTime){
            dispatch(loadProducts())
            firstTime = true
        }   
    }, [])
    return (
        <ProductsElem>
            <Categories color='black' />
            <div>
                {productsLoad ? loadingTab2 : res.map((product, index)=><Product key={index} product={product} />)}
                <section>
                    {productsLoad ? <p>Loading</p> : isThereMore && <Button onClick={()=>dispatch(loadProducts())}>Load More</Button>}
                </section>
            </div>
        </ProductsElem>
    )
})
