import { responses } from 'app/api/types'
import type { User } from 'prisma/index'

export async function POST(request: Request) {
  const user: User = await request.json()
  console.log(user)

  // todo
  // const created = await userService.find({user})
  //
  // if (created) {
  //   return Response.json(null, responses.ExistError)
  // }
  //
  // const newUser = await userService.create(user)
  //
  // if (!newUser) {
  //   return Response.json(null, responses.InternalError)
  // }

  return Response.json(responses.InternalError)
}
