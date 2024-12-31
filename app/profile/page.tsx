import { userData } from "../lib/data";
import Profile from "../ui/Profile";

export default async function Page() {
  const user = await userData.getUser();
  if (!user?.settings) throw new Error("User settings not found");
  return <Profile userSettings={user.settings} />;
}