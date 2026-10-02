import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di lingkungan warga dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan dilingkungan warga dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di lingkungan warga dan kemudian membandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di lingkungan warga dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di lingkungan warga lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
