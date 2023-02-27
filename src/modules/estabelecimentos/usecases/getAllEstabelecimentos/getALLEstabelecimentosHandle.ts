import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetAllEstabelecimentosHandler {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getAllEstabelecimentosUseCase = request.diScope.resolve(
      'getAllEstabelecimentosUsecase',
    )
    const reqParams = z.object({
      search: z.string().default(''),
    })
    const { search } = reqParams.parse(request.query)
    const result = getAllEstabelecimentosUseCase.execute(search)

    return result
  }
}
