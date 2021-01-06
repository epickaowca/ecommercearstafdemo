import axios from 'axios'

export const types = {
    TOGGLE: "shopreducer/toggle",
    LOADING: "shopreducer/loading",
    SET_CART_EJECT: "shopreducer/set_cart_eject",
    SET_PAGE: "shopreducer/set_page",
    SET_CATEGORY: "shopreducer/set_category",
    SET_PRODUCTS: "shopreducer/set_products",
    SET_CATEGORIES: "shopreducer/set_categories",
    SET_SEARCH: "shopreducer/set_search",
    SET_CART_PRODUCT: "shopreducer/set_cart_product",
    SET_WISH_LIST_PRODUCT: "shopreducer/set_wish_list_product",
    REMOVE_WISH_LIST_PRODUCT: "shopreducer/remove_wish_list_product",
    REMOVE_CART_PRODUCT: "shopreducer/remove_cart_product",
    SET_QUANTITY: "shopreducer/set_quantity",
    SET_DETAIL_PRODUCT: "shopreducer/set_detail_product",
    UPDATE_DETAIL_PRODUCT: "shopreducer/update_detail_product",
    SET_SORT_STATE: "shopreducer/set_sort_state",
}


//http://localhost:1337
//
//https://another-dry-app-2421.herokuapp.com/
let initState = {
    PK: '',
    COD: '',
    preUrl: 'https://another-dry-app-2421.herokuapp.com',
    navEject: false,
    filterEject: false,
    cartEject: false,
    productsLoad: false,
    categoriesLoad: false,
    isThereMore: true,
    pagePath: '',
    search: '',
    sortState: [""],
    currentCategory: {cat: 'wszystko', index: 0},
    allCategories: [],
    productsPage: 0,
    products: [],
    cartProducts: {},
    wishListProducts: [],
    detailProduct: {},
    detailFullProduct: {}
}


const shopReducer = (state=initState, {type, payload})=>{
    switch(type){
        case types.SET_CART_EJECT: return{
            ...state, cartEject: payload
        }
        case types.TOGGLE: return{
            ...state, [payload]: !state[payload]
        }

        case types.SET_PAGE: return{
            ...state, pagePath: payload
        }

        case types.SET_CATEGORY: return{
            ...state, currentCategory: payload
        }

        case types.SET_PRODUCTS: return{
            ...state, productsPage: payload.page, products: [...state.products, ...payload.products]
        }
        
        case types.SET_CATEGORIES: return{
            ...state, allCategories: payload
        }

        case types.REMOVE_CART_PRODUCT:
        let itemWishListCart = localStorage.getItem('cartList').split(",")
        let filteredWishListCart = itemWishListCart.filter(e=>+e != payload)
        localStorage.setItem('cartList', filteredWishListCart)
        let {[payload]: id, ...resOfClients} = state.cartProducts
        return{
                ...state, cartProducts: resOfClients
        }

        case types.SET_CART_PRODUCT: 
        let itemCartHelper = localStorage.getItem('cartList')
        if(itemCartHelper){
            let itemCheck2 = itemCartHelper.split(",").find(elem=>elem==payload.id)
            if(!itemCheck2){
                let newValue = itemCartHelper.split(",")
                newValue.push(payload.id)
                localStorage.setItem('cartList', newValue)
            }
        }else{
            localStorage.setItem('cartList', payload.id)
        }
        payload.quantity = 1
        return{
            ...state, cartProducts: {...state.cartProducts, [payload.id]: payload}
        }

        case types.SET_WISH_LIST_PRODUCT:
        if(payload.constructor===Array){
            return{
                ...state, wishListProducts: [...state.wishListProducts, ...payload]
            }
        }else{
            let wishListItem = state.wishListProducts.find(elem=>elem==payload)
            if(!wishListItem){
                let item = localStorage.getItem('recomended')
                if(item){
                    let itemCheck2 = item.split(",").find(elem=>elem==payload)
                    if(!itemCheck2){
                        let newValue = item.split(",")
                        localStorage.setItem('recomended', newValue)
                    }
                }else{
                    localStorage.setItem('recomended', payload)
                }
                return{
                    ...state, wishListProducts: [...state.wishListProducts, payload]
                }
            }else{
                return state
            }
        }
  
        case types.REMOVE_WISH_LIST_PRODUCT:
        let itemWishList = localStorage.getItem('recomended').split(",")
        let filteredWishList = itemWishList.filter(e=>+e != payload)
        localStorage.setItem('recomended', filteredWishList)
        return{
            ...state, wishListProducts: filteredWishList
        }

        case types.SET_QUANTITY:
        const item = state.cartProducts[payload.id]
        payload.action==="plus" ? item.quantity++ : item.quantity!==1 &&  item.quantity--
        return{
            ...state, cartProducts: {...state.cartProducts}
        }

        case types.SET_SEARCH:return{
            ...state, search: payload
        }

        case types.SET_DETAIL_PRODUCT:return{
            ...state, detailProduct: payload.detailItem, detailFullProduct: payload.fullProduct
        }
        
        case types.UPDATE_DETAIL_PRODUCT:
        return{
            ...state, detailProduct: {...state.detailProduct, [payload.key]: payload.value}
        }

        case types.SET_SORT_STATE:return{
            ...state, sortState: payload
        }

        default: return state
    }
}







export const checkSavedInLocalStorage = () => async( dispatch, getState )=>{
    
    const addProduct = async(data)=>{
        let confI, rozI
        data.config.every((element, configIndex) => {
            confI = configIndex
            let elem = element.rozmiar.findIndex((e)=>e.ilosc>0)
            rozI = elem
            if(elem!==-1){
                return false
            } else{
                return true
            }
        });
        if(rozI!==-1){
            const cartProduct = {
                id: data.id,
                nazwa: data.nazwa,
                kolor: data.config[confI].kolor,
                kolorSlownie: data.config[confI].kolorSlownie,
                rozmiar: data.config[confI].rozmiar[rozI].rozmiar,
                cena: data.cena_promocyjna ? data.cena_promocyjna : data.cena,
                img: preUrl+data.config[0].img[0].url,
                maxQuantity: data.config[confI].rozmiar[rozI].ilosc
            }
            dispatch(setCartProduct(cartProduct))
        }
    }

    let state = getState()
    const preUrl = state.shopReducer.preUrl
    let localStorageRecomended = localStorage.getItem('recomended')
    let localStorageCart = localStorage.getItem('cartList')
    if(localStorageRecomended){
        let newList = []
        for(let i of localStorageRecomended.split(',')){
            try{
                let products = await axios(`${preUrl}/products/${i}`)
                newList.push(i)
            }catch(err){
                console.log('LocalStorageError')
            }
        }
        localStorage.setItem('recomended', newList)
        dispatch(setWishListProduct(newList))
    }
    if(localStorageCart){
        //CART ITEM
        let newListCart = []
        for(let i of localStorageCart.split(',')){
            try{
                let product = await axios(`${preUrl}/products/${i}`)
                addProduct(product.data)
                newListCart.push(i)
            }catch(err){
                console.log(err)
            }
        }
        localStorage.setItem('cartList', newListCart)

    }
}



export const loadCategories = () => async( dispatch, getState )=>{


    const helperFunc = async()=>{
        dispatch(toggleState('categoriesLoad'))
        const state = getState()
        const { preUrl } = state.shopReducer
        let categories;
        try{
            categories = await axios(`${preUrl}/kategories`).then(res=>res.data)
        }catch(error){
            categories = ['error']
        }
        if(categories[0] !== 'error'){
            dispatch(setCategories(categories))
            dispatch(toggleState('categoriesLoad'))
        }else{
            setTimeout(helperFunc, 15000)
        }
    }

    helperFunc()

}

let limit = 45;
export const loadProducts = () => async( dispatch, getState )=>{
    
    const helperFunc = async()=>{
        dispatch(toggleState('productsLoad'))
        const state = getState()
        const {productsPage, preUrl} = state.shopReducer
        let products;
        try{
            console.log(`${preUrl}/products/?_start=${productsPage}&_limit=${limit}`)
            products = await axios(`${preUrl}/products/?_start=${productsPage}&_limit=${limit}`).then(res=>res.data)
        }catch(error){
            products = ['error']
        }
        if(products[0] !== 'error'){
            dispatch(setProducts({products, page: productsPage+limit}))
            dispatch(toggleState('productsLoad'))
        }else{
            setTimeout(helperFunc, 15000)
        }
        if(products.length<limit){
            dispatch(toggleState('isThereMore'))
        }
        limit=limit*2
    }
    helperFunc()
}


export const setSortState = payload=>({type: types.SET_SORT_STATE, payload})

export const removeCartProduct = payload=>({type: types.REMOVE_CART_PRODUCT, payload})

export const setCartEject = payload=>({type: types.SET_CART_EJECT, payload})

export const toggleState = payload=>({type: types.TOGGLE, payload})

export const setPage = payload=>({type: types.SET_PAGE, payload})

export const setCategory = payload=>({type: types.SET_CATEGORY, payload})

export const setProducts = payload=>({type: types.SET_PRODUCTS, payload})

export const setCategories = payload=>({type: types.SET_CATEGORIES, payload})

export const setCartProduct = payload=>({type: types.SET_CART_PRODUCT, payload})

export const setWishListProduct = payload=>({type: types.SET_WISH_LIST_PRODUCT, payload})

export const removeWishListProduct = payload=>({type: types.REMOVE_WISH_LIST_PRODUCT, payload})

export const setQuantity = (id, action)=>({type: types.SET_QUANTITY, payload: {id, action}})

export const setSearch = payload=>({type: types.SET_SEARCH, payload})

export const setDetailProduct = payload=>({type: types.SET_DETAIL_PRODUCT, payload})

export const updateDetailProduct = payload=>({type: types.UPDATE_DETAIL_PRODUCT, payload})



export default shopReducer