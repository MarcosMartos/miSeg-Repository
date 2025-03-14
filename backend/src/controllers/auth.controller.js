import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Registrar usuario
export const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el email ya está en uso
    const userExists = await Usuario.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      rol: user.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener datos del usuario autenticado
export const getUserData = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.user.id, {
      attributes: ["id", "nombre", "email", "rol"],
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del usuario" });
  }
};
