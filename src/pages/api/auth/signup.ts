import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

// Define a type for the expected request body
type SignupRequestBody = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
};

const dbClient = new PrismaClient();

// Type guard to check if the method is POST
function isPostMethod(method: string | undefined): method is 'POST' {
  return method === 'POST';
}

// Ensure req.method is a valid string
function assertValidMethod(method: string | undefined): asserts method is string {
  if (!method) {
    throw new Error("Invalid method");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  assertValidMethod(req.method);

  if (isPostMethod(req.method)) {
    const { name, username, email, password, confirm } = req.body as SignupRequestBody;

    if (!name || !username || !email || !password || password !== confirm) {
      return res.status(400).json({ statusText: "Invalid user parameters or password mismatch" });
    }

    const existingUser = await dbClient.user.findFirst({
      where: { OR: [ { email }] }
    });

    if (existingUser) {
      return res.status(403).json({ statusText: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const user = await dbClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status: 'active',
      }
    });

    const account = await dbClient.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: user.id,
      }
    });

    if (user && account) {
      return res.status(200).json({ id: user.id, name: user.name, email: user.email });
    } else {
      return res.status(500).json({ statusText: "Unable to create user account" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ statusText: `Method ${req.method} Not Allowed` });
  }
}
