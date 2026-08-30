import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It was useless because it did not name every passenger.",
        },
        {
          isCorrect: false,
          label: "It proved the printed timetable was always false.",
        },
        {
          isCorrect: false,
          label: "It guaranteed the hospital shuttle's arrival time.",
        },
        {
          isCorrect: false,
          label: "It made calling the clinic unsafe.",
        },
        {
          isCorrect: true,
          label:
            "It was useful for the road closure, but incomplete about Niko's mother's exact situation.",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
