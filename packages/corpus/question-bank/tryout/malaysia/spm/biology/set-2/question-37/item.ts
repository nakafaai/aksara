import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "ecosystem",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "The numbers of rats and frogs rise" },
        { correct: false, label: "The number of grasshoppers rises" },
        { correct: false, label: "The rice yield rises" },
        { correct: false, label: "The number of frogs falls" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Bilangan tikus dan katak meningkat" },
        { correct: false, label: "Bilangan belalang meningkat" },
        { correct: false, label: "Hasil padi meningkat" },
        { correct: false, label: "Bilangan katak berkurang" },
      ],
    },
  },
};

export default item;
