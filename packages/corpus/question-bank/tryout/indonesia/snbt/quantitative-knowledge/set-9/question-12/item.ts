import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$25{,}0\\%$$",
        },
        {
          isCorrect: false,
          label: "$$37{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$50{,}0\\%$$",
        },
        {
          isCorrect: true,
          label: "$$66{,}7\\%$$",
        },
        {
          isCorrect: false,
          label: "$$62{,}5\\%$$",
        },
      ],
    },
  },
};

export default item;
