import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch} from 'react-redux'
import { ReactComponent as BackArrow } from '../../asset/backArrow.svg'
import { Link } from 'react-router-dom'
import DetailsItemTitle from '../structure/DetailsItemTitle'
import DetailsItemDemo from '../structure/DetailsItemDemo'
import DetailsItemConfig from '../structure/DetailsItemConfig'
import {useLocation } from 'react-router-dom'
import axios from 'axios'
import { setDetailProduct } from '../../redux/ducks/shopReducer' 
import Recommended from './Recommended'
import Footer from './Footer'

const DetailsItemElem = styled.div`
    margin-top: 30px;
    & > hr{
        border: none;
        height: 1px;
        background: ${p=>p.theme.color3};
        &:nth-child(2){
            margin-bottom: 80px; 
        }
    }
    & > div{
        &:nth-child(1){
            display: flex;
            flex-direction: column;
        }
        &:nth-child(4){
            margin-bottom: 150px;
        }
    }
    ${p=>p.theme.media.special2}{
        & > div{
            &:nth-child(1){
                flex-direction: row;
                justify-content: space-around;
                max-width: unset;
                margin: 55px 0px;
                & > div{
                    &:nth-child(1){
                        background: ${p=>p.theme.color2};
                        width: 50%;
                        max-width: 500px;
                    }
                    &:nth-child(2){
                        padding-top: 0px;
                        width: 40%;
                        background: white;
                        max-width: 400px;
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop3}{
        & > div{
            &:nth-child(1){
                max-width: 1300px;
                margin: 85px auto;
                & > div{
                    &:nth-child(2){
                        padding: 0px;
                        max-width: 500px;
                        & > div{
                            &:nth-child(2){
                                max-width: 500px;
                            }
                        }
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.desktop5}{
        & > div{
            &:nth-child(1){
                & > div{
                    &:nth-child(1){
                        max-width: 600px;
                    }
                }
            }
        }
    }
`

export default function DetailsItem() {
    const { pathname } = useLocation(path=>path)
    const state = useSelector(state=>state.shopReducer);
    const recomended = ['5ff5b28eeb641e2ca8db7e1a', '5ff5e965570a372298c27dfc']
    const { preUrl } = state
    const dispatch = useDispatch()
    useEffect(()=>{
        const url = preUrl+pathname
        const  fetchData = async ()=>{
            const { data } = await axios(url)
            data.config.forEach(elem=>{
                let config = elem.rozmiar.filter(e=>e.ilosc > 0)
                elem.rozmiar = config
            })
            let filteredConfig = []
            data.config.forEach((elem, index)=>{
                if(elem.rozmiar.length){
                    filteredConfig.push(data.config[index]) 
                }
            })
            data.config = filteredConfig
            let dataStructure = {
                id: data.id,
                nazwa: data.nazwa,
                cena: data.cena_promocyjna ? data.cena_promocyjna : data.cena,
                kolor: data.config[0].kolor,
                kolorSlownie: data.config[0].kolorSlownie,
                rozmiar: data.config[0].rozmiar[0].rozmiar,
                img: preUrl+data.config[0].img[0].url,
                opis: data.opis,
                maxQuantity: data.config[0].rozmiar[0].ilosc,
            }
            dispatch(setDetailProduct({ detailItem: dataStructure, fullProduct: data}))
        }
        fetchData()
        document.documentElement.scrollTop = 0
    }, [dispatch, pathname, preUrl] )
    return (
        <DetailsItemElem>
            <div>
                <DetailsItemDemo />
                <div>
                    <div>
                        <DetailsItemTitle />
                        <DetailsItemConfig />
                    </div>
                </div>
            </div>
            <hr></hr>
            <hr></hr>
            <Recommended title='Polecane' detailsItem item={recomended} />
            <Footer />
        </DetailsItemElem>
    )
}
