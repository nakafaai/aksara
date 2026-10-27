import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "PSBB mulai diberlakukan di DKI Jakarta pada 10 April 2020.",
        },
        {
          correct: false,
          label:
            "Pemerintah DKI Jakarta mulai memberlakukan PSBB pada 10 April 2020.",
        },
        {
          correct: false,
          label:
            "PSBB diumumkan oleh Pemerintah DKI Jakarta pada 10 April 2020.",
        },
        {
          correct: false,
          label: "Pada 10 April 2020, aturan PSBB diumumkan di DKI Jakarta.",
        },
        {
          correct: false,
          label: "Warga DKI Jakarta mulai mengikuti PSBB pada 10 April 2020.",
        },
      ],
    },
  },
};

export default item;
