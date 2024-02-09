import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const retrieveUserPoints = async (id: string) => {
  const check = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (check?.id) {
    return check.points;
  }

  return 0;
};

export { retrieveUserPoints };
