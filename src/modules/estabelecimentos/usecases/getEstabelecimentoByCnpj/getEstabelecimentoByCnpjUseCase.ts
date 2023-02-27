import { TBL_ESTABELECIMENTOS } from '@prisma/client'

import { AppError } from '../../../../shared/errors/AppErros'
import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

class GetEstabelecimentoByCnpjUseCase {
  constructor(private estabelecimentoRepository: IEstabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  async execute(cnpj: string): Promise<TBL_ESTABELECIMENTOS> {
    const estabelecimento = await this.estabelecimentoRepository.findByCNPJ(
      cnpj,
    )

    if (!estabelecimento) {
      throw new AppError('Estabelecimento  nao encontrado', 404)
    }

    return estabelecimento
  }
}

export { GetEstabelecimentoByCnpjUseCase }
