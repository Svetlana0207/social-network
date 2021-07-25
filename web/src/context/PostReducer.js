 const PostReducer=(state,action)=>{
    switch(action.type){
        case "POST_START":
            return{
                post:[],
                isFetching:true,
                error:false
            }
        case "POST_SUCCESS":
                return{
                    ...state,
                    post:[...state.post,action.payload],
                    isFetching:false,
                    error:false
                }
        case "POST_FAILURE":
                    return{
                        post:[],
                        isFetching:false,
                        error:action.payload
                    }

        default:
                return state
    }
}

export default PostReducer