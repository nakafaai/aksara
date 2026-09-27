import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Hipotermia hanya mengancam orang yang berada di pegunungan.",
        },
        {
          isCorrect: false,
          label:
            "Menggigil merupakan satu-satunya tanda hipotermia yang dapat dipercaya.",
        },
        {
          isCorrect: true,
          label:
            "Hipotermia merupakan keadaan darurat medis yang memerlukan tindakan cepat dan aman.",
        },
        {
          isCorrect: false,
          label:
            "Panas langsung merupakan cara terbaik untuk menangani hipotermia.",
        },
        {
          isCorrect: false,
          label: "Orang yang masih sadar tidak memerlukan pertolongan medis.",
        },
      ],
    },
  },
};

export default item;
