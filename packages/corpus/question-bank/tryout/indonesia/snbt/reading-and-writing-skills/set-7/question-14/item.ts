import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Data di kumpulkan di stasiun dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label: "Data dikumpulkan distasiun dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label: "Data mengumpulkan di stasiun dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label: "Data dikumpulkan pada di stasiun lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label: "Data dikumpulkan di stasiun dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
