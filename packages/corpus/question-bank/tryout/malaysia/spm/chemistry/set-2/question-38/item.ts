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
        { correct: false, label: "Sulfur removes every double bond, so the chains become rigid" },
        { correct: true, label: "Sulfur atoms form cross-links between the polymer chains, which pull the chains back to their original positions" },
        { correct: false, label: "Vulcanisation breaks the polymer chains into shorter pieces" },
        { correct: false, label: "Vulcanised rubber has more double bonds than natural rubber" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Sulfur menyingkirkan setiap ikatan ganda dua, jadi rantai menjadi tegar" },
        { correct: true, label: "Atom sulfur membentuk rangkai silang antara rantai polimer, yang menarik rantai kembali ke kedudukan asalnya" },
        { correct: false, label: "Pemvulkanan memecahkan rantai polimer kepada bahagian yang lebih pendek" },
        { correct: false, label: "Getah tervulkan mempunyai lebih banyak ikatan ganda dua daripada getah asli" },
      ],
    },
  },
};

export default item;
