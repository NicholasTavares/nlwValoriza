import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  //eyJlbWFpbCI6ImRhbmlAZGFuaS5jb20uYnIiLCJpYXQiOjE2MzgxMDQwMTksImV4cCI6MTYzODE5MDQxOSwic3ViIjoiMmYyZDY2ODEtYWZkNy00YWFmLWEyMmItZDg4MmRjZGJlOTZhIn0.
  //OIfVCenv6wWIY87V4lHUSaWuusmshk45apt-TJtrfcA

  const [, token] = authToken.split(" ")

  try {
    const {sub} = verify(token, 'a05760a1b720f7d9d6f1363a9393e9b8') as IPayload

    request.user_id = sub

    return next()
  } catch (err) {
    return response.status(401).end()
  }
  

  return next()
}