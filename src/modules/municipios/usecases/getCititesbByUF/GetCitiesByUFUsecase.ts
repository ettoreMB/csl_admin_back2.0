import { AppError } from '../../../../shared/errors/AppErros'
import { IMunicipioRepository } from '../../repositories/IMunicipioRepository'

class GetCitiesByUFUsecase {
  constructor(private municipioRepository: IMunicipioRepository) {
    this.municipioRepository = municipioRepository
  }

  async execute(uf: string) {
    try {
      const cities = await this.municipioRepository.GetCitiesByUF(uf)
      return cities
    } catch (error) {
      throw new AppError('Error to get cities', 500)
    }
  }
}
export { GetCitiesByUFUsecase }
