import { AppError } from '../../../../shared/errors/AppErros'
import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

class CreateEstabelecimentoCPFUsecase {
  constructor(private estabelecimentoRepository: IEstabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  async execute(cpf: string, name: string, codMunicipio: string) {
    const filteredCPF = cpf.replace(/\D+/g, '')

    const estabelecimento = await this.estabelecimentoRepository.findByCNPJ(
      filteredCPF,
    )

    if (estabelecimento) {
      throw new AppError('Estabelecimento Já cadastrado')
    }

    try {
      await this.estabelecimentoRepository.createCPF(
        filteredCPF,
        name,
        codMunicipio,
      )
    } catch (error) {
      console.log(error)
      throw new AppError('Erro ao cadastrar no banco')
    }

    return 'deu certo'
  }
}

export { CreateEstabelecimentoCPFUsecase }
