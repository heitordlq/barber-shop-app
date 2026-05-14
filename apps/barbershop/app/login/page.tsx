"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Loader2, Lock, Mail, Store } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    barbershopName: "",
    barbershopSlug: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const res = await api.post("/auth/register", form);
        const { user, tenant, accessToken, refreshToken } = res.data;
        login(user, tenant, accessToken, refreshToken);
        toast.success("Conta criada com sucesso!");
        router.push("/onboarding");
      } else {
        const res = await api.post("/auth/login", { email: form.email, password: form.password });
        const { user, tenant, accessToken, refreshToken } = res.data;
        login(user, tenant, accessToken, refreshToken);
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Scissors className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BarberDash</h1>
              <p className="text-xs text-zinc-400">Painel do Barbeiro</p>
            </div>
          </div>
        </div>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {isRegister ? "Criar sua Barbearia" : "Bem-vindo de volta"}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isRegister ? "Preencha os dados e comece agora mesmo" : "Acesse sua conta para gerenciar sua agenda"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-300 text-sm">Seu Nome</Label>
                    <Input
                      id="name"
                      placeholder="Ex: José Barbearia"
                      className="bg-zinc-800 border-zinc-700 text-white"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barbershopName" className="text-zinc-300 text-sm">Nome da Barbearia</Label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        id="barbershopName"
                        placeholder="Ex: Barbearia do Zé"
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        value={form.barbershopName}
                        onChange={(e) => setForm({ 
                          ...form, 
                          barbershopName: e.target.value,
                          barbershopSlug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') 
                        })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barbershopSlug" className="text-zinc-300 text-sm">Sua URL pública (Slug)</Label>
                    <div className="flex bg-zinc-800 border border-zinc-700 rounded-md overflow-hidden">
                      <div className="flex items-center px-3 text-zinc-500 text-sm bg-zinc-900">
                        barbearia.app/
                      </div>
                      <Input
                        id="barbershopSlug"
                        className="border-0 bg-transparent text-amber-400 font-mono shadow-none flex-1 focus-visible:ring-0"
                        value={form.barbershopSlug}
                        onChange={(e) => setForm({ ...form, barbershopSlug: e.target.value.toLowerCase() })}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 text-sm">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@exemplo.com"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-300 text-sm">Senha</Label>
                  {!isRegister && <a href="#" className="text-xs text-amber-500 hover:text-amber-400">Esqueci a senha</a>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold mt-4"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {isRegister ? "Concluir Cadastro" : "Acessar Painel"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
              {isRegister ? "Já possui uma conta?" : "Não possui uma conta?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-amber-500 hover:text-amber-400 hover:underline"
              >
                {isRegister ? "Entrar" : "Criar uma agora"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
