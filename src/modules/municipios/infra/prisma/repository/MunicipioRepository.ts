import { Prisma } from '@prisma/client'
import { prisma } from '../../../../../db/prisma'
import { IMunicipioRepository } from '../../../repositories/IMunicipioRepository'

class MunicipioRepository implements IMunicipioRepository {
  async GetCitiesByUF(
    uf: string,
  ): Promise<{ COD_MUNICIPIO: string; CIDADE: string }[]> {
    const cities = await prisma.tBL_MUNICIPIOS.findMany({
      where: {
        UF: uf,
      },
      select: {
        COD_MUNICIPIO: true,
        CIDADE: true,
      },
    })
    return cities
  }

  async GetallUF(): Promise<
    Prisma.PickArray<Prisma.TBL_MUNICIPIOSGroupByOutputType, []> & {}
  > {
    const ufs = await prisma.tBL_MUNICIPIOS.groupBy({
      by: ['UF'],
    })
    return ufs
  }
}

export { MunicipioRepository }
