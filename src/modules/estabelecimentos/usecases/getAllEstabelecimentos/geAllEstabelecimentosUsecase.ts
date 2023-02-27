import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

export class GetAllEstabelecimentosUsecase {
  constructor(private estabelecimentoRepository: IEstabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  async execute(value: any) {
    const estabelecimentos = await this.estabelecimentoRepository.getAll(value)

    return estabelecimentos
  }
}
