"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoUsecase.ts
var createEstabelecimentoUsecase_exports = {};
__export(createEstabelecimentoUsecase_exports, {
  CreateEstabelecimentoUsecase: () => CreateEstabelecimentoUsecase
});
module.exports = __toCommonJS(createEstabelecimentoUsecase_exports);

// src/shared/container/providers/soa_web_services/index.ts
var import_axios = __toESM(require("axios"));

// src/env/index.ts
var import_dotenv = __toESM(require("dotenv"));
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  import_dotenv.default.config({ path: "./.env.development" });
} else {
  import_dotenv.default.config();
}
var envSchema = import_zod.z.object({
  SOA_HOST: import_zod.z.string(),
  SOA_LINK: import_zod.z.string(),
  SOA_EMAIL: import_zod.z.string(),
  SOA_SENHA: import_zod.z.string(),
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]),
  PORT: import_zod.z.coerce.number().default(3333),
  DATABASE_URL: import_zod.z.string()
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

// src/shared/errors/AppErros.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateEstabelecimentoUsecase
});
