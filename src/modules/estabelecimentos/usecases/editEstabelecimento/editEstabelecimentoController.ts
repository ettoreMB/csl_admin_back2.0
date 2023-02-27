/* eslint-disable camelcase */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
class EditEstabelecimentoController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const getReqParams = z.object({
      cnpj: z.string(),
    })
    const getReqBody = z.object({
      razao_social: z.string(),
      nome_fantasia: z.string(),
      cnes: z.string(),
    })
    const { cnpj } = getReqParams.parse(req.params)
    const { cnes, nome_fantasia, razao_social } = getReqBody.parse(req.body)
    const editEstabelecimetoUseCase = req.diScope.resolve(
      'editEstabelecimentoUsecase',
    )

    await editEstabelecimetoUseCase.execute({
      cnpj,
      cnes,
      nomeFantasia: nome_fantasia,
      razaoSocial: razao_social,
    })

    return res.status(200).send('Estabelecimento editado com sucesso')
  }
}

export { EditEstabelecimentoController }
