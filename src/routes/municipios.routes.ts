/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { GetCitiesByUFController } from '../modules/municipios/usecases/getCititesbByUF/GetCitiesByUFController'
import { ListAllUFController } from '../modules/municipios/usecases/listAllUF/listAllUFController'

const listAllUFController = new ListAllUFController()
const getCitiesByUFController = new GetCitiesByUFController()

export async function municipiosRoutes(app: FastifyInstance) {
  app.get('/uf', listAllUFController.handle)
  app.get('/cities/:uf', getCitiesByUFController.handle)
}
