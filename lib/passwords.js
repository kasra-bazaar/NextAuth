import { compare, hash } from "bcryptjs";

export async function Passwords(pass) {
  const password = await hash(pass, 12);
  return password;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
