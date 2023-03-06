import { AppError } from '../../../../shared/errors/AppErros'
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository'

class ListAllUFUsecase {
  constructor(private municipioRepository: IMunicipioRepository) {
    this.municipioRepository = municipioRepository
  }

  async execute() {
    try {
      const ufs = await this.municipioRepository.GetallUF()
      return ufs
    } catch (error) {
      throw new AppError("Error to list all UF's")
    }
  }
}

export { ListAllUFUsecase }
