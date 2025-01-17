export interface ICampItem {
  wtrplCo: string;
  brazierCl: string;
  sbrsCl: string;
  sbrsEtc: string;
  posblFcltyCl: string;
  posblFcltyEtc: string;
  clturEventAt: string;
  clturEvent: string;
  exprnProgrmAt: string;
  hvofBgnde: string;
  caravAcmpnyAt: string;
  toiletCo: string;
  swrmCo: string;
  hvofEnddle: string;
  featureNm: string;
  induty: string;
  lctCl: string;
  doNm: string;
  sigunguNm: string;
  zipcode: string;
  addr1: string;
  addr2: string;
  mapX: string;
  mapY: string;
  direction: string;
  tel: string;
  homepage: string;
  resveUrl: string;
  resveCl: string;
  manageNmpr: string;
  gnrlSiteCo: string;
  autoSiteCo: string;
  glampSiteCo: string;
  caravSiteCo: string;
  indvdlCaravSiteCo: string;
  sitedStnc: string;
  siteMg1Width: string;
  siteMg2Width: string;
  siteMg3Width: string;
  siteMg1Vrticl: string;
  siteMg2Vrticl: string;
  siteMg3Vrticl: string;
  siteMg1Co: string;
  siteMg2Co: string;
  siteMg3Co: string;
  siteBottomCl1: string;
  siteBottomCl2: string;
  siteBottomCl3: string;
  siteBottomCl4: string;
  siteBottomCl5: string;
  tooltip: string;
  glampInnerFclty: string;
  caravInnerFclty: string;
  prmisnDe: string;
  operPdCl: string;
  operDeCl: string;
  trlerAcmpnyAt: string;
  intro: string;
  allar: string;
  insrncAt: string;
  trsagntNo: string;
  exprnProgrm: string;
  extshrCo: string;
  frprvtWrppCo: string;
  frprvtSandCo: string;
  fireSensorCo: string;
  themaEnvrnCl: string;
  mangeDivNm: string;
  mgcDiv: string;
  manageSttus: string;
  eqpmnLendCl: string;
  animalCmgCl: string;
  tourEraCl: string;
  firstImageUrl: string;
  createdtime: string;
  modifiedtime: string;
  contentId: string;
  facltNm: string;
  lineIntro: string;
  bizrno: string;
  facltDivNm: string;
}

export interface IImageItem {
  contentId: "string";
  serialnum: "string";
  imageUrl: "string";
  createdtime: "string";
  modifiedtime: "string";
}

export const ZOOM_LEVEL = {
  11: 20000,
  12: 10000,
  13: 5000,
  14: 3000,
  15: 1000,
} as const;

export type IZoomLevel = keyof typeof ZOOM_LEVEL;
