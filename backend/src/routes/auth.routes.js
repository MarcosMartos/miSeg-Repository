import express from "express";
import {
  register,
  login,
  getUserData,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register); // Crear usuario
router.post("/login", login); // Iniciar sesión
router.get("/me", verifyToken, getUserData); // Obtener datos autenticado

export default router;
