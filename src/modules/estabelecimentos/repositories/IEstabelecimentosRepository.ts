import { TBL_ESTABELECIMENTOS } from '@prisma/client'
import { EstabelecimetosProp } from '../usecases/editEstabelecimento/editEstabelecimentoUsecase'

export interface ICreateEstabelecimentoDTO {
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  logradouro: string
  logradouroNumero: string
  logradouroComplemento: string
  logradouroBairro: string
  logradouroCep: string
  codNatureza: number
}

interface IEstabelecimentoRepository {
  create(data: ICreateEstabelecimentoDTO): Promise<void>
  createCPF(cpf: string, nome: string): Promise<void>
  findByCNPJ(cnpj: string): Promise<TBL_ESTABELECIMENTOS | null>
  getAll(value: any): Promise<TBL_ESTABELECIMENTOS[] | unknown>
  getSetorizacaoByEmail(email: string): Promise<any>
  edit(data: EstabelecimetosProp): Promise<TBL_ESTABELECIMENTOS>
  editSetorizacao(cnpj: string, email: string): Promise<void>
}

export { IEstabelecimentoRepository }
