import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare module "h3" {
  interface H3EventContext {
    prisma: PrismaClient;
  }
}

//create Singleton  prisma-client instance
export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  event.context.prisma = prisma;
});
