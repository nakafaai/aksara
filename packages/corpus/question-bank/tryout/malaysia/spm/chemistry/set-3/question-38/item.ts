import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The unvulcanised strip is more elastic, because it stretches further under the load" },
        { correct: false, label: "Vulcanisation removes every double bond, so the vulcanised strip stretches less" },
        { correct: true, label: "The vulcanised strip returns to its original length, because sulfur cross-links pull the polymer chains back after stretching" },
        { correct: false, label: "Sulfur atoms let the polymer chains slide past each other more easily" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Jalur tidak tervulkan lebih kenyal, kerana ia meregang lebih panjang di bawah beban" },
        { correct: false, label: "Pemvulkanan menyingkirkan setiap ikatan ganda dua, jadi jalur tervulkan kurang meregang" },
        { correct: true, label: "Jalur tervulkan kembali kepada panjang asalnya, kerana rangkai silang sulfur menarik rantai polimer kembali selepas diregangkan" },
        { correct: false, label: "Atom sulfur membolehkan rantai polimer menggelongsor melepasi satu sama lain dengan lebih mudah" },
      ],
    },
  },
};

export default item;
