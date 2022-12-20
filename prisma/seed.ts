import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { booksData } from './books-data';

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    booksData?.map(async (book: any) => {
      return prisma.book.upsert({
        where: { id: book.id, title: book.title },
        update: {},
        create: {
          ...book,
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
    },
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
