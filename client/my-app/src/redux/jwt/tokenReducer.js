import GET_TOKEN  from "./tokenType"
import SET_TOKEN  from "./tokenType"

const initialState = {
    token : ''
}

const tokenReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_TOKEN: return {
            ...action,
            token : action.payload
        }
        case GET_TOKEN: return {
            token : state.token
        }
    }
}

export default tokenReducer;