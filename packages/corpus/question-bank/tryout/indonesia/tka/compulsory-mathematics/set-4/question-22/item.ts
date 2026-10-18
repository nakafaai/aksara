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
          isCorrect: false,
          label: "$$25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$31{,}25\\%$$",
        },
        {
          isCorrect: true,
          label: "$$35\\%$$",
        },
        {
          isCorrect: false,
          label: "$$42{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$50\\%$$",
        },
      ],
    },
  },
  stimulusKey: "club-choices",
};

export default item;
