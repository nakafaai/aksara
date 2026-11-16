import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "All three experiments give the same final volume, because the mass of calcium carbonate is the same" },
        { correct: true, label: "Experiment III gives the least gas, because hydrochloric acid is the limiting reactant there" },
        { correct: false, label: "Experiment I has the highest initial rate, because the chips have the largest surface area" },
        { correct: false, label: "Experiment III has the highest initial rate, because it uses powder" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Ketiga-tiga eksperimen memberi isi padu akhir yang sama, kerana jisim kalsium karbonat sama" },
        { correct: true, label: "Eksperimen III memberi gas paling sedikit, kerana asid hidroklorik ialah bahan tindak balas pengehad di situ" },
        { correct: false, label: "Eksperimen I mempunyai kadar awal paling tinggi, kerana ketulan mempunyai luas permukaan paling besar" },
        { correct: false, label: "Eksperimen III mempunyai kadar awal paling tinggi, kerana ia menggunakan serbuk" },
      ],
    },
  },
};

export default item;
