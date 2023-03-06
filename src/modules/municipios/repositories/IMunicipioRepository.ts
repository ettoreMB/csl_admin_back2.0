import { Prisma } from '@prisma/client'

export interface IMunicipioRepository {
  GetallUF(): Promise<
    Prisma.PickArray<Prisma.TBL_MUNICIPIOSGroupByOutputType, []> & {}
  >
  GetCitiesByUF(uf: string): Promise<any>
}
