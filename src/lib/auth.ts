import { api } from "./axios";

export async function resolveDummyLogin(identifier: string, passwordInput: string) {
  const input = identifier.trim();
  const pass = passwordInput.trim();
  if (!input) throw new Error("Missing identifier");

  // ✅ ID login: "3" -> GET /users/3 -> use returned username+password (DummyJSON demo)
  if (/^\d+$/.test(input)) {
    const { data: user } = await api.get(`/users/${input}`);
    if (!user?.username || !user?.password) throw new Error("Invalid user");
    return { username: user.username as string, password: user.password as string };
  }

  // ✅ Email login: find user -> use username, password must be typed
  if (input.includes("@")) {
    const { data } = await api.get(`/users/search`, { params: { q: input } });
    const user =
      data?.users?.find((u: any) => (u.email || "").toLowerCase() === input.toLowerCase()) ??
      data?.users?.[0];

    if (!user?.username) throw new Error("User not found");
    return { username: user.username as string, password: pass };
  }

  // ✅ Username login
  return { username: input, password: pass };
}