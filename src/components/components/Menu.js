import React from 'react'
import { Button } from '../elements/Button'
import {ReactComponent as FilterImg} from '../../asset/filters.svg'
import Categories from '../structure/Categories' 
import MobileMenu from '../structure/MobileMenu'
import { toggleState } from '../../redux/ducks/shopReducer'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as BackArrow } from '../../asset/backArrow.svg'

const MenuElem = styled.div`
& > div{
    & > div{
        &:nth-child(1){
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 20px;
            height: 80px;
            & > h1{
                font-weight: 500;
                font-size: 1.5rem;
            }
            & > button{
                ${p=>p.noFilters && `
                background: transparent;
                border: none;
                padding: 5px;
                `}
            }
        }
      
        &:nth-child(3){
            display: ${p=>p.filterEject ? 'block' : 'none' };
        }
    }
    & > hr{
        border: none;
        height: 1px;
        background: ${p=>p.theme.color3};
    }
}
${p=>p.theme.media.mobile1}{
    & > div{
        & > div{
            &:nth-child(1){
                padding: 0px 50px;
            }
        }
    }
}
${p=>p.theme.media.mobile2}{
    & > div{
        & > div{
            &:nth-child(1){
                & > button{
                    visibility: ${p=>p.noFilters ? 'visible' : 'hidden'};
                }
                & > h1{
                    font-size: 2rem;
                }
            }
            &:nth-child(3){
                display: none;
            }
        }
    }
}
`


export default function Menu({title, noFilters}) {
    const dispatch = useDispatch()
    const state = useSelector(state=>state.shopReducer.filterEject)
    return (
        <MenuElem noFilters={noFilters} filterEject={state}>
            <div>
                <div>
                    {noFilters ? 
                    <button><Link to="/sklep"><BackArrow /></Link></button>:
                    <Button case2 height="35px" onClick={()=>dispatch(toggleState('filterEject'))}>
                        <p>filtry</p>
                        <FilterImg />
                    </Button>
                    }
                    <h1>{title}</h1>
                </div>
                <hr></hr>
                <MobileMenu title="Filtry" toggle={()=>dispatch(toggleState('filterEject'))}>
                    <Categories color='white' toggle={()=>dispatch(toggleState('filterEject'))} />
                </MobileMenu>
            </div>
        </MenuElem>
    )
}




