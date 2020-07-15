 import jwt from 'jsonwebtoken'
 import { secretoken } from './config'

 export default (token:string) => {
   token = token.split(' ')[1]
   let decodedToken
   try {
     decodedToken = jwt.verify(token, secretoken )
    } catch (error) {
      return false
    }
  if(!decodedToken){
    return false
   }
   const {userId} = decodedToken
   const user ={ id:userId, auth: true }
   return  user 
  }

  // const token = authHeader.split(' ')[1]
  // if(!token || token === ''){
  //  req.isAuth = false
  //  return next()
  // }