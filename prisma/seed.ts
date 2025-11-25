import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, 'yellow-books.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);

  // хүсвэл цэвэрлээд эхлэх
  await prisma.yellowBook.deleteMany();

  for (const entry of data) {
    await prisma.yellowBook.create({
      data: {
        ...entry,
        publishedAt: entry.publishedAt ? new Date(entry.publishedAt) : undefined,
      },
    });
  }

  console.log('Seeded yellow books!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });