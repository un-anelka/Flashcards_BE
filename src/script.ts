import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstack tutorial for Graphql",
      url: "www.howtographql.com2345t",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log("All links fetched", allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
