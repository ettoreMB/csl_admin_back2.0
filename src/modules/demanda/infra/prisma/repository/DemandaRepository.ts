import { Prisma } from '@prisma/client'
import { prisma } from '../../../../../db/prisma'

import { IDemandaRepository } from '../../../repositories/IDemandaRepository'

export class DemandaRepository implements IDemandaRepository {
  async getDistribuidores(year: string, month: string): Promise<[] | any> {
    const distribuidores = await prisma.$queryRaw(
      Prisma.sql`
      select md.CNPJ_DISTRIBUIDOR, tbd.NOME_FANTASIA from TBL_MOVIMENTO_DEMANDA as md
      join TBL_DISTRIBUIDORES tbd
	        on tbd.CNPJ_DISTRIBUIDOR = md.CNPJ_DISTRIBUIDOR
      where md.ANO = ${year} AND  md.MES =${month}
      group by md.CNPJ_DISTRIBUIDOR, tbd.NOME_FANTASIA
      `,
    )
    return distribuidores
  }

  async getYears(): Promise<
    Prisma.PickArray<Prisma.TBL_MOVIMENTO_DEMANDAGroupByOutputType, []>
  > {
    const years = await prisma.tBL_MOVIMENTO_DEMANDA.groupBy({ by: ['ANO'] })

    return years
  }

  async getMonths(
    year: string,
  ): Promise<
    Prisma.PickArray<Prisma.TBL_MOVIMENTO_DEMANDAGroupByOutputType, []>
  > {
    const months = await prisma.tBL_MOVIMENTO_DEMANDA.groupBy({
      by: ['MES'],
      orderBy: {
        MES: 'asc',
      },
      where: {
        ANO: year,
      },
    })

    return months
  }

  async getDemanda(year: string, month: string, cnpj: string): Promise<any> {
    const demanda = await prisma.$queryRaw(
      Prisma.sql`
      SELECT tbd.NOME_FANTASIA , tbp.PRODUTO, count(tmd.QTD_UN) as total 
        FROM TBL_MOVIMENTO_DEMANDA as tmd
        JOIN TBL_PRODUTOS as tbp
          ON tbp.COD_PRODUTO = tmd.COD_PRODUTO
        JOIN TBL_DISTRIBUIDORES tbd
          ON tbd.CNPJ_DISTRIBUIDOR = tmd.CNPJ_DISTRIBUIDOR
      WHERE tmd.ANO = ${year} AND tmd.MES = ${month} AND tmd.CNPJ_DISTRIBUIDOR = ${cnpj}
      GROUP BY tbp.PRODUTO, tbd.NOME_FANTASIA
      `,
    )
    return demanda
  }
}
