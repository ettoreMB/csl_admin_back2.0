import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class GetCitiesByUFController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      uf: z.string(),
    })

    const { uf } = reqParams.parse(req.params)
    const getCitiesByUFUsecase = req.diScope.resolve('getCitiesByUFUseCase')

    const response = await getCitiesByUFUsecase.execute(uf)

    return res.status(200).send(response)
  }
}

export { GetCitiesByUFController }
