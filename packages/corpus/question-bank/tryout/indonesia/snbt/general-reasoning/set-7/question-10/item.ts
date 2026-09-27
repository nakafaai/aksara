import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$890\\text{ kunjungan}$$",
        },
        {
          isCorrect: false,
          label: "$$760\\text{ kunjungan}$$",
        },
        {
          isCorrect: false,
          label: "$$960\\text{ kunjungan}$$",
        },
        {
          isCorrect: false,
          label: "$$1060\\text{ kunjungan}$$",
        },
        {
          isCorrect: false,
          label: "$$1160\\text{ kunjungan}$$",
        },
      ],
    },
  },
};

export default item;
