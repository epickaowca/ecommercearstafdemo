import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../redux/ducks/shopReducer'
import SearchField from './SearchField'
import Sort from './Sort'

const CategoryContaier = styled.div`
    position: relative;
    z-index: 6;
    margin: 80px 0;
    display: flex;
    flex-direction: column;
    & > span{
        display: none;
    }
    & > h2{
        margin-bottom: 50px;
    }
    & > div{
        & > div{
            cursor: pointer;
            justify-content: space-between;
            display: flex;
            margin: 25px 0;
            border-bottom: 2px solid rgba(255, 255, 255, .5);
            padding-bottom: 15px;
            color: rgba(255, 255, 255, .5);
            &:hover{
                color: ${p=>p.theme.color2};
                border-bottom: 2px solid ${p=>p.theme.color2};
                & > span{
                    border: none;
                    background: ${p=>p.theme.color2};
                }
            }
            & > p{
                font-weight: 500;
            }
            & > span{
                border: 2px solid white;
                display: block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            
            &:nth-child(${p=>p.category+1}){
                color: ${p=>p.theme.color2};
                border-bottom: 2px solid ${p=>p.theme.color2};
                & > span{
                    border: none;
                    background: ${p=>p.theme.color2};
                }
            }
        }
        &:nth-child(3){
            margin-top: 55px;
        }
    }
 }
 ${p=>p.theme.media.mobile2}{
     & > span{
         display: block;
     }
     & > div{
         & > div{
            border-bottom: 2px solid rgba(0, 0, 0, .5);
            color: rgba(0, 0, 0, .5);
            &:hover{
                color: black;
                border-bottom: 2px solid ${p=>p.theme.color1};
                & > span{
                    border: none;
                    background: ${p=>p.theme.color1};
                }
            }
            & > span{
            border: 2px solid black;
            }
            &:nth-child(${p=>p.category+1}){
                color: black;
                border-bottom: 2px solid ${p=>p.theme.color1};
                & > span{
                    border: none;
                    background: ${p=>p.theme.color1};
                }
            }
        }
     }
 }
`


const categoriesTab = {wszystko: 'wszystko'}

export default  React.memo(({toggle, color})=> {
    const dispatch = useDispatch()
    const allCategories = useSelector(state=>state.shopReducer.allCategories)
    const currentCategory = useSelector(state=>state.shopReducer.currentCategory)
    const setCategories = (cat,index)=>{
        dispatch(setCategory({cat, index}))
        if(toggle) toggle()
    }
    if(allCategories[0]==='error'){
        return(
            <h1 style={{color: 'red'}}>Server Error</h1>
        )
    }
    allCategories.forEach(elem => {categoriesTab[elem.kategoria]=elem.kategoria});

    return (
        <CategoryContaier category={currentCategory.index}>
            <h2>Kategorie</h2>
            <div>
                {Object.values(categoriesTab).map((cat, index)=>
                <div key={cat} onClick={()=>setCategories(cat, index)}>
                    <p>{cat}</p>
                    <span></span>
                </div>
                )}
            </div>
            <SearchField color={color} />
            <Sort />
        </CategoryContaier>
    )
})
