/*
 * Ruta de demostración para el laboratorio SAST (Parte D).
 * CORREGIDA: ya no se usa eval(); solo se permiten operaciones de una lista blanca.
 */
import { type Request, type Response, type NextFunction } from 'express'

const operaciones = new Map<string, (a: number, b: number) => number>([
  ['suma', (a, b) => a + b],
  ['resta', (a, b) => a - b],
  ['multiplicacion', (a, b) => a * b]
])

export function calcular () {
  return (req: Request, res: Response, next: NextFunction) => {
    const a = Number(req.query.a)
    const b = Number(req.query.b)
    const operacion = operaciones.get(String(req.query.op))
    if (!Number.isFinite(a) || !Number.isFinite(b) || operacion === undefined) {
      res.status(400).json({ error: 'Parámetros inválidos' })
      return
    }
    res.json({ resultado: operacion(a, b) })
  }
}
