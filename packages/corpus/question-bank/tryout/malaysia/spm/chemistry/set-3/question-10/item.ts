import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "240 cm³ of hydrogen and a solution of pH 13",
        },
        {
          correct: true,
          label:
            "120 cm³ of hydrogen and a solution of pH 13, and the same mass of potassium would react more vigorously but give less hydrogen",
        },
        { correct: false, label: "120 cm³ of hydrogen and a solution of pH 1" },
        {
          correct: false,
          label:
            "120 cm³ of hydrogen and a solution of pH 13, and the same mass of potassium would give more hydrogen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "240 cm³ hidrogen dan larutan pH 13" },
        {
          correct: true,
          label:
            "120 cm³ hidrogen dan larutan pH 13, dan jisim kalium yang sama akan bertindak balas lebih cergas tetapi menghasilkan kurang hidrogen",
        },
        { correct: false, label: "120 cm³ hidrogen dan larutan pH 1" },
        {
          correct: false,
          label:
            "120 cm³ hidrogen dan larutan pH 13, dan jisim kalium yang sama akan menghasilkan lebih banyak hidrogen",
        },
      ],
    },
  },
};

export default item;
