import { Prisma } from '@prisma/client'

export interface ISetorizacaoRepository {
  getEmails(): Promise<
    Prisma.PickArray<Prisma.TBL_FV_REPRESENTANTES_DEMANDAGroupByOutputType, []>
  >
  findByemail(
    email: string,
  ): Promise<{ EMAIL_REPRESENTANTE_DEMANDA: string } | null>
}
