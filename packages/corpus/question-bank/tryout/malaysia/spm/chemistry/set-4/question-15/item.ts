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
        { correct: false, label: "Aluminium chloride" },
        { correct: true, label: "Zinc chloride" },
        { correct: false, label: "Lead(II) chloride" },
        { correct: false, label: "Zinc sulfate" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Aluminium klorida" },
        { correct: true, label: "Zink klorida" },
        { correct: false, label: "Plumbum(II) klorida" },
        { correct: false, label: "Zink sulfat" },
      ],
    },
  },
};

export default item;
