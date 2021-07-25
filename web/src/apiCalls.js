import axios from 'axios'

export const loginCall=async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})

    try {
        const res=await axios.post("https://social-network-happy.herokuapp.com/api/auth/login",userCredentials)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}

export const postCall=async(newPost,dispatch)=>{
     dispatch({type:"POST_START"})

    try {
        const res=await axios.post("https://social-network-happy.herokuapp.com/api/posts", newPost);
        dispatch({type:"POST_SUCCESS",payload:res.data})
      
    } catch (err) {
        dispatch({type:"POST_FAILURE",payload:err})
    }
}