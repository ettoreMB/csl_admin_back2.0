import { Prisma } from '@prisma/client'
import { prisma } from '../../../../db/prisma'
import { ISetorizacaoRepository } from '../../repositories/ISetorizacaoRepository'

class SetorizacaoRepository implements ISetorizacaoRepository {
  async findByemail(
    email: string,
  ): Promise<{ EMAIL_REPRESENTANTE_DEMANDA: string } | null> {
    const emailRep = await prisma.tBL_FV_REPRESENTANTES_DEMANDA.findFirst({
      where: {
        EMAIL_REPRESENTANTE_DEMANDA: email,
      },
      select: {
        EMAIL_REPRESENTANTE_DEMANDA: true,
      },
    })
    return emailRep
  }

  async getEmails(): Promise<
    Prisma.PickArray<Prisma.TBL_FV_REPRESENTANTES_DEMANDAGroupByOutputType, []>
  > {
    const emails = await prisma.tBL_FV_REPRESENTANTES_DEMANDA.groupBy({
      by: ['EMAIL_REPRESENTANTE_DEMANDA'],
    })

    return emails
  }
}

export { SetorizacaoRepository }
