import { Prisma, TBL_MOVIMENTO_DEMANDA } from '@prisma/client'

export interface IDemandaRepository {
  getYears(): Promise<
    Prisma.PickArray<Prisma.TBL_MOVIMENTO_DEMANDAGroupByOutputType, []>
  >
  getMonths(
    year: string,
  ): Promise<
    Prisma.PickArray<Prisma.TBL_MOVIMENTO_DEMANDAGroupByOutputType, []>
  >
  getDistribuidores(year: string, month: string): Promise<[] | any>

  getDemanda(
    year: string,
    month: string,
    cnpj: string,
  ): Promise<TBL_MOVIMENTO_DEMANDA[]>
}
