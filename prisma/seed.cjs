const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const listings = [
  {
    title: 'Сүхбаатарын талбайн ойролцоох 2 өрөө',
    description:
      'Хотын төвд байрлалтай, бүрэн тавилгатай 2 өрөө байр. Дулаан зогсоолтой.',
    pricePerMonth: 1200000,
    address: 'СБД, 1-р хороо, Улаанбаатар',
    latitude: 47.918,
    longitude: 106.917,
    category: 'apartment',
    status: 'active',
    contactName: 'Бат-Эрдэнэ',
    phone: '9911-0001',
    email: 'bat@example.com',
  },
  {
    title: 'Хотын төвийн оффис талбай',
    description:
      '10–15 хүний багт тохиромжтой нээлттэй төлөвлөгөөтэй оффис. Хурлын өрөөтэй.',
    pricePerMonth: 3500000,
    address: 'ЧД, 3-р хороо, Улаанбаатар',
    latitude: 47.923,
    longitude: 106.91,
    category: 'office',
    status: 'active',
    contactName: 'Сувд',
    phone: '8811-2233',
    email: 'office@example.com',
  },
  {
    title: 'Оюутнуудад зориулсан студи',
    description:
      'Их сургуулийн ойролцоо, бүрэн тавилгатай, боломжийн үнэтэй студи.',
    pricePerMonth: 700000,
    address: 'БЗД, 5-р хороо, Улаанбаатар',
    latitude: 47.924,
    longitude: 106.95,
    category: 'apartment',
    status: 'active',
    contactName: 'Болд',
    phone: '9900-1122',
    email: null,
  },
  {
    title: 'Хашаа байшин – гэр бүлд',
    description:
      '3 өрөө байшин, хашаатай, нам гүм байрлалтай. Гэр бүлд тохиромжтой.',
    pricePerMonth: 2500000,
    address: 'СХД, Улаанбаатар',
    latitude: 47.93,
    longitude: 106.82,
    category: 'house',
    status: 'active',
    contactName: 'Тунгалаг',
    phone: '9600-3344',
    email: 'tungalag@example.com',
  },
  {
    title: 'Удаан хугацааны түрээсийн газар',
    description:
      'Агуулах, жижиг цех, цехийн зориулалтаар ашиглах боломжтой газар.',
    pricePerMonth: 1500000,
    address: 'Налайх дүүрэг, Улаанбаатар',
    latitude: 47.78,
    longitude: 107.25,
    category: 'land',
    status: 'archived',
    contactName: 'Ганбаатар',
    phone: '9511-5566',
    email: null,
  },
];

async function main() {
  // Хуучин бүх шар номыг цэвэрлэнэ
  await prisma.yellowBook.deleteMany();

  // Шинэ 5 бичлэг хийе
  for (const data of listings) {
    await prisma.yellowBook.create({ data });
  }

  console.log(`Seeded ${listings.length} yellow book listings.`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });