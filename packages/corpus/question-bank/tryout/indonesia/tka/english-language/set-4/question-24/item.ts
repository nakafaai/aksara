import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "homework-cap",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Many students at the school are too tired.",
        },
        {
          correct: true,
          label: "Homework is part of the reason students are tired.",
        },
        {
          correct: false,
          label:
            "Students spend an average of $$2.1$$ hours a day on homework set by teachers.",
        },
        {
          correct: false,
          label: "A cap of $$60$$ minutes a day would solve the problem.",
        },
        {
          correct: false,
          label: "Teachers often misjudge how long their tasks take.",
        },
      ],
    },
  },
};

export default item;
