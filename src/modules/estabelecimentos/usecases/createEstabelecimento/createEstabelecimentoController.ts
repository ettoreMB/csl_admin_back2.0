import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class CreateEstabelecimentoController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      cnpj: z.string(),
    })
    const { cnpj } = reqParams.parse(req.body)
    const createEstabelecimentoUseCase = req.diScope.resolve(
      'createEstabelecimentoUsecase',
    )

    await createEstabelecimentoUseCase.execute(cnpj)
    console.log(cnpj)
    return res.status(200).send('Estabelecimento Criado Com sucesso')
  }
}

export { CreateEstabelecimentoController }
