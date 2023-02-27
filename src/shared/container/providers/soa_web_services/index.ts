import axios from 'axios'
import { env } from '../../../../env'

export const soaApi = axios.create({
  method: 'POST',
  baseURL: `${env.SOA_HOST}${env.SOA_LINK}`,
})

export async function soaSearch(cnpj: string): Promise<any> {
  const soa = JSON.stringify({
    Credenciais: {
      Email: env.SOA_EMAIL,
      Senha: env.SOA_SENHA,
    },
    Documento: cnpj,
  })

  const response = await soaApi.post('', soa)

  return response.data
}
