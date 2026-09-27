import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "perlunya peringatan dini bencana guna pengurangan risiko.",
        },
        {
          isCorrect: true,
          label: "investasi pembangunan sebagai elemen mitigasi bencana.",
        },
        {
          isCorrect: false,
          label: "perlunya pengawasan ketat terhadap kontraktor bangunan.",
        },
        {
          isCorrect: false,
          label: "banyaknya bangunan yang berada di daerah rawan bencana.",
        },
        {
          isCorrect: false,
          label: "investasi pembangunan dalam kerentanan kemanusiaan.",
        },
      ],
    },
  },
};

export default item;
