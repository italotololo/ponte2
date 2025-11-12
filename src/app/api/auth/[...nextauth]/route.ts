// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export const GET = async (req: NextRequest) => {
  return handler(req);
};

export const POST = async (req: NextRequest) => {
  return handler(req);
};