import * as XLSX from "xlsx/xlsx.mjs";

const cabecera = [
  [
    "Item Mp",
    "Código",
    "Subpartida",
    "Descripción",
    "Tipo Unidad",
    "Cantidad Transformado",
    "Cantidad de Desperdicio",
    "Cantidad de Merma",
    "Total Utilizado",
    "Complementario",
    "Suplementario",
  ],
  [
    "bf_csgd_sn",
    "csgd_cmdt_cd",
    "csgd_hs_part_cd",
    "csgd_prdt_desc",
    "csgd_ut_tp_cd",
    "csgd_trsm_use_qt",
    "csgd_duse_qt",
    "csgd_use_ips_duse_qt",
    "csgd_tot_use_qt",
    "csgd_hs_cpmt_cd",
    "csgd_hs_spmt_cd",
  ],
];

export const generarExcelFachada = async (data,numDae) => {
  await generarExcel(data,numDae);
};

const generarExcel = async (data,numDae) => {
  const doc = XLSX.utils.book_new();
  const hoja = XLSX.utils.aoa_to_sheet([cabecera[0], cabecera[1], ...data]);

  XLSX.utils.book_append_sheet(doc, hoja, "Sheet1");

  const opt = {
    bookType: "biff2",
  };

  XLSX.writeFile(doc, numDae+".xls", opt);
};