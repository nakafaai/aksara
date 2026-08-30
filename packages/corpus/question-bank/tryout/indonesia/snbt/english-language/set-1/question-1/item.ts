import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the rapid growth of internet access worldwide.",
        },
        {
          isCorrect: false,
          label: "the replacement of teachers by digital tools.",
        },
        {
          isCorrect: true,
          label: "the conditions under which technology can support education.",
        },
        {
          isCorrect: false,
          label: "the superiority of online learning over classrooms.",
        },
        {
          isCorrect: false,
          label: "the features of one educational device.",
        },
      ],
    },
  },
};

export default item;
