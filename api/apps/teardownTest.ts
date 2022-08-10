import { PrismaService } from '../src/prisma/prisma.service'

export default async () => {
  const prisma: PrismaService = new PrismaService()

  await prisma.user.deleteMany()
  await prisma.answer.deleteMany()
  await prisma.question.deleteMany()
  await prisma.like.deleteMany()
  await prisma.advice.deleteMany()

  await prisma.$disconnect()
  console.log('\n Teardown Test Done!!!')
}
