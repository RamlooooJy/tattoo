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

  const adminRole = await prisma.role.findUnique({
    where: { name: Roles.ADMIN },
  })

  if (!adminRole) {
    throw new Error('Role ADMIN не найдена. Создайте сначала роли.')
  }

  await prisma.user.create({
    data: {
      name: 'Nikita',
      phone: '79995232783',
      roleId: adminRole.id,
      email: null,
    },
  })

  console.log('Пользователь Nikita создан')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
