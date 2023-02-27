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

// src/routes/demanda.routes.ts
var demanda_routes_exports = {};
__export(demanda_routes_exports, {
  demandaRoutes: () => demandaRoutes
});
module.exports = __toCommonJS(demanda_routes_exports);
var import_zod = require("zod");

// src/modules/demanda/infra/prisma/repository/DemandaRepository.ts
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

// src/routes/demanda.routes.ts
function demandaRoutes(app) {
  return __async(this, null, function* () {
    const repository = new DemandaRepository();
    app.get("/years", () => __async(this, null, function* () {
      const years = yield repository.getYears();
      return years;
    }));
    app.get("/months/:month", (request) => __async(this, null, function* () {
      const requestMonthParam = import_zod.z.object({
        month: import_zod.z.string()
      });
      const { month } = requestMonthParam.parse(request.params);
      const months = yield repository.getMonths(month);
      return months;
    }));
    app.get("/distribuidores/:year/:month", (request) => __async(this, null, function* () {
      const requestMonthParam = import_zod.z.object({
        month: import_zod.z.string(),
        year: import_zod.z.string()
      });
      const { year, month } = requestMonthParam.parse(request.params);
      const months = yield repository.getDistribuidores(year, month);
      return months;
    }));
    app.get("/:year/:month/:cnpj", (request) => __async(this, null, function* () {
      const requestMonthParam = import_zod.z.object({
        month: import_zod.z.string(),
        year: import_zod.z.string(),
        cnpj: import_zod.z.string()
      });
      const { year, month, cnpj } = requestMonthParam.parse(request.params);
      const months = yield repository.getDemanda(year, month, cnpj);
      return months;
    }));
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  demandaRoutes
});
