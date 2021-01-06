import React, { useEffect, useState } from 'react'
import RecommendedItem from '../structure/RecommendedItem'
import styled from 'styled-components'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { LoadingCircle } from '../elements/LoadingCircle'
const Wrapper = styled.div`
display: flex;
& > div{
    position: relative;
    margin: auto;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    & > section{
        width: 100%;
        margin: 10px 0px;
        margin-top: 20px;
        margin-left: 35px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        ${p=>p.recomendedLoading && `
        height: 200px;
        width: 200px;
        & > h1{
            display: none !important;
        }
        & > hr{
            display: none !important;
        }
        `}
        & > h1{
            margin: 20px 0px;
            color: ${p=>p.theme.color1};
        }
        & > hr{
            display: none;
            height: 1px;
            border: none;
            background: ${p=>p.theme.color1};
        }
    }
    & > div{
        display: flex;
        padding: 15px;
        & > div{
            &:last-child{
                margin-right: 15px;
            }
        }
    }
}
${p=>p.theme.media.special2}{
    ${p=>!p.detailsItem ? `
    margin-top: 50px;
    & > div{
        & > section{
            margin-left: 0px;
            align-items: center;
            margin-bottom: 70px;
            & > h1{
                font-size: 3rem;
                margin: 40px 0px;
            }
            & > hr{
                display: block;
                width: 80vw;
                max-width: 740px;
            }
        }
    `:`
    & > div{
        margin: 0px;
        margin-left: 30px;
        & > section{
            margin-left: 0px;
        }
    }
    `}
    }
}
${p=>p.wishList && `
    & > div{
        & > div{
            flex-wrap: wrap;
            margin-left: 35px;
            justify-content: center;
            & > div{
                margin-bottom: 50px;
            }
        }
    }
`}
`

export default function Recommended({title, item, wishList, detailsItem}) {
    const [resState, setResState] = useState(null)
    const preUrl = useSelector(state=>state.mainPageReducer.preUrl)
    const recomendedLoading = useSelector(state=>state.mainPageReducer.recommended_loading)
    const FetchData = async()=>{
        let res = []            
        for(let i of item){
            let { data } = await axios.get(`${preUrl}/products/${i}`)
            let ItemObject = { id: data.id, category: data.kategory.kategoria, name: data.nazwa, price: data.cena, img: data.config[0].img[0].url, config: data.config}
            res.push(ItemObject)
        }
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

        return res
    }

    useEffect(()=>{
        const setStructure = async()=>{
            const data = await FetchData()
            setResState(data)
        }
        setStructure()
    }, [item])
    return (
        <Wrapper detailsItem={detailsItem} id="recomended" recomendedLoading={recomendedLoading} wishList={wishList}>
            <div>
            {!wishList && <section>
                    <hr></hr>
                        <h1>{title}</h1>
                    <hr></hr>
                </section> }
                
                <div>
                    {recomendedLoading ? 
                    <LoadingCircle><div></div></LoadingCircle>:
                    resState && resState.map((elem, index)=><RecommendedItem wishList={wishList} key={index} item={elem} />)
                    }
                </div>
            </div>
        </Wrapper>
    )
}
