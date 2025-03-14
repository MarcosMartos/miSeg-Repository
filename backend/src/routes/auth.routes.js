import express from "express";
import {
  register,
  login,
  getUserData,
} from "./../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register); // ✅ Ruta para crear usuario
router.post("/login", login); // ✅ Ruta para iniciar sesión
router.get("/me", verifyToken, getUserData); // ✅ Ruta para obtener datos autenticados

export default router;
