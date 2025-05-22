// class AuthService {
//   createHash(password: string) {
//     return bcrypt.hash(password, 10)
//   }
//   async signIn(login: User['phone'], password: User['password']) {
//     const shouldRefresh = false
//     const userExist = await userService.find({ login })
//
//     if (!userExist) {
//       return ''
//     }
//
//     const role = await userService.getRoleById(userExist.roleId)
//
//     if (!role) {
//       throw Error('Ошибка: Нет Ролей')
//     }
//
//     return {
//       isAdmin: role.name === Roles.ADMIN,
//       accessToken: jwt.sign(
//         { login },
//         getSecret(),
//         shouldRefresh ? { expiresIn: '15m' } : undefined,
//       ),
//     }
//   }
//   verify(headers: NextRequest['headers']) {
//     const SECRET = getSecret()
//
//     const authHeader = headers.get('Authorization')
//     if (!authHeader?.startsWith('Bearer ')) {
//       return new Response('Unauthorized', { status: 401 })
//     }
//
//     const jwtToken = authHeader.split(' ')[1]
//
//     try {
//       const payload = jwt.verify(jwtToken, SECRET)
//       return new Response(JSON.stringify({ message: 'Authorized', payload }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       })
//     } catch (err) {
//       return new Response(`Invalid token ${err}`, responses.ForbiddenError)
//     }
//   }
// }
//
// export const authService = new AuthService()
