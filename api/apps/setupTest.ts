import { PrismaService } from '../src/prisma/prisma.service'

export default async () => {
  console.log('\n Setup Test Running...')
  const prisma: PrismaService = new PrismaService()

  await prisma.$connect()

  await prisma.user.deleteMany()
  await prisma.answer.deleteMany()
  await prisma.question.deleteMany()
  await prisma.like.deleteMany()
  await prisma.advice.deleteMany()

  console.log('\n Setup Test Done')
}
