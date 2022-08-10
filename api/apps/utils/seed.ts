import { PrismaClient } from '@prisma/client'
import * as bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  await prisma.user.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.answer.deleteMany({})
  await prisma.like.deleteMany({})
  await prisma.advice.deleteMany({})

  await prisma.user.create({
    data: {
      username: 'admin',
      password: bcryptjs.hashSync('HuceOdw128379%^92198hhe12189@89', 12),
    },
  })

  console.log('success create user')

  await prisma.question.create({
    data: {
      question: 'siapa nama bapak dari jokowi'.toLowerCase(),
      options: [
        'Siapa aja boleh'.toLowerCase(),
        'Siapa aju boleh'.toLowerCase(),
        'Siapa aji boleh'.toLowerCase(),
        'Siapa ajo boleh'.toLowerCase(),
      ],
      answer: {
        create: {
          answer: 'Siapa aja boleh'.toLowerCase(),
        },
      },
    },
  })

  const createdAdvice = await prisma.advice.create({
    data: {
      advice: 'Test advice 1',
    },
  })

  await prisma.like.createMany({
    data: [
      {
        adviceId: createdAdvice.id,
      },
      {
        adviceId: createdAdvice.id,
      },
      {
        adviceId: createdAdvice.id,
      },
    ],
  })

  const user = await prisma.user.findFirst({
    where: {
      username: 'admin',
    },
  })

  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
