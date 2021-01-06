import React from 'react'
import { setWishListProduct } from '../../redux/ducks/shopReducer'
import { useDispatch } from 'react-redux'
import { ReactComponent as HeartImg } from '../../asset/heart.svg'

export default function Heart({id}) {
    const dispatch = useDispatch()
    return (
        <HeartImg onClick={()=>dispatch(setWishListProduct(id))} />
    )
}
