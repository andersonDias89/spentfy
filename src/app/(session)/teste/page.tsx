"use client";

import { z } from "zod";
import Form from "@/common/ui/Form";
import { Input } from "@/common/ui/Input";
import { Select } from "@/common/ui/Select";
import { DateSelect } from "@/common/ui/SelectDate";
import { Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  accountType: z.string().nonempty("Selecione um tipo de conta"),
  birthDate: z.string().nonempty("Selecione uma data"),
});

export default function TestePage() {
  function handleSubmit(data: any) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <Form
        schema={schema}
        defaultValues={{
          email: "",
          password: "",
          accountType: "",
          birthDate: "",
        }}
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          icon={<Mail />}
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          showTogglePassword
        />
        <Select
          label="Tipo de Conta"
          name="accountType"
          options={[
            { value: "personal", label: "Pessoal" },
            { value: "business", label: "Empresarial" },
          ]}
        />
        <DateSelect
          label="Data de Nascimento"
          name="birthDate"
          placeholder="Selecione a data"
        />
      </Form>
    </div>
  );
}
