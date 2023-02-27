import { describe, it } from 'vitest'
import { EstabelecimentoRepositoryInMemory } from '../../modules/estabelecimentos/infra/prisma/repostiory/Inmemory/EstabelecimentoRepositoryInMemory'

describe('Estabelecimentos repository Test', () => {
  it('Shoul be able to load estabelecimentos', async () => {
    const repo = new EstabelecimentoRepositoryInMemory()

    const result = await repo.getAll()
    console.log(result)
  })
})
