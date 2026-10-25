import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2{,}1\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$3{,}1\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$4{,}5\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$4{,}6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$7{,}9\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
