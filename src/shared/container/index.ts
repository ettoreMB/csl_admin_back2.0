import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify'
import { EstabelecimentoRepository } from '../../modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository'
import { GetAllEstabelecimentosUsecase } from '../../modules/estabelecimentos/usecases/getAllEstabelecimentos/geAllEstabelecimentosUsecase'
import { Lifetime, asFunction, asClass } from 'awilix'
import { EditEstabelecimentoUsecase } from '../../modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase'
import { GetEstabelecimentoByCnpjUseCase } from '../../modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjUseCase'
import { CreateEstabelecimentoUsecase } from '../../modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoUsecase'
import { CreateEstabelecimentoCPFUsecase } from '../../modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase'
import { MunicipioRepository } from '../../modules/municipios/infra/prisma/repository/MunicipioRepository'
import { ListAllUFUsecase } from '../../modules/municipios/usecases/listAllUF/listAllUFUsecase'
import { GetCitiesByUFUsecase } from '../../modules/municipios/usecases/getCititesbByUF/GetCitiesByUFUsecase'
const { diContainer } = require('@fastify/awilix')

diContainer.register({
  estabelecimentoRepository: asClass(EstabelecimentoRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})
diContainer.register({
  municipioRepository: asClass(MunicipioRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

export function diGetAllEstabelecimentos(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    getAllEstabelecimentosUsecase: asFunction(
      ({ estabelecimentoRepository }: any) => {
        return new GetAllEstabelecimentosUsecase(estabelecimentoRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    editEstabelecimentoUsecase: asFunction(
      ({ estabelecimentoRepository }: any) => {
        return new EditEstabelecimentoUsecase(estabelecimentoRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    getEstabelecimentoByCnpjUsecase: asFunction(
      ({ estabelecimentoRepository }: any) => {
        return new GetEstabelecimentoByCnpjUseCase(estabelecimentoRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    createEstabelecimentoUsecase: asFunction(
      ({ estabelecimentoRepository }: any) => {
        return new CreateEstabelecimentoUsecase(estabelecimentoRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    createEstabelecimentoCPFUsecase: asFunction(
      ({ estabelecimentoRepository }: any) => {
        return new CreateEstabelecimentoCPFUsecase(estabelecimentoRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })

  done()
}
export function diMunicipios(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    listAllUFUseCase: asFunction(
      ({ municipioRepository }: any) => {
        return new ListAllUFUsecase(municipioRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    getCitiesByUFUseCase: asFunction(
      ({ municipioRepository }: any) => {
        return new GetCitiesByUFUsecase(municipioRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  done()
}
