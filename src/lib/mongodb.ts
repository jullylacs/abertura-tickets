import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/abertura_tickets_devsolutions";

if (!MONGODB_URI) {
  throw new Error("⚠️ Defina a variável de ambiente MONGODB_URI no arquivo .env");
}

// Evita múltiplas conexões no modo de desenvolvimento (Next.js faz hot reload)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ Conectado ao MongoDB com sucesso");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
