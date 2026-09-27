import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$82{,}5\\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$97{,}5\\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$95{,}0\\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$87{,}5\\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$85{,}0\\text{ km/jam}$$",
        },
      ],
    },
  },
};

export default item;
