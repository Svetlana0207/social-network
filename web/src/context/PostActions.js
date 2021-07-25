export const PostStart=()=>({
    type:"POST_START"
})

export const PostSuccess=(post)=>({
    type:"POST_SUCCESS",
    payload:post
})

export const PostFailure=(error)=>({
    type:"POST_FAILURE",
    payload:error
})