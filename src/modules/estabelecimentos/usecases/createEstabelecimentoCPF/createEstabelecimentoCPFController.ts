import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class CreateEstabelecimentoCPFController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      cnpj: z.string(),
      nome: z.string(),
    })
    const { cnpj, nome } = reqParams.parse(req.body)
    const createEstabelecimentoCPFUseCase = req.diScope.resolve(
      'createEstabelecimentoCPFUsecase',
    )

    await createEstabelecimentoCPFUseCase.execute(cnpj, nome)

    return res.status(200).send('Estabelecimento Criado Com sucesso')
  }
}

export { CreateEstabelecimentoCPFController }
