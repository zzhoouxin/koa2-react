import  Request from './../../utils/request';


const signInApi = async ( userInfo ) => {
  let result = await Request.post({
    url: '/login/user/signUp',
    data: userInfo
  })
  return result
}

export  { signInApi  }
