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
        { correct: true, label: "n = 2000, and chlorine makes up 56.8% of the polymer by mass" },
        { correct: false, label: "n = 2000, and chlorine makes up 35.5% of the polymer by mass" },
        { correct: false, label: "n = 1000, and chlorine makes up 56.8% of the polymer by mass" },
        { correct: false, label: "n = 2000, and the polymer decolourises bromine water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "n = 2000, dan klorin membentuk 56.8% jisim polimer" },
        { correct: false, label: "n = 2000, dan klorin membentuk 35.5% jisim polimer" },
        { correct: false, label: "n = 1000, dan klorin membentuk 56.8% jisim polimer" },
        { correct: false, label: "n = 2000, dan polimer itu menyahwarnakan air bromin" },
      ],
    },
  },
};

export default item;
