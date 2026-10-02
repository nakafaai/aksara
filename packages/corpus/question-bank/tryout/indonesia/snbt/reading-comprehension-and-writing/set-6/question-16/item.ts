import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat sebagai relawan yang mencatat kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: true,
          label: "Relawan pencatatan kebisingan memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
