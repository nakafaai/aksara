import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "X: ethene. Y: ethanoic acid" },
        { correct: false, label: "X: carbon dioxide. Y: ethane" },
        { correct: false, label: "X: ethyl ethanoate. Y: ethene" },
        { correct: true, label: "X: ethanoic acid. Y: ethene" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "X: etena. Y: asid etanoik" },
        { correct: false, label: "X: karbon dioksida. Y: etana" },
        { correct: false, label: "X: etil etanoat. Y: etena" },
        { correct: true, label: "X: asid etanoik. Y: etena" },
      ],
    },
  },
};

export default item;
