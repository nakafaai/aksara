import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "PSBB mulai diberlakukan di DKI Jakarta pada 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "Pemerintah DKI Jakarta mulai memberlakukan PSBB pada 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "PSBB diumumkan oleh Pemerintah DKI Jakarta pada 10 April 2020.",
        },
        {
          isCorrect: false,
          label: "Pada 10 April 2020, aturan PSBB diumumkan di DKI Jakarta.",
        },
        {
          isCorrect: false,
          label: "Warga DKI Jakarta mulai mengikuti PSBB pada 10 April 2020.",
        },
      ],
    },
  },
};

export default item;
