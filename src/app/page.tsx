import prisma from "./lib/prisma";

export default async function page() {
  const users = await prisma.user.findMany();

  console.log(users);
  return <div>page</div>;
}
