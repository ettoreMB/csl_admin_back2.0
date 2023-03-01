import { FastifyReply, FastifyRequest } from 'fastify'
import { EstabelecimentoRepository } from '../../infra/prisma/repostiory/EstabelecimentoRepository'

class EditEstabelecimentoSetorizacaoController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const { emailRep, estabelecimentos }: any = req.body

    const repo = new EstabelecimentoRepository()

    estabelecimentos.forEach(async (estabelecimento: any) => {
      await repo.editSetorizacao(estabelecimento, emailRep)
    })
    return res.status(200).send('Foi')
  }
}

export { EditEstabelecimentoSetorizacaoController }
