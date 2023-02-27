'use strict'
const __create = Object.create
const __defProp = Object.defineProperty
const __getOwnPropDesc = Object.getOwnPropertyDescriptor
const __getOwnPropNames = Object.getOwnPropertyNames
const __getProtoOf = Object.getPrototypeOf
const __hasOwnProp = Object.prototype.hasOwnProperty
const __export = (target, all) => {
  for (const name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
const __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (const key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
const __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
)
const __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod)
const __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    const fulfilled = (value) => {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    const rejected = (value) => {
      try {
        step(generator.throw(value))
      } catch (e) {
        reject(e)
      }
    }
    var step = (x) =>
      x.done
        ? resolve(x.value)
        : Promise.resolve(x.value).then(fulfilled, rejected)
    step((generator = generator.apply(__this, __arguments)).next())
  })
}

// src/shared/container/index.ts
const container_exports = {}
__export(container_exports, {
  diGetAllEstabelecimentos: () => diGetAllEstabelecimentos,
})
module.exports = __toCommonJS(container_exports)

// src/modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository.ts
const import_client2 = require('@prisma/client')

// src/db/prisma.ts
const import_client = require('@prisma/client')
const prisma = new import_client.PrismaClient({
  log: ['error', 'warn'],
})

// src/modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository.ts
const EstabelecimentoRepository = class {
  create(_0) {
    return __async(
      this,
      arguments,
      function* ({
        cnpj,
        razaoSocial,
        nomeFantasia,
        logradouro,
        logradouroNumero,
        logradouroComplemento,
        logradouroBairro,
        logradouroCep,
        codNatureza,
      }) {
        yield prisma.tBL_ESTABELECIMENTOS.create({
          data: {
            CNPJ: cnpj,
            CNES: '0000000',
            RAZAO_SOCIAL: razaoSocial,
            NOME_FANTASIA: nomeFantasia,
            ID_GRUPO_ESTABELECIMENTO: 1,
            LOGRADOURO: logradouro,
            NUMERO: logradouroNumero,
            COMPLEMENTO: logradouroComplemento,
            BAIRRO: logradouroBairro,
            CEP: logradouroCep,
            COD_MUNICIPIO: '0000000',
            COD_NATUREZA: codNatureza,
            EMAIL_REPRESENTANTE_DEMANDA: 'orfao@orfao',
            TARGET_DEMANDA: false,
            EMAIL_REPRESENTANTE_VENDA: 'orfao@orfao',
            TARGET_VENDA: false,
            DATA_INCLUSAO: /* @__PURE__ */ new Date(),
            DATA_ATUALIZACAO: /* @__PURE__ */ new Date(),
          },
        })
      },
    )
  }

  createCPF(cpf, nome) {
    return __async(this, null, function* () {
      yield prisma.tBL_ESTABELECIMENTOS.create({
        data: {
          CNPJ: cpf,
          CNES: '0000000',
          RAZAO_SOCIAL: nome,
          NOME_FANTASIA: nome,
          ID_GRUPO_ESTABELECIMENTO: 1,
          LOGRADOURO: '',
          NUMERO: '',
          COMPLEMENTO: '',
          BAIRRO: '',
          CEP: '00000000',
          COD_MUNICIPIO: '0000000',
          COD_NATUREZA: 1e3,
          EMAIL_REPRESENTANTE_DEMANDA: 'orfao@orfao',
          TARGET_DEMANDA: false,
          EMAIL_REPRESENTANTE_VENDA: 'orfao@orfao',
          TARGET_VENDA: false,
          DATA_INCLUSAO: /* @__PURE__ */ new Date(),
          DATA_ATUALIZACAO: /* @__PURE__ */ new Date(),
        },
      })
    })
  }

  findByCNPJ(cnpj) {
    return __async(this, null, function* () {
      const estabelecimento = yield prisma.tBL_ESTABELECIMENTOS.findFirst({
        where: {
          CNPJ: cnpj,
        },
        include: {
          TBL_MUNICIPIOS: {
            select: {
              CIDADE: true,
              ESTADO: true,
              COD_MUNICIPIO: true,
              UF: true,
            },
          },
          TBL_FV_REPRESENTANTES_DEMANDA: {
            select: {
              EMAIL_REPRESENTANTE_DEMANDA: true,
            },
          },
          TBL_ESTABELECIMENTOS_GRUPOS: {
            select: {
              GRUPO_ESTABELECIMENTO: true,
            },
          },
        },
      })
      return estabelecimento
    })
  }

  getAll(value) {
    return __async(this, null, function* () {
      if (!value) {
        const estabelecimentos2 = yield prisma.tBL_ESTABELECIMENTOS.findMany({
          take: 20,
        })
        return estabelecimentos2
      }
      const searchParam = `${value}%`
      const estabelecimentos = yield prisma.$queryRaw(
        import_client2.Prisma.sql`
        SELECT * FROM TBL_ESTABELECIMENTOS as tbe
        WHERE tbe.CNPJ LIKE ${searchParam}
        OR tbe.RAZAO_SOCIAL LIKE ${searchParam}
        OR tbe.NOME_FANTASIA LIKE ${searchParam}
        ;
      `,
      )
      console.log(estabelecimentos)
      return estabelecimentos
    })
  }

  getSetorizacaoByEmail(email) {
    return __async(this, null, function* () {
      const setorizacao = yield prisma.tBL_ESTABELECIMENTOS.findMany({
        select: {
          CNPJ: true,
          EMAIL_REPRESENTANTE_DEMANDA: true,
          RAZAO_SOCIAL: true,
        },
        where: {
          EMAIL_REPRESENTANTE_DEMANDA: email,
        },
      })
      return setorizacao
    })
  }

  edit(_0) {
    return __async(
      this,
      arguments,
      function* ({ cnpj, cnes, nomeFantasia, razaoSocial }) {
        return yield prisma.tBL_ESTABELECIMENTOS.update({
          where: {
            CNPJ: cnpj,
          },
          data: {
            RAZAO_SOCIAL: razaoSocial,
            CNES: cnes,
            NOME_FANTASIA: nomeFantasia,
            DATA_ATUALIZACAO: /* @__PURE__ */ new Date(),
          },
        })
      },
    )
  }

  editSetorizacao(cnpj, email) {
    return __async(this, null, function* () {
      yield prisma.tBL_ESTABELECIMENTOS.update({
        where: {
          CNPJ: cnpj,
        },
        data: {
          EMAIL_REPRESENTANTE_DEMANDA: email,
        },
      })
    })
  }
}

// src/modules/estabelecimentos/usecases/getAllEstabelecimentos/geAllEstabelecimentosUsecase.ts
const GetAllEstabelecimentosUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  execute(value) {
    return __async(this, null, function* () {
      const estabelecimentos = yield this.estabelecimentoRepository.getAll(
        value,
      )
      return estabelecimentos
    })
  }
}

// src/shared/container/index.ts
const import_awilix = require('awilix')

// src/shared/errors/AppErros.ts
const AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase.ts
const EditEstabelecimentoUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  execute(_0) {
    return __async(
      this,
      arguments,
      function* ({ cnpj, razaoSocial, nomeFantasia, cnes }) {
        const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
          cnpj,
        )
        if (!estabelecimento) {
          throw new AppError('Estabelecimento  nao encontrado', 404)
        }
        yield this.estabelecimentoRepository.edit({
          cnpj: String(estabelecimento.CNPJ),
          razaoSocial,
          nomeFantasia,
          cnes,
        })
      },
    )
  }
}

// src/modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjUseCase.ts
const GetEstabelecimentoByCnpjUseCase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  execute(cnpj) {
    return __async(this, null, function* () {
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        cnpj,
      )
      if (!estabelecimento) {
        throw new AppError('Estabelecimento  nao encontrado', 404)
      }
      return estabelecimento
    })
  }
}

// src/shared/container/providers/soa_web_services/index.ts
const import_axios = __toESM(require('axios'))

// src/env/index.ts
const import_dotenv = __toESM(require('dotenv'))
const import_zod = require('zod')
if (process.env.NODE_ENV === 'test') {
  import_dotenv.default.config({ path: './.env.development' })
} else {
  import_dotenv.default.config()
}
const envSchema = import_zod.z.object({
  SOA_HOST: import_zod.z.string(),
  SOA_LINK: import_zod.z.string(),
  SOA_EMAIL: import_zod.z.string(),
  SOA_SENHA: import_zod.z.string(),
  NODE_ENV: import_zod.z.enum(['development', 'test', 'production']),
  PORT: import_zod.z.coerce.number().default(3333),
  DATABASE_URL: import_zod.z.string(),
})
const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('\u{1F6AB} Invalid enviroment variable', _env.error.format())
  throw new Error(`Invalid enviroment variable`)
}
const env = _env.data

// src/shared/container/providers/soa_web_services/index.ts
const soaApi = import_axios.default.create({
  method: 'POST',
  baseURL: `${env.SOA_HOST}${env.SOA_LINK}`,
})
function soaSearch(cnpj) {
  return __async(this, null, function* () {
    const soa = JSON.stringify({
      Credenciais: {
        Email: env.SOA_EMAIL,
        Senha: env.SOA_SENHA,
      },
      Documento: cnpj,
    })
    const response = yield soaApi.post('', soa)
    return response.data
  })
}

// src/modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoUsecase.ts
const CreateEstabelecimentoUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  execute(cnpj) {
    return __async(this, null, function* () {
      const filteredCNPJ = cnpj.replace(/\D+/g, '')
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        filteredCNPJ,
      )
      if (estabelecimento) {
        throw new AppError('Estabelecimento J\xE1 cadastrado')
      }
      const estabelecimentoSOA = yield soaSearch(filteredCNPJ)
      if (
        estabelecimentoSOA.Transacao.Status === false ||
        (estabelecimentoSOA == null ? void 0 : estabelecimentoSOA.Mensagem) !==
          'Transacao realizada com sucesso!'
      ) {
        throw new AppError('Estabelecimento n\xE3o encontrado na receita')
      }
      const codNatureza = Number(
        estabelecimentoSOA.CodigoNaturezaJuridica.replace(/\D+/g, ''),
      )
      try {
        yield this.estabelecimentoRepository.create({
          cnpj: filteredCNPJ,
          razaoSocial: estabelecimentoSOA.RazaoSocial,
          nomeFantasia: estabelecimentoSOA.NomeFantasia,
          logradouro: estabelecimentoSOA.Enderecos[0].Logradouro,
          logradouroNumero: estabelecimentoSOA.Enderecos[0].Numero,
          logradouroComplemento: estabelecimentoSOA.Enderecos[0].Complemento,
          logradouroBairro: estabelecimentoSOA.Enderecos[0].Bairro,
          logradouroCep: estabelecimentoSOA.Enderecos[0].CEP,
          codNatureza,
        })
      } catch (error) {
        console.log(error)
        throw new AppError('Erro ao cadastrar no banco')
      }
      return 'deu certo'
    })
  }
}

// src/modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase.ts
const CreateEstabelecimentoCPFUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository
    this.estabelecimentoRepository = estabelecimentoRepository
  }

  execute(cnpj, name) {
    return __async(this, null, function* () {
      const filteredCNPJ = cnpj.replace(/\D+/g, '')
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        filteredCNPJ,
      )
      if (estabelecimento) {
        throw new AppError('Estabelecimento J\xE1 cadastrado')
      }
      try {
        yield this.estabelecimentoRepository.createCPF(filteredCNPJ, name)
      } catch (error) {
        console.log(error)
        throw new AppError('Erro ao cadastrar no banco')
      }
      return 'deu certo'
    })
  }
}

// src/shared/container/index.ts
const { diContainer } = require('@fastify/awilix')
diContainer.register({
  estabelecimentoRepository: (0, import_awilix.asClass)(
    EstabelecimentoRepository,
    {
      lifetime: import_awilix.Lifetime.SINGLETON,
      dispose: (module2) => module2.dispose(),
    },
  ),
})
function diGetAllEstabelecimentos(request, reply, done) {
  request.diScope.register({
    getAllEstabelecimentosUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new GetAllEstabelecimentosUsecase(estabelecimentoRepository)
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose(),
      },
    ),
  })
  request.diScope.register({
    editEstabelecimentoUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new EditEstabelecimentoUsecase(estabelecimentoRepository)
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose(),
      },
    ),
  })
  request.diScope.register({
    getEstabelecimentoByCnpjUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new GetEstabelecimentoByCnpjUseCase(estabelecimentoRepository)
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose(),
      },
    ),
  })
  request.diScope.register({
    createEstabelecimentoUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new CreateEstabelecimentoUsecase(estabelecimentoRepository)
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose(),
      },
    ),
  })
  request.diScope.register({
    createEstabelecimentoCPFUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new CreateEstabelecimentoCPFUsecase(estabelecimentoRepository)
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose(),
      },
    ),
  })
  done()
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    diGetAllEstabelecimentos,
  })
