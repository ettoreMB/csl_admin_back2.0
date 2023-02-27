import { AppError } from '../../../../shared/errors/AppErros'
import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

class CreateEstabelecimentoCPFUsecase {
  constructor(private estabelecimentoRepository: IEstabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  async execute(cnpj: string, name: string) {
    const filteredCNPJ = cnpj.replace(/\D+/g, '')

    const estabelecimento = await this.estabelecimentoRepository.findByCNPJ(
      filteredCNPJ,
    )

    if (estabelecimento) {
      throw new AppError('Estabelecimento Já cadastrado')
    }

    try {
      await this.estabelecimentoRepository.createCPF(filteredCNPJ, name)
    } catch (error) {
      console.log(error)
      throw new AppError('Erro ao cadastrar no banco')
    }

    return 'deu certo'
  }
}

export { CreateEstabelecimentoCPFUsecase }
