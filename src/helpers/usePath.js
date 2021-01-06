import { useEffect } from 'react'
import {  useLocation } from 'react-router-dom'
import { setPage } from '../redux/ducks/shopReducer'
import { useDispatch } from 'react-redux'

export const usePath = ()=>{
    const {pathname} =  useLocation()
    const dispatch = useDispatch()
    useEffect(()=>{
        const pathSet = ()=>{
            dispatch(setPage(pathname))
        }
        pathSet()
    }, [pathname, dispatch])
}