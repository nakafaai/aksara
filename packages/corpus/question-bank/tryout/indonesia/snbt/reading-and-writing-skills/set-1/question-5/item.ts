import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bentuk Kapal pada Sarkofagus Tomok.",
        },
        {
          isCorrect: false,
          label: "Tinggalan Megalitik di Sekitar Danau Toba.",
        },
        {
          isCorrect: false,
          label: "Figur Pelindung pada Kubur Batak Toba.",
        },
        {
          isCorrect: true,
          label: "Sarkofagus Tomok dalam Tradisi Megalitik Batak Toba.",
        },
        {
          isCorrect: false,
          label: "Adat Penguburan di Pulau Samosir.",
        },
      ],
    },
  },
};

export default item;
