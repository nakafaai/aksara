import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "asal mula virus corona.",
        },
        {
          isCorrect: false,
          label:
            "cacar merupakan penyakit yang berbahaya dibandingkan virus corona.",
        },
        {
          isCorrect: true,
          label:
            "penelitian DNA purba tentang sejarah dan evolusi virus variola.",
        },
        {
          isCorrect: false,
          label: "penyebab hilangnya orang Viking.",
        },
        {
          isCorrect: false,
          label: "penyebab punahnya cacar purba.",
        },
      ],
    },
  },
};

export default item;
