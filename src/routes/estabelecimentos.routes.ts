/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { CreateEstabelecimentoController } from '../modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoController'
import { CreateEstabelecimentoCPFController } from '../modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFController'
import { EditEstabelecimentoController } from '../modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoController'

import { GetAllEstabelecimentosHandler } from '../modules/estabelecimentos/usecases/getAllEstabelecimentos/getALLEstabelecimentosHandle'
import { GetEstabelecimentoByCnpjController } from '../modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjController'

const getAllEstabelecimentosHandler = new GetAllEstabelecimentosHandler()
const editEstabelecimentoController = new EditEstabelecimentoController()
const createEstabelecimentoController = new CreateEstabelecimentoController()
const createEstabelecimentoCPFController =
  new CreateEstabelecimentoCPFController()
const getestabelecimentoByCnpjController =
  new GetEstabelecimentoByCnpjController()

export async function estabelecimentosRoutes(app: FastifyInstance) {
  app.put('/edit/:cnpj', editEstabelecimentoController.handle)
  app.get('/', getAllEstabelecimentosHandler.handle)
  app.post('/cnpj', createEstabelecimentoController.handle)
  app.post('/cpf', createEstabelecimentoCPFController.handle)
  app.get('/:cnpj', getestabelecimentoByCnpjController.handle)
  app.get('/setorizacao/:email', async (request) => {
    const getEmailParams = z.object({
      email: z.string(),
    })
    const { email } = getEmailParams.parse(request.params)
    const estabelecimentoRepository = request.diScope.resolve(
      'estabelecimentoRepository',
    )
    const setorizacao = await estabelecimentoRepository.getSetorizacaoByEmail(
      email,
    )

    return setorizacao
  })
}
