import { IEstabelecimentoRepository } from '../../../../repositories/IEstabelecimentosRepository'

const estabelecimentosData = [
  {
    CNPJ: 5371944796,
    CNES: '0000000',
    RAZAO_SOCIAL: 'REJANE CELESTE DOS ANJOS BECKER',
    NOME_FANTASIA: 'REJANE CELESTE DOS ANJOS BECKER',
    ID_GRUPO_ESTABELECIMENTO: 2,
    LOGRADOURO: null,
    NUMERO: null,
    COMPLEMENTO: null,
    BAIRRO: null,
    CEP: '00000000',
    COD_MUNICIPIO: '3304557',
    COD_NATUREZA: 1000,
    EMAIL_REPRESENTANTE_DEMANDA: 'romeu.soares@cslbehring.com',
    TARGET_DEMANDA: false,
    EMAIL_REPRESENTANTE_VENDA: 'orfao@orfao',
    TARGET_VENDA: false,
    DATA_INCLUSAO: '2023-01-16T00:00:00.000Z',
    DATA_ATUALIZACAO: '2023-01-16T00:00:00.000Z',
  },
]
export class EstabelecimentoRepositoryInMemory
  implements IEstabelecimentoRepository
{
  findByCNPJ(cnpj: string): any {
    return estabelecimentosData.find((est) => String(est.CNPJ) === cnpj)
  }

  getAll(): any {
    const estabelecimentos = estabelecimentosData

    return estabelecimentos
  }

  getSetorizacaoByEmail(email: string): any {}

  edit({ cnpj, cnes, nomeFantasia, razaoSocial }: any): any {
    return { cnpj, cnes, nomeFantasia, razaoSocial }
  }
}
