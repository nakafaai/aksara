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
          label: "$$3{,}465\\text{ kg}$$",
        },
        {
          isCorrect: false,
          label: "$$38{,}5\\text{ kg}$$",
        },
        {
          isCorrect: false,
          label: "$$138{,}6\\text{ kg}$$",
        },
        {
          isCorrect: true,
          label: "$$346{,}5\\text{ kg}$$",
        },
        {
          isCorrect: false,
          label: "$$962{,}5\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
