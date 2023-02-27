import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify'
import { EstabelecimentoRepository } from '../../modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository'
import { GetAllEstabelecimentosUsecase } from '../../modules/estabelecimentos/usecases/getAllEstabelecimentos/geAllEstabelecimentosUsecase'
import { Lifetime, asFunction, asClass } from 'awilix'
import { EditEstabelecimentoUsecase } from '../../modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase'
import { GetEstabelecimentoByCnpjUseCase } from '../../modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjUseCase'
import { CreateEstabelecimentoUsecase } from '../../modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoUsecase'
import { CreateEstabelecimentoCPFUsecase } from '../../modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase'
const { diContainer } = require('@fastify/awilix')

diContainer.register({
  estabelecimentoRepository: asClass(EstabelecimentoRepository, {
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
