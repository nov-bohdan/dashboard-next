import { logout } from "../lib/authActions";

export default function Logout() {
  return <button onClick={logout}>Sign out</button>;
}
