import { AppError } from '../../../../shared/errors/AppErros'
import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

export type EstabelecimetosProp = {
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  cnes: string
}

class EditEstabelecimentoUsecase {
  constructor(private estabelecimentoRepository: IEstabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  async execute({
    cnpj,
    razaoSocial,
    nomeFantasia,
    cnes,
  }: EstabelecimetosProp): Promise<any> {
    const estabelecimento = await this.estabelecimentoRepository.findByCNPJ(
      cnpj,
    )

    if (!estabelecimento) {
      throw new AppError('Estabelecimento  nao encontrado', 404)
    }

    await this.estabelecimentoRepository.edit({
      cnpj: String(estabelecimento.CNPJ),
      razaoSocial,
      nomeFantasia,
      cnes,
    })
  }
}

export { EditEstabelecimentoUsecase }
