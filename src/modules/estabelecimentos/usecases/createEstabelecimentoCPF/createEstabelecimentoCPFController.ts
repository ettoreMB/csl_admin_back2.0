import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class CreateEstabelecimentoCPFController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      cpf: z.string(),
      nome: z.string(),
      codMunicipio: z.string(),
    })
    const { cpf, nome, codMunicipio } = reqParams.parse(req.body)
    const createEstabelecimentoCPFUseCase = req.diScope.resolve(
      'createEstabelecimentoCPFUsecase',
    )

    await createEstabelecimentoCPFUseCase.execute(cpf, nome, codMunicipio)

    return res.status(200).send('Estabelecimento Criado Com sucesso')
  }
}

export { CreateEstabelecimentoCPFController }
