import { FastifyInstance } from 'fastify'
import { EditEstabelecimentoSetorizacaoController } from '../modules/estabelecimentos/usecases/editEstabelecimentoSetorizacao/editEstabelecimentoSetorizacaoController'
import { SetorizacaoRepository } from '../modules/setorizacao/infra/prisma/SetorizacaoRepository'

const editEstabelecimentoSetorizacaoController =
  new EditEstabelecimentoSetorizacaoController()

export async function setorizacaoRoutes(app: FastifyInstance) {
  app.get('/emails', () => {
    const repo = new SetorizacaoRepository()

    const emails = repo.getEmails()

    return emails
  })
  app.patch('/transferir', editEstabelecimentoSetorizacaoController.handle)
}
