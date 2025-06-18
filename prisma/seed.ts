import { PrismaClient, Roles } from 'prisma/index'

const prisma = new PrismaClient()

async function main() {
  const roles = Object.values(Roles)
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    })
  }
  console.log('Роли созданы')

  const role = await prisma.role.findUnique({
    where: { name: Roles.MODERATOR },
  })

  if (!role) {
    throw new Error('Role MODERATOR не найдена. Создайте сначала роли.')
  }

  await prisma.user.create({
    data: {
      name: 'Nikita',
      phone: '79995232783',
      roleId: role.id,
      password: '$2b$04$E3zAkuY0.sbGjyTwWLvpN.AlBs1Qws2rt38vO3gElqktFSFI6zppC',
      email: null,
    },
  })

  console.log('Пользователь Nikita создан')

  await prisma.user.create({
    data: {
      name: 'Alina',
      phone: '79169071111',
      roleId: role.id,
      password: '$2b$04$E3zAkuY0.sbGjyTwWLvpN.AlBs1Qws2rt38vO3gElqktFSFI6zppC',
      email: null,
    },
  })

  console.log('Пользователь Alina создан')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
