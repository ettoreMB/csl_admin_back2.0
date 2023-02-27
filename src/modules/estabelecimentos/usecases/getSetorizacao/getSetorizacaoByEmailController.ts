import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EstabelecimentoRepository } from '../../infra/prisma/repostiory/EstabelecimentoRepository'

class GetSetorizacaoByEmailController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      email: z.string(),
    })
    const { email } = reqParams.parse(req.params)
    const repo = new EstabelecimentoRepository()
    const result = repo.getSetorizacaoByEmail(email)
    res.status(200).send({ result })
  }
}

export { GetSetorizacaoByEmailController }
