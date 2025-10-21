import path from "path";

const nextConfig = {
  experimental: {
    serverActions: {}, // Corrige o erro "Expected object, received boolean"
  },

  // ⚠ Corrige o warning de múltiplos package-lock.json
  outputFileTracingRoot: path.join(__dirname), // Define corretamente o root do projeto
};

export default nextConfig;
