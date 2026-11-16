import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Add excess lead(II) oxide to dilute sulfuric acid, filter, then heat the filtrate until it is saturated and let it crystallise" },
        { correct: false, label: "Titrate dilute sulfuric acid with lead(II) hydroxide solution, then evaporate the solution to dryness" },
        { correct: false, label: "Add lead to dilute sulfuric acid until no more gas is given off, then filter and crystallise" },
        { correct: true, label: "Mix lead(II) nitrate solution with sodium sulfate solution, filter, rinse the residue with distilled water and dry it between filter papers" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Tambah plumbum(II) oksida berlebihan ke dalam asid sulfurik cair, turas, kemudian panaskan hasil turasan hingga tepu dan biarkan menghablur" },
        { correct: false, label: "Titratkan asid sulfurik cair dengan larutan plumbum(II) hidroksida, kemudian sejatkan larutan hingga kering" },
        { correct: false, label: "Tambah plumbum ke dalam asid sulfurik cair sehingga tiada lagi gas terbebas, kemudian turas dan hablurkan" },
        { correct: true, label: "Campurkan larutan plumbum(II) nitrat dengan larutan natrium sulfat, turas, bilas baki dengan air suling dan keringkan di antara kertas turas" },
      ],
    },
  },
};

export default item;
