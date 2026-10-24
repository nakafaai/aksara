import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}44\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}88\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}2\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$3{,}52\\text{ m}^2$$",
        },
        {
          isCorrect: true,
          label: "$$1{,}76\\text{ m}^2$$",
        },
      ],
    },
  },
  stimulusKey: "culvert",
};

export default item;
