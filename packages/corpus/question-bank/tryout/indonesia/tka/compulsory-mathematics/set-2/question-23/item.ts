import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$75{,}3$$",
        },
        {
          isCorrect: false,
          label: "$$74{,}9$$",
        },
        {
          isCorrect: false,
          label: "$$75{,}1$$",
        },
        {
          isCorrect: false,
          label: "$$75{,}5$$",
        },
        {
          isCorrect: false,
          label: "$$75{,}7$$",
        },
      ],
    },
  },
  stimulusKey: "combined-class-scores",
};

export default item;
