import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
class GetEstabelecimentoByCnpjController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const getReqParams = z.object({
      cnpj: z.string(),
    })
    const { cnpj } = getReqParams.parse(req.params)
    const usecase = req.diScope.resolve('getEstabelecimentoByCnpjUsecase')

    const estabelecimento = await usecase.execute(cnpj)
    return res.status(200).send(estabelecimento)
  }
}

export { GetEstabelecimentoByCnpjController }
