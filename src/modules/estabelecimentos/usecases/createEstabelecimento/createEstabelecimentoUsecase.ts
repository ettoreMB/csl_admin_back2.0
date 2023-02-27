import { soaSearch } from '../../../../shared/container/providers/soa_web_services'
import { AppError } from '../../../../shared/errors/AppErros'
import { IEstabelecimentoRepository } from '../../repositories/IEstabelecimentosRepository'

class CreateEstabelecimentoUsecase {
  constructor(private estabelecimentoRepository: IEstabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  async execute(cnpj: string) {
    const filteredCNPJ = cnpj.replace(/\D+/g, '')

    const estabelecimento = await this.estabelecimentoRepository.findByCNPJ(
      filteredCNPJ,
    )

    if (estabelecimento) {
      throw new AppError('Estabelecimento Já cadastrado')
    }

    const estabelecimentoSOA = await soaSearch(filteredCNPJ)

    if (
      estabelecimentoSOA.Transacao.Status === false ||
      estabelecimentoSOA?.Mensagem !== 'Transacao realizada com sucesso!'
    ) {
      throw new AppError('Estabelecimento não encontrado na receita')
    }

    const codNatureza = Number(
      estabelecimentoSOA.CodigoNaturezaJuridica.replace(/\D+/g, ''),
    )

    try {
      await this.estabelecimentoRepository.create({
        cnpj: filteredCNPJ,
        razaoSocial: estabelecimentoSOA.RazaoSocial,
        nomeFantasia: estabelecimentoSOA.NomeFantasia,
        logradouro: estabelecimentoSOA.Enderecos[0].Logradouro,
        logradouroNumero: estabelecimentoSOA.Enderecos[0].Numero,
        logradouroComplemento: estabelecimentoSOA.Enderecos[0].Complemento,
        logradouroBairro: estabelecimentoSOA.Enderecos[0].Bairro,
        logradouroCep: estabelecimentoSOA.Enderecos[0].CEP,
        codNatureza,
      })
    } catch (error) {
      console.log(error)
      throw new AppError('Erro ao cadastrar no banco')
    }
    return 'deu certo'
  }
}

export { CreateEstabelecimentoUsecase }
