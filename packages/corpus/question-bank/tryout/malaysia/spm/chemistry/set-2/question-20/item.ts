import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Titration, $$90.2\\%$$" },
        { correct: false, label: "Precipitation, $$67.7\\%$$" },
        { correct: false, label: "Precipitation, $$111\\%$$" },
        { correct: true, label: "Precipitation, $$90.2\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pentitratan, $$90.2\\%$$" },
        { correct: false, label: "Pemendakan, $$67.7\\%$$" },
        { correct: false, label: "Pemendakan, $$111\\%$$" },
        { correct: true, label: "Pemendakan, $$90.2\\%$$" },
      ],
    },
  },
};

export default item;
