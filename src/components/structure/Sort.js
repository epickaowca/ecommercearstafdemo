import React from 'react'
import { useDispatch } from 'react-redux'
import { setSortState } from '../../redux/ducks/shopReducer'
import styled from 'styled-components'

const Wrapper = styled.label`
display: flex;
align-items: center;
margin-top: 40px;
position: relative;
    & > select{
        padding: 10px;
        font-size: 1rem;
    }
    & > p{
        margin-right: 25px;
        color: rgba(255,255,255, .5)
        font-size: .9rem;
    }
${p=>p.theme.media.mobile2}{
    align-items: flex-start;
    flex-direction: column;
    & > p{
        color: rgba(0,0,0, .5)
    }
}
`

export default function Sort() {
    const dispatch = useDispatch()
    return (
        <Wrapper>
            <p>sortowanie</p>
            <select onChange={(e)=>dispatch(setSortState(e.target.value.split(',')))}>
                <option value="">domyślnie</option>
                <option value="price,high">cena: od najniższej</option>
                <option value="price,low">cena: od najwyższej</option>
                <option value="wishList">lista życzeń</option>
            </select>
        </Wrapper>
    )
}
