import React from 'react'
import { Button } from '../elements/Button'
import { setSearch } from '../../redux/ducks/shopReducer'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Close } from '../elements/CloseImg'

const Wrapper = styled.span`
margin: auto;
& > div{
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    
    & > div{
        display: flex;
        margin-top: 10px;
        align-items: center;
        & > span{
            width: 80%;
            margin-right: 25px;
            display: flex;
            background: ${p=>p.theme.color2};
            align-items: center;
            padding: 10px;
            border-radius: 10px;
            &:hover > p{
                overflow: visible;
                white-space: unset;
            }
            & > p{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: ${p=>p.theme.color1};
                font-weight: 500;
            }
        }
        & > svg{
            width: 20px;
            heigth: 20px;
        }
    }
}

${p=>p.theme.media.mobile1}{
    & > div{
        flex-direction: row;
        align-items: center;
        & > div{
            margin: 0;
            & > span{
                margin: 0 25px;
                width: 250px;
            }
        }
    }
}
${p=>p.theme.media.mobile2}{
    & > div{
        flex-direction: column;
        align-items: flex-start;
     & > div{
         margin-top: 10px;
         & > span{
             margin: unset;
             margin-right: 25px;
             width: 150px;
         }
     }
 }       
}
`

export default function SearchState({color}) {
    const dispatch = useDispatch();
    const state = useSelector(state=>state.shopReducer)
    return (
        <Wrapper>
            {state.search.trim()==="" ? null :
                <div>
                    <p>Szukasz</p>
                    <div>
                        <span><p>{state.search}</p></span>
                        <Close onClick={()=>dispatch(setSearch(''))} color={color}/>
                    </div>
                </div>
            }
        </Wrapper>
    )
}
