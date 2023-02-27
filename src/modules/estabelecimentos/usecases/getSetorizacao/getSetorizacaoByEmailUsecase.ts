import { TBL_ESTABELECIMENTOS } from '@prisma/client'
import { AppError } from '../../../../shared/errors/AppErros'

import { ISetorizacaoRepository } from '../../../setorizacao/repositories/ISetorizacaoRepository'
import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

class GetSetorizacaoByEmailUsecase {
  constructor(
    private estabelecimetosRepository: IEstabelecimentoRepository,
    private setorizacaoRepository: ISetorizacaoRepository,
  ) {
    this.estabelecimetosRepository = estabelecimetosRepository
    this.setorizacaoRepository = setorizacaoRepository
  }

  async execute(email: string): Promise<TBL_ESTABELECIMENTOS[]> {
    const emailExists = this.setorizacaoRepository.findByemail(email)
    if (!emailExists) {
      throw new AppError('Email não existe na base de dados')
    }

    const estabelecimentosSetorizacao =
      this.estabelecimetosRepository.getSetorizacaoByEmail(email)

    return estabelecimentosSetorizacao
  }
}

export { GetSetorizacaoByEmailUsecase }
