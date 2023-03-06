/* eslint-disable no-unused-vars */

import { IEstabelecimentoRepository } from '../modules/estabelecimentos/repositories/IEstabelecimentosRepository'
import { Cradle } from '@fastify/awilix'
import { GetAllEstabelecimentosUsecase } from '../modules/estabelecimentos/usecases/getAllEstabelecimentos/geAllEstabelecimentosUsecase'
import { EstabelecimentoRepository } from '../modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository'
import { EditEstabelecimentoUsecase } from '../modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase'
import { GetEstabelecimentoByCnpjUseCase } from '../modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjUseCase'
import { CreateEstabelecimentoUsecase } from '../modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoUsecase'
import { CreateEstabelecimentoCPFUsecase } from '../modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase'
import { ListAllUFUsecase } from '../modules/municipios/usecases/listAllUF/listAllUFUsecase'
import { MunicipioRepository } from '../modules/municipios/infra/prisma/repository/MunicipioRepository'
import { GetCitiesByUFUsecase } from '../modules/municipios/usecases/getCititesbByUF/GetCitiesByUFUsecase'

declare module '@fastify/awilix' {
  interface Cradle {
    estabelecimentoRepository: EstabelecimentoRepository
    getAllEstabelecimentosUsecase: GetAllEstabelecimentosUsecase
    editEstabelecimentoUsecase: EditEstabelecimentoUsecase
    getEstabelecimentoBycnpjUsecase: GetEstabelecimentoByCnpjUseCase
    createEstabelecimentoUsecase: CreateEstabelecimentoUsecase
    createEstabelecimentoCPFUsecase: CreateEstabelecimentoCPFUsecase
    municipioRepository: MunicipioRepository
    listAllUFUseCase: ListAllUFUsecase
    getCitiesByUFUseCase: GetCitiesByUFUsecase
  }
  interface RequestCradle {
    estabelecimentoRepository: IEstabelecimentoRepository
    getAllEstabelecimentosUseCase: GetAllEstabelecimentosUsecase
    editEstabelecimentoUsecase: EditEstabelecimentoUsecase
    getEstabelecimentoByCnpjUsecase: GetEstabelecimentoByCnpjUseCase
    municipioRepository: MunicipioRepository
    listAllUFUseCase: ListAllUFUsecase
  }
}
