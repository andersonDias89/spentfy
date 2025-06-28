import { Button } from "@/common/ui/Button";
import { signIn } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  async function handleRegister() {
    "use server";
    await signIn("github", { redirectTo: ROUTES.DASHBOARD });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={handleRegister} icon={<FaGithub size={20} />}>
        Entrar com GitHub
      </Button>
    </div>
  );
}
