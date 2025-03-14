import db from "./models/index.js";

db.sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión a PostgreSQL establecida"))
  .catch((err) => console.error("❌ Error al conectar a PostgreSQL:", err));
