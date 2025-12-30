import "dotenv/config";
import sampleData from "./sample-data";
import { prisma } from "./prisma";

async function main() {
  await prisma.category.deleteMany();
  await prisma.category.createMany({ data: sampleData.categorys });
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });
  await prisma.customization.deleteMany();
  await prisma.customization.createMany({ data: sampleData.customizations });
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: sampleData.user });
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
