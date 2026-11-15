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
        {
          correct: false,
          label: "Zinc sulfate",
        },
        {
          correct: true,
          label: "Aluminium sulfate",
        },
        {
          correct: false,
          label: "Lead(II) nitrate",
        },
        {
          correct: false,
          label: "Aluminium chloride",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Zink sulfat",
        },
        {
          correct: true,
          label: "Aluminium sulfat",
        },
        {
          correct: false,
          label: "Plumbum(II) nitrat",
        },
        {
          correct: false,
          label: "Aluminium klorida",
        },
      ],
    },
  },
};

export default item;
