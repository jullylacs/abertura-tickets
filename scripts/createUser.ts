import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../src/models/User";

async function main() {
  try {
    // ✅ Conexão com o MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI não encontrado no .env.local");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado ao MongoDB com sucesso");

    // ✅ Usuários padrão
    const users = [
      {
        name: "João Silva",
        email: "joao@example.com",
        password: "123456",
        role: "EMPLOYEE",
      },
      {
        name: "Maria Souza",
        email: "maria@example.com",
        password: "abcdef",
        role: "TECHNICIAN",
      },
    ];

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(`⚠️ Usuário já existe: ${u.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(u.password, 10);
      const newUser = new User({ ...u, password: hashedPassword });
      await newUser.save();
      console.log(`✅ Usuário criado: ${u.email} (${u.role})`);
    }

    console.log("🎉 Criação de usuários finalizada com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar usuários:", error);
    process.exit(1);
  }
}

main();
