import axios from 'axios'


export const types = {
    FETCH_SLIDES: "main_page_reducer/fetch_slides",
    LOADING: 'main_page_reducer/loading',
    SET_RECOMENDED: 'main_page_reducer/set_recomended',
    SET_INSTA_PICTURES: 'main_page_reducer/set_insta_pictures',
    RECOMENDED_LOADING: 'main_page_reducer/recommended_loading',
    FOOTER_CONTENT: 'main_page_reducer/footer_content',
    SET_VERY_FIRST: 'main_page_reducer/veri_first',
    SET_FREE_DELIVERY: 'main_page_reducer/set_free_delivery'
    // Dostawas
}
//http://localhost:1337
//https://another-dry-app-2421.herokuapp.com/
let initState = {
    preUrl: 'https://another-dry-app-2421.herokuapp.com',
    background_slides: [],
    slides_loading: true,
    recommended: [],
    instaPictures: {pic: []},
    recommended_loading: false,
    footer_content: {kontent: [],   social: []},
    freeDelivery: null,
}

const mainPageReducer = (state=initState, {type, payload})=>{
    switch(type){
        case types.LOADING: return{
            ...state, [payload]: !state[payload]
        }
        
        case types.FETCH_SLIDES: return{
            ...state, background_slides: payload
        }

        case types.SET_RECOMENDED: return{
            ...state, recommended: payload
        }

        case types.SET_INSTA_PICTURES: return{
            ...state, instaPictures: payload
        }
        
        case types.RECOMENDED_LOADING:return{
            ...state, recommended_loading: payload
        }

        case types.FOOTER_CONTENT:return{
            ...state, footer_content: payload
        }

        case types.SET_VERY_FIRST:return{
            ...state, [payload]: false
        }

        case types.SET_FREE_DELIVERY:return{
            ...state, freeDelivery: payload
        }

        default: return state
    }
}





export const setFreeDelivery = payload=>({type: types.SET_FREE_DELIVERY, payload})

export const setVeryFirst = payload=>({type: types.SET_VERY_FIRST, payload})

export const setFooterContent = payload=>({type: types.FOOTER_CONTENT, payload})

export const setRecommendedLoading = payload=>({type: types.RECOMENDED_LOADING, payload})

export const setInstaPictures = payload=>({type: types.SET_INSTA_PICTURES, payload})

export const setRecomended = payload=>({type: types.SET_RECOMENDED, payload})

export const setSlides = payload=>({type: types.FETCH_SLIDES, payload})

export const loading = payload=>({type: types.LOADING, payload})


export default mainPageReducer