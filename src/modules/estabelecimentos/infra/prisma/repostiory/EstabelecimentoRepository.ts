import { Prisma, TBL_ESTABELECIMENTOS } from '@prisma/client'
import { prisma } from '../../../../../db/prisma'
import {
  ICreateEstabelecimentoDTO,
  IEstabelecimentoRepository,
} from '../../../repositories/IEstabelecimentosRepository'
import { EstabelecimetosProp } from '../../../usecases/editEstabelecimento/editEstabelecimentoUsecase'

export class EstabelecimentoRepository implements IEstabelecimentoRepository {
  async create({
    cnpj,
    razaoSocial,
    nomeFantasia,
    logradouro,
    logradouroNumero,
    logradouroComplemento,
    logradouroBairro,
    logradouroCep,
    codNatureza,
  }: ICreateEstabelecimentoDTO): Promise<void> {
    await prisma.tBL_ESTABELECIMENTOS.create({
      data: {
        CNPJ: cnpj,
        CNES: '0000000',
        RAZAO_SOCIAL: razaoSocial,
        NOME_FANTASIA: nomeFantasia,
        ID_GRUPO_ESTABELECIMENTO: 1,
        LOGRADOURO: logradouro,
        NUMERO: logradouroNumero,
        COMPLEMENTO: logradouroComplemento,
        BAIRRO: logradouroBairro,
        CEP: logradouroCep,
        COD_MUNICIPIO: '0000000',
        COD_NATUREZA: codNatureza,
        EMAIL_REPRESENTANTE_DEMANDA: 'orfao@orfao',
        TARGET_DEMANDA: false,
        EMAIL_REPRESENTANTE_VENDA: 'orfao@orfao',
        TARGET_VENDA: false,
        DATA_INCLUSAO: new Date(),
        DATA_ATUALIZACAO: new Date(),
      },
    })
  }

  async createCPF(cpf: string, nome: string): Promise<void> {
    await prisma.tBL_ESTABELECIMENTOS.create({
      data: {
        CNPJ: cpf,
        CNES: '0000000',
        RAZAO_SOCIAL: nome,
        NOME_FANTASIA: nome,
        ID_GRUPO_ESTABELECIMENTO: 1,
        LOGRADOURO: '',
        NUMERO: '',
        COMPLEMENTO: '',
        BAIRRO: '',
        CEP: '00000000',
        COD_MUNICIPIO: '0000000',
        COD_NATUREZA: 1000,
        EMAIL_REPRESENTANTE_DEMANDA: 'orfao@orfao',
        TARGET_DEMANDA: false,
        EMAIL_REPRESENTANTE_VENDA: 'orfao@orfao',
        TARGET_VENDA: false,
        DATA_INCLUSAO: new Date(),
        DATA_ATUALIZACAO: new Date(),
      },
    })
  }

  async findByCNPJ(cnpj: string): Promise<TBL_ESTABELECIMENTOS | null> {
    const estabelecimento = await prisma.tBL_ESTABELECIMENTOS.findFirst({
      where: {
        CNPJ: cnpj,
      },
      include: {
        TBL_MUNICIPIOS: {
          select: {
            CIDADE: true,
            ESTADO: true,
            COD_MUNICIPIO: true,
            UF: true,
          },
        },
        TBL_FV_REPRESENTANTES_DEMANDA: {
          select: {
            EMAIL_REPRESENTANTE_DEMANDA: true,
          },
        },
        TBL_ESTABELECIMENTOS_GRUPOS: {
          select: {
            GRUPO_ESTABELECIMENTO: true,
          },
        },
      },
    })
    return estabelecimento
  }

  async getAll(value: string): Promise<TBL_ESTABELECIMENTOS[] | unknown> {
    if (!value) {
      const estabelecimentos = await prisma.tBL_ESTABELECIMENTOS.findMany({
        take: 20,
      })
      return estabelecimentos
    }
    const searchParam = `${value}%`
    const estabelecimentos = await prisma.$queryRaw(
      Prisma.sql`
        SELECT * FROM TBL_ESTABELECIMENTOS as tbe
        WHERE tbe.CNPJ LIKE ${searchParam}
        OR tbe.RAZAO_SOCIAL LIKE ${searchParam}
        OR tbe.NOME_FANTASIA LIKE ${searchParam}
        ;
      `,
    )
    console.log(estabelecimentos)
    return estabelecimentos
  }

  async getSetorizacaoByEmail(email: string): Promise<any> {
    const setorizacao = await prisma.tBL_ESTABELECIMENTOS.findMany({
      select: {
        CNPJ: true,
        EMAIL_REPRESENTANTE_DEMANDA: true,
        RAZAO_SOCIAL: true,
      },
      where: {
        EMAIL_REPRESENTANTE_DEMANDA: email,
      },
    })

    return setorizacao
  }

  async edit({
    cnpj,
    cnes,
    nomeFantasia,
    razaoSocial,
  }: EstabelecimetosProp): Promise<TBL_ESTABELECIMENTOS> {
    return await prisma.tBL_ESTABELECIMENTOS.update({
      where: {
        CNPJ: cnpj,
      },
      data: {
        RAZAO_SOCIAL: razaoSocial,
        CNES: cnes,
        NOME_FANTASIA: nomeFantasia,
        DATA_ATUALIZACAO: new Date(),
      },
    })
  }

  async editSetorizacao(cnpj: string, email: string): Promise<void> {
    await prisma.tBL_ESTABELECIMENTOS.update({
      where: {
        CNPJ: cnpj,
      },
      data: {
        EMAIL_REPRESENTANTE_DEMANDA: email,
      },
    })
  }
}
