import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan diruang latihan musik dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di ruang latihan musik dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di ruang latihan musik lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
