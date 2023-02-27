"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_awilix2 = require("@fastify/awilix");

// src/routes/estabelecimentos.routes.ts
var import_zod6 = require("zod");

// src/modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoController.ts
var import_zod = require("zod");
var CreateEstabelecimentoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const reqParams = import_zod.z.object({
        cnpj: import_zod.z.string()
      });
      const { cnpj } = reqParams.parse(req.body);
      const createEstabelecimentoUseCase = req.diScope.resolve(
        "createEstabelecimentoUsecase"
      );
      yield createEstabelecimentoUseCase.execute(cnpj);
      console.log(cnpj);
      return res.status(200).send("Estabelecimento Criado Com sucesso");
    });
  }
};

// src/modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFController.ts
var import_zod2 = require("zod");
var CreateEstabelecimentoCPFController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const reqParams = import_zod2.z.object({
        cnpj: import_zod2.z.string(),
        nome: import_zod2.z.string()
      });
      const { cnpj, nome } = reqParams.parse(req.body);
      const createEstabelecimentoCPFUseCase = req.diScope.resolve(
        "createEstabelecimentoCPFUsecase"
      );
      yield createEstabelecimentoCPFUseCase.execute(cnpj, nome);
      return res.status(200).send("Estabelecimento Criado Com sucesso");
    });
  }
};

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoController.ts
var import_zod3 = require("zod");
var EditEstabelecimentoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const getReqParams = import_zod3.z.object({
        cnpj: import_zod3.z.string()
      });
      const getReqBody = import_zod3.z.object({
        razao_social: import_zod3.z.string(),
        nome_fantasia: import_zod3.z.string(),
        cnes: import_zod3.z.string()
      });
      const { cnpj } = getReqParams.parse(req.params);
      const { cnes, nome_fantasia, razao_social } = getReqBody.parse(req.body);
      const editEstabelecimetoUseCase = req.diScope.resolve(
        "editEstabelecimentoUsecase"
      );
      yield editEstabelecimetoUseCase.execute({
        cnpj,
        cnes,
        nomeFantasia: nome_fantasia,
        razaoSocial: razao_social
      });
      return res.status(200).send("Estabelecimento editado com sucesso");
    });
  }
};

// src/modules/estabelecimentos/usecases/getAllEstabelecimentos/getALLEstabelecimentosHandle.ts
var import_zod4 = require("zod");
var GetAllEstabelecimentosHandler = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const getAllEstabelecimentosUseCase = request.diScope.resolve(
        "getAllEstabelecimentosUsecase"
      );
      const reqParams = import_zod4.z.object({
        search: import_zod4.z.string().default("")
      });
      const { search } = reqParams.parse(request.query);
      const result = getAllEstabelecimentosUseCase.execute(search);
      return result;
    });
  }
};

// src/modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjController.ts
var import_zod5 = require("zod");
var GetEstabelecimentoByCnpjController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const getReqParams = import_zod5.z.object({
        cnpj: import_zod5.z.string()
      });
      const { cnpj } = getReqParams.parse(req.params);
      const usecase = req.diScope.resolve("getEstabelecimentoByCnpjUsecase");
      const estabelecimento = yield usecase.execute(cnpj);
      return res.status(200).send(estabelecimento);
    });
  }
};

// src/routes/estabelecimentos.routes.ts
var getAllEstabelecimentosHandler = new GetAllEstabelecimentosHandler();
var editEstabelecimentoController = new EditEstabelecimentoController();
var createEstabelecimentoController = new CreateEstabelecimentoController();
var createEstabelecimentoCPFController = new CreateEstabelecimentoCPFController();
var getestabelecimentoByCnpjController = new GetEstabelecimentoByCnpjController();
function estabelecimentosRoutes(app2) {
  return __async(this, null, function* () {
    app2.put("/edit/:cnpj", editEstabelecimentoController.handle);
    app2.get("/", getAllEstabelecimentosHandler.handle);
    app2.post("/cnpj", createEstabelecimentoController.handle);
    app2.post("/cpf", createEstabelecimentoCPFController.handle);
    app2.get("/:cnpj", getestabelecimentoByCnpjController.handle);
    app2.get("/setorizacao/:email", (request) => __async(this, null, function* () {
      const getEmailParams = import_zod6.z.object({
        email: import_zod6.z.string()
      });
      const { email } = getEmailParams.parse(request.params);
      const estabelecimentoRepository = request.diScope.resolve(
        "estabelecimentoRepository"
      );
      const setorizacao = yield estabelecimentoRepository.getSetorizacaoByEmail(
        email
      );
      return setorizacao;
    }));
  });
}

// src/modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository.ts
var import_client2 = require("@prisma/client");

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/estabelecimentos/infra/prisma/repostiory/EstabelecimentoRepository.ts
var EstabelecimentoRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({
      cnpj,
      razaoSocial,
      nomeFantasia,
      logradouro,
      logradouroNumero,
      logradouroComplemento,
      logradouroBairro,
      logradouroCep,
      codNatureza
    }) {
      yield prisma.tBL_ESTABELECIMENTOS.create({
        data: {
          CNPJ: cnpj,
          CNES: "0000000",
          RAZAO_SOCIAL: razaoSocial,
          NOME_FANTASIA: nomeFantasia,
          ID_GRUPO_ESTABELECIMENTO: 1,
          LOGRADOURO: logradouro,
          NUMERO: logradouroNumero,
          COMPLEMENTO: logradouroComplemento,
          BAIRRO: logradouroBairro,
          CEP: logradouroCep,
          COD_MUNICIPIO: "0000000",
          COD_NATUREZA: codNatureza,
          EMAIL_REPRESENTANTE_DEMANDA: "orfao@orfao",
          TARGET_DEMANDA: false,
          EMAIL_REPRESENTANTE_VENDA: "orfao@orfao",
          TARGET_VENDA: false,
          DATA_INCLUSAO: /* @__PURE__ */ new Date(),
          DATA_ATUALIZACAO: /* @__PURE__ */ new Date()
        }
      });
    });
  }
  createCPF(cpf, nome) {
    return __async(this, null, function* () {
      yield prisma.tBL_ESTABELECIMENTOS.create({
        data: {
          CNPJ: cpf,
          CNES: "0000000",
          RAZAO_SOCIAL: nome,
          NOME_FANTASIA: nome,
          ID_GRUPO_ESTABELECIMENTO: 1,
          LOGRADOURO: "",
          NUMERO: "",
          COMPLEMENTO: "",
          BAIRRO: "",
          CEP: "00000000",
          COD_MUNICIPIO: "0000000",
          COD_NATUREZA: 1e3,
          EMAIL_REPRESENTANTE_DEMANDA: "orfao@orfao",
          TARGET_DEMANDA: false,
          EMAIL_REPRESENTANTE_VENDA: "orfao@orfao",
          TARGET_VENDA: false,
          DATA_INCLUSAO: /* @__PURE__ */ new Date(),
          DATA_ATUALIZACAO: /* @__PURE__ */ new Date()
        }
      });
    });
  }
  findByCNPJ(cnpj) {
    return __async(this, null, function* () {
      const estabelecimento = yield prisma.tBL_ESTABELECIMENTOS.findFirst({
        where: {
          CNPJ: cnpj
        },
        include: {
          TBL_MUNICIPIOS: {
            select: {
              CIDADE: true,
              ESTADO: true,
              COD_MUNICIPIO: true,
              UF: true
            }
          },
          TBL_FV_REPRESENTANTES_DEMANDA: {
            select: {
              EMAIL_REPRESENTANTE_DEMANDA: true
            }
          },
          TBL_ESTABELECIMENTOS_GRUPOS: {
            select: {
              GRUPO_ESTABELECIMENTO: true
            }
          }
        }
      });
      return estabelecimento;
    });
  }
  getAll(value) {
    return __async(this, null, function* () {
      if (!value) {
        const estabelecimentos2 = yield prisma.tBL_ESTABELECIMENTOS.findMany({
          take: 20
        });
        return estabelecimentos2;
      }
      const searchParam = `${value}%`;
      const estabelecimentos = yield prisma.$queryRaw(
        import_client2.Prisma.sql`
        SELECT * FROM TBL_ESTABELECIMENTOS as tbe
        WHERE tbe.CNPJ LIKE ${searchParam}
        OR tbe.RAZAO_SOCIAL LIKE ${searchParam}
        OR tbe.NOME_FANTASIA LIKE ${searchParam}
        ;
      `
      );
      console.log(estabelecimentos);
      return estabelecimentos;
    });
  }
  getSetorizacaoByEmail(email) {
    return __async(this, null, function* () {
      const setorizacao = yield prisma.tBL_ESTABELECIMENTOS.findMany({
        select: {
          CNPJ: true,
          EMAIL_REPRESENTANTE_DEMANDA: true,
          RAZAO_SOCIAL: true
        },
        where: {
          EMAIL_REPRESENTANTE_DEMANDA: email
        }
      });
      return setorizacao;
    });
  }
  edit(_0) {
    return __async(this, arguments, function* ({
      cnpj,
      cnes,
      nomeFantasia,
      razaoSocial
    }) {
      return yield prisma.tBL_ESTABELECIMENTOS.update({
        where: {
          CNPJ: cnpj
        },
        data: {
          RAZAO_SOCIAL: razaoSocial,
          CNES: cnes,
          NOME_FANTASIA: nomeFantasia,
          DATA_ATUALIZACAO: /* @__PURE__ */ new Date()
        }
      });
    });
  }
  editSetorizacao(cnpj, email) {
    return __async(this, null, function* () {
      yield prisma.tBL_ESTABELECIMENTOS.update({
        where: {
          CNPJ: cnpj
        },
        data: {
          EMAIL_REPRESENTANTE_DEMANDA: email
        }
      });
    });
  }
};

// src/modules/estabelecimentos/usecases/getAllEstabelecimentos/geAllEstabelecimentosUsecase.ts
var GetAllEstabelecimentosUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(value) {
    return __async(this, null, function* () {
      const estabelecimentos = yield this.estabelecimentoRepository.getAll(value);
      return estabelecimentos;
    });
  }
};

// src/shared/container/index.ts
var import_awilix = require("awilix");

// src/shared/errors/AppErros.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase.ts
var EditEstabelecimentoUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      cnpj,
      razaoSocial,
      nomeFantasia,
      cnes
    }) {
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        cnpj
      );
      if (!estabelecimento) {
        throw new AppError("Estabelecimento  nao encontrado", 404);
      }
      yield this.estabelecimentoRepository.edit({
        cnpj: String(estabelecimento.CNPJ),
        razaoSocial,
        nomeFantasia,
        cnes
      });
    });
  }
};

// src/modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjUseCase.ts
var GetEstabelecimentoByCnpjUseCase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(cnpj) {
    return __async(this, null, function* () {
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        cnpj
      );
      if (!estabelecimento) {
        throw new AppError("Estabelecimento  nao encontrado", 404);
      }
      return estabelecimento;
    });
  }
};

// src/shared/container/providers/soa_web_services/index.ts
var import_axios = __toESM(require("axios"));

// src/env/index.ts
var import_dotenv = __toESM(require("dotenv"));
var import_zod7 = require("zod");
if (process.env.NODE_ENV === "test") {
  import_dotenv.default.config({ path: "./.env.development" });
} else {
  import_dotenv.default.config();
}
var envSchema = import_zod7.z.object({
  SOA_HOST: import_zod7.z.string(),
  SOA_LINK: import_zod7.z.string(),
  SOA_EMAIL: import_zod7.z.string(),
  SOA_SENHA: import_zod7.z.string(),
  NODE_ENV: import_zod7.z.enum(["development", "test", "production"]),
  PORT: import_zod7.z.coerce.number().default(3333),
  DATABASE_URL: import_zod7.z.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u{1F6AB} Invalid enviroment variable", _env.error.format());
  throw new Error(`Invalid enviroment variable`);
}
var env = _env.data;

// src/shared/container/providers/soa_web_services/index.ts
var soaApi = import_axios.default.create({
  method: "POST",
  baseURL: `${env.SOA_HOST}${env.SOA_LINK}`
});
function soaSearch(cnpj) {
  return __async(this, null, function* () {
    const soa = JSON.stringify({
      Credenciais: {
        Email: env.SOA_EMAIL,
        Senha: env.SOA_SENHA
      },
      Documento: cnpj
    });
    const response = yield soaApi.post("", soa);
    return response.data;
  });
}

// src/modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoUsecase.ts
var CreateEstabelecimentoUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(cnpj) {
    return __async(this, null, function* () {
      const filteredCNPJ = cnpj.replace(/\D+/g, "");
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        filteredCNPJ
      );
      if (estabelecimento) {
        throw new AppError("Estabelecimento J\xE1 cadastrado");
      }
      const estabelecimentoSOA = yield soaSearch(filteredCNPJ);
      if (estabelecimentoSOA.Transacao.Status === false || (estabelecimentoSOA == null ? void 0 : estabelecimentoSOA.Mensagem) !== "Transacao realizada com sucesso!") {
        throw new AppError("Estabelecimento n\xE3o encontrado na receita");
      }
      const codNatureza = Number(
        estabelecimentoSOA.CodigoNaturezaJuridica.replace(/\D+/g, "")
      );
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
          codNatureza
        });
      } catch (error) {
        console.log(error);
        throw new AppError("Erro ao cadastrar no banco");
      }
      return "deu certo";
    });
  }
};

// src/modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase.ts
var CreateEstabelecimentoCPFUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(cnpj, name) {
    return __async(this, null, function* () {
      const filteredCNPJ = cnpj.replace(/\D+/g, "");
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        filteredCNPJ
      );
      if (estabelecimento) {
        throw new AppError("Estabelecimento J\xE1 cadastrado");
      }
      try {
        yield this.estabelecimentoRepository.createCPF(filteredCNPJ, name);
      } catch (error) {
        console.log(error);
        throw new AppError("Erro ao cadastrar no banco");
      }
      return "deu certo";
    });
  }
};

// src/shared/container/index.ts
var { diContainer } = require("@fastify/awilix");
diContainer.register({
  estabelecimentoRepository: (0, import_awilix.asClass)(EstabelecimentoRepository, {
    lifetime: import_awilix.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
function diGetAllEstabelecimentos(request, reply, done) {
  request.diScope.register({
    getAllEstabelecimentosUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new GetAllEstabelecimentosUsecase(estabelecimentoRepository);
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    editEstabelecimentoUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new EditEstabelecimentoUsecase(estabelecimentoRepository);
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    getEstabelecimentoByCnpjUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new GetEstabelecimentoByCnpjUseCase(estabelecimentoRepository);
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    createEstabelecimentoUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new CreateEstabelecimentoUsecase(estabelecimentoRepository);
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    createEstabelecimentoCPFUsecase: (0, import_awilix.asFunction)(
      ({ estabelecimentoRepository }) => {
        return new CreateEstabelecimentoCPFUsecase(estabelecimentoRepository);
      },
      {
        lifetime: import_awilix.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}

// src/routes/demanda.routes.ts
var import_zod8 = require("zod");

// src/modules/demanda/infra/prisma/repository/DemandaRepository.ts
var import_client3 = require("@prisma/client");
var DemandaRepository = class {
  getDistribuidores(year, month) {
    return __async(this, null, function* () {
      const distribuidores = yield prisma.tBL_MOVIMENTO_DEMANDA.groupBy({
        by: ["CNPJ_DISTRIBUIDOR"],
        where: {
          ANO: year,
          MES: month
        }
      });
      return distribuidores;
    });
  }
  getYears() {
    return __async(this, null, function* () {
      const years = yield prisma.tBL_MOVIMENTO_DEMANDA.groupBy({ by: ["ANO"] });
      return years;
    });
  }
  getMonths(year) {
    return __async(this, null, function* () {
      const months = yield prisma.tBL_MOVIMENTO_DEMANDA.groupBy({
        by: ["MES"],
        orderBy: {
          MES: "asc"
        },
        where: {
          ANO: year
        }
      });
      return months;
    });
  }
  getDemanda(year, month, cnpj) {
    return __async(this, null, function* () {
      const demanda = yield prisma.$queryRaw(
        import_client3.Prisma.sql`
      SELECT tbd.NOME_FANTASIA , tbp.PRODUTO, count(tmd.QTD_UN) as total 
        FROM TBL_MOVIMENTO_DEMANDA as tmd
        JOIN TBL_PRODUTOS as tbp
          ON tbp.COD_PRODUTO = tmd.COD_PRODUTO
        JOIN TBL_DISTRIBUIDORES tbd
          ON tbd.CNPJ_DISTRIBUIDOR = tmd.CNPJ_DISTRIBUIDOR
      WHERE tmd.ANO = ${year} AND tmd.MES = ${month} AND tmd.CNPJ_DISTRIBUIDOR = ${cnpj}
      GROUP BY tbp.PRODUTO, tbd.NOME_FANTASIA
      `
      );
      return demanda;
    });
  }
};

// src/routes/demanda.routes.ts
function demandaRoutes(app2) {
  return __async(this, null, function* () {
    const repository = new DemandaRepository();
    app2.get("/years", () => __async(this, null, function* () {
      const years = yield repository.getYears();
      return years;
    }));
    app2.get("/months/:month", (request) => __async(this, null, function* () {
      const requestMonthParam = import_zod8.z.object({
        month: import_zod8.z.string()
      });
      const { month } = requestMonthParam.parse(request.params);
      const months = yield repository.getMonths(month);
      return months;
    }));
    app2.get("/distribuidores/:year/:month", (request) => __async(this, null, function* () {
      const requestMonthParam = import_zod8.z.object({
        month: import_zod8.z.string(),
        year: import_zod8.z.string()
      });
      const { year, month } = requestMonthParam.parse(request.params);
      const months = yield repository.getDistribuidores(year, month);
      return months;
    }));
    app2.get("/:year/:month/:cnpj", (request) => __async(this, null, function* () {
      const requestMonthParam = import_zod8.z.object({
        month: import_zod8.z.string(),
        year: import_zod8.z.string(),
        cnpj: import_zod8.z.string()
      });
      const { year, month, cnpj } = requestMonthParam.parse(request.params);
      const months = yield repository.getDemanda(year, month, cnpj);
      return months;
    }));
  });
}

// src/app.ts
var import_zod9 = require("zod");

// src/modules/setorizacao/infra/prisma/SetorizacaoRepository.ts
var SetorizacaoRepository = class {
  findByemail(email) {
    return __async(this, null, function* () {
      const emailRep = yield prisma.tBL_FV_REPRESENTANTES_DEMANDA.findFirst({
        where: {
          EMAIL_REPRESENTANTE_DEMANDA: email
        },
        select: {
          EMAIL_REPRESENTANTE_DEMANDA: true
        }
      });
      return emailRep;
    });
  }
  getEmails() {
    return __async(this, null, function* () {
      const emails = yield prisma.tBL_FV_REPRESENTANTES_DEMANDA.groupBy({
        by: ["EMAIL_REPRESENTANTE_DEMANDA"]
      });
      return emails;
    });
  }
};

// src/routes/setorizacao.routes.ts
function setorizacaoRoutes(app2) {
  return __async(this, null, function* () {
    app2.get("/emails", () => {
      const repo = new SetorizacaoRepository();
      const emails = repo.getEmails();
      return emails;
    });
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_awilix2.fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true
});
console.log(env.NODE_ENV);
console.log(env.PORT);
app.addHook("onRequest", diGetAllEstabelecimentos);
app.setErrorHandler((error, request, reply) => {
  const errParams = import_zod9.z.object({
    statusCode: import_zod9.z.number(),
    message: import_zod9.z.string().default("Erro")
  });
  const { statusCode, message } = errParams.parse(error);
  reply.status(statusCode).send(message);
});
app.get("/", () => {
  return "Oi";
});
app.register(estabelecimentosRoutes, { prefix: "/estabelecimentos" });
app.register(demandaRoutes, { prefix: "/demanda" });
app.register(setorizacaoRoutes, { prefix: "/setorizacao" });

// src/server.ts
function startServer() {
  return __async(this, null, function* () {
    try {
      yield app.listen({ port: env.PORT, host: "0.0.0.0" });
      console.log(`Server is running on ${env.PORT}`);
    } catch (error) {
      app.log.error(error);
    }
  });
}
startServer();
