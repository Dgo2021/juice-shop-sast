/*
 * Ruta de demostración para el laboratorio SAST (Parte D).
 * VULNERABLE A PROPÓSITO: evalúa con eval() una expresión enviada por el usuario.
 */
import { type Request, type Response, type NextFunction } from 'express'

export function calcular () {
  return (req: Request, res: Response, next: NextFunction) => {
    const expresion = req.query.expresion as string
    const resultado = eval(expresion) // Inyección de código (CWE-95)
    res.json({ expresion, resultado })
  }
}
