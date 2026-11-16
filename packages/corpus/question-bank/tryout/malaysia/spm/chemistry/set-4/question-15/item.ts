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
        { correct: false, label: "Aluminium chloride and magnesium sulfate" },
        { correct: true, label: "Zinc sulfate and magnesium chloride" },
        { correct: false, label: "Zinc chloride and calcium nitrate" },
        { correct: false, label: "Lead(II) nitrate and zinc sulfate" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Aluminium klorida dan magnesium sulfat" },
        { correct: true, label: "Zink sulfat dan magnesium klorida" },
        { correct: false, label: "Zink klorida dan kalsium nitrat" },
        { correct: false, label: "Plumbum(II) nitrat dan zink sulfat" },
      ],
    },
  },
};

export default item;
