import express from "express";
import db from "./models/index.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

db.sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión a PostgreSQL establecida"))
  .catch((err) => console.error("❌ Error al conectar a PostgreSQL:", err));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
