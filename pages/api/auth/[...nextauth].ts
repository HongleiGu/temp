import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default function handler(req, res) {
	NextAuth(authConfig);
}