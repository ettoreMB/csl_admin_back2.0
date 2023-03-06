import { FastifyReply, FastifyRequest } from 'fastify'

class ListAllUFController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const listAllUFUsecase = req.diScope.resolve('listAllUFUseCase')

    const response = await listAllUFUsecase.execute()
    return res.status(200).send(response)
  }
}
export { ListAllUFController }
