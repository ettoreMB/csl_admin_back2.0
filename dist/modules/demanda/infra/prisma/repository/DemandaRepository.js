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

// src/modules/demanda/infra/prisma/repository/DemandaRepository.ts
var DemandaRepository_exports = {};
__export(DemandaRepository_exports, {
  DemandaRepository: () => DemandaRepository
});
module.exports = __toCommonJS(DemandaRepository_exports);
var import_client2 = require("@prisma/client");

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/demanda/infra/prisma/repository/DemandaRepository.ts
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
        import_client2.Prisma.sql`
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DemandaRepository
});
