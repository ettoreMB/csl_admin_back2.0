"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/modules/estabelecimentos/usecases/getSetorizacao/getSetorizacaoByEmailController.ts
var getSetorizacaoByEmailController_exports = {};
__export(getSetorizacaoByEmailController_exports, {
  GetSetorizacaoByEmailController: () => GetSetorizacaoByEmailController
});
module.exports = __toCommonJS(getSetorizacaoByEmailController_exports);
var import_zod = require("zod");

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

// src/modules/estabelecimentos/usecases/getSetorizacao/getSetorizacaoByEmailController.ts
var GetSetorizacaoByEmailController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const reqParams = import_zod.z.object({
        email: import_zod.z.string()
      });
      const { email } = reqParams.parse(req.params);
      const repo = new EstabelecimentoRepository();
      const result = repo.getSetorizacaoByEmail(email);
      res.status(200).send({ result });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetSetorizacaoByEmailController
});
