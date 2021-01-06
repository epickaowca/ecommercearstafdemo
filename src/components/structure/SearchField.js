import React, { useRef } from 'react'
import styled from 'styled-components'
import {ReactComponent as  Loop} from '../../asset/loop.svg'
import { useDispatch } from 'react-redux'
import { setSearch, toggleState } from '../../redux/ducks/shopReducer'
import SearchState from './SearchState'

const SearchFieldElem = styled.div`
    & > form{   
        background: white;
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        padding: 15px 0;
        & > input{
            padding-left: 30px;
            border: none;
            outline: none;
            font-size: 1rem;
            width: 75%;
            ::placeholder {
                color: black;
            }
        }
        & > div{
            display: flex;
            cursor: pointer;
            padding-right: 30px;
            & > svg{
                margin: auto;
                transform: scale(.8);
                & > g{
                    & > line{
                        stroke: black;
                    }
                    & > g{
                        fill:#fff;
                        stroke:black;
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.mobile2}{
        width: 100%;
        white;
        & > form {
            padding: 5px 0;
            background: ${p=>p.theme.color1};
            & > input{
                color: white;
                opacity: 1;
                background: ${p=>p.theme.color1};
                width: 70%;
                ::placeholder {
                    color: white;
                }
            }
            & > div{ ::placeholder {
                color: black;
            }
            & > svg{
                transform: scale(.5);
                & > g{
                    & > line{
                        stroke: white;
                    }
                    & > g{
                        stroke: white;
                        fill: ${p=>p.theme.color1};
                    }
                }
            }
            }
        }
    }
    
`

const SearchField = ({ toggle, color })=>{
    const refInput = useRef('')
    const dispatch = useDispatch()

    const searchHandler = (e)=>{
        e.preventDefault()
        if(toggle) dispatch(toggleState('filterEject'))
        const value = refInput.current.value.toLowerCase();
        dispatch(setSearch(value))
        refInput.current.value = '';
    }
    
    return(
        <SearchFieldElem>
            <form onSubmit={searchHandler}>
                <input ref={refInput} type="text" placeholder="Wyszukaj"/>
                <div onClick={searchHandler}>
                    <Loop />
                </div>
            </form>
            <SearchState color={color} />
        </SearchFieldElem>
    )
}

export default SearchField