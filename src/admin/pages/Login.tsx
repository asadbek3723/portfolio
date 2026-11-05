import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "../auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    try {
      const result = await signIn(email, password, remember);
      if (result === "invalid") { setError("Email yoki parol noto‘g‘ri. Qayta urinib ko‘ring."); return; }
      if (result === "forbidden") { setError("Bu akkauntda admin huquqi yo‘q."); return; }
      await navigate({ to: "/admin", replace: true });
    } catch {
      setError("Kirish amalga oshmadi. Qayta urinib ko‘ring.");
    } finally { setBusy(false); }
  }

  return (
    <div className="admin-root login-page flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between gap-4 px-5 py-6 sm:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Asadbek Jumanazarov bosh sahifasi">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary font-display font-extrabold text-primary-foreground">AJ</span>
          <span className="text-sm font-semibold">Admin Portal</span>
        </Link>
        <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft /> <span className="hidden sm:inline">Saytga qaytish</span></Link></Button>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:py-16">
        <div className="w-full max-w-[380px]">
          <p className="font-mono text-xs uppercase text-primary">Asadbek Jumanazarov</p>
          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Xush kelibsiz.</h1>
          <p className="mt-3 text-sm text-muted-foreground">Boshqaruv paneliga kirish</p>
          <form onSubmit={submit} className="mt-9 space-y-5" aria-busy={busy}>
            <div><label htmlFor="admin-email" className="mb-2 block text-sm font-medium">Email</label>
              <Input id="admin-email" type="email" autoComplete="username" placeholder="Email manzilingiz" required value={email} disabled={busy} onChange={(e) => { setEmail(e.target.value); setError(""); }} className="h-12" />
            </div>
            <div><label htmlFor="admin-password" className="mb-2 block text-sm font-medium">Parol</label>
              <div className="relative">
                <Input id="admin-password" type={visible ? "text" : "password"} autoComplete="current-password" placeholder="Parolingiz" required value={password} disabled={busy} aria-invalid={!!error} aria-describedby={error ? "login-error" : undefined} onChange={(e) => { setPassword(e.target.value); setError(""); }} className="h-12 pr-12" />
                <Button type="button" size="icon" variant="ghost" title={visible ? "Parolni yashirish" : "Parolni ko‘rsatish"} aria-label={visible ? "Parolni yashirish" : "Parolni ko‘rsatish"} aria-pressed={visible} onClick={() => setVisible((v) => !v)} className="absolute right-1 top-1 size-10 text-muted-foreground">{visible ? <EyeOff /> : <Eye />}</Button>
              </div>
            </div>
            <div className="flex items-center gap-2.5"><Checkbox id="remember-admin" checked={remember} onCheckedChange={(v) => setRemember(v === true)} disabled={busy} /><label htmlFor="remember-admin" className="cursor-pointer text-sm text-muted-foreground">Eslab qolish</label></div>
            {error && <p id="login-error" role="alert" className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="mt-0.5 size-4 shrink-0" />{error}</p>}
            <Button type="submit" disabled={busy} className="h-12 w-full font-semibold">{busy ? <><Loader2 className="animate-spin" /> Kirilmoqda…</> : <>Kirish <ArrowRight /></>}</Button>
          </form>
        </div>
      </main>
      <footer className="px-5 py-6 text-center text-xs text-muted-foreground">AJ / Admin Portal</footer>
    </div>
  );
}