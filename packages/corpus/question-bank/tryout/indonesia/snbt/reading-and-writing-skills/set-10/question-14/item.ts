import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di pusat informasi taman kota dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan dipusat informasi taman kota dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di pusat informasi taman kota dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di pusat informasi taman kota lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di pusat informasi taman kota dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
