import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bentuk Kapal pada Sarkofagus Tomok.",
        },
        {
          correct: false,
          label: "Tinggalan Megalitik di Sekitar Danau Toba.",
        },
        {
          correct: false,
          label: "Figur Pelindung pada Kubur Batak Toba.",
        },
        {
          correct: true,
          label: "Sarkofagus Tomok dalam Tradisi Megalitik Batak Toba.",
        },
        {
          correct: false,
          label: "Adat Penguburan di Pulau Samosir.",
        },
      ],
    },
  },
};

export default item;
