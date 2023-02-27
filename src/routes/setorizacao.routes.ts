import { FastifyInstance } from 'fastify'
import { SetorizacaoRepository } from '../modules/setorizacao/infra/prisma/SetorizacaoRepository'

export async function setorizacaoRoutes(app: FastifyInstance) {
  app.get('/emails', () => {
    const repo = new SetorizacaoRepository()

    const emails = repo.getEmails()

    return emails
  })
}
