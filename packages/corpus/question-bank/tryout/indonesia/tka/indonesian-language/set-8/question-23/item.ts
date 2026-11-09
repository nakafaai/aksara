import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "electric-bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Rute* berarti harga tiket bus dari terminal ke kawasan industri.",
        },
        {
          correct: true,
          label:
            "*Baterai* berarti alat penyimpan listrik yang perlu diganti setelah beberapa tahun.",
        },
        {
          correct: false,
          label: "*Halte* berarti bengkel tempat bus listrik diperbaiki.",
        },
        {
          correct: true,
          label:
            "*Terminal* berarti tempat bus berangkat dan mengisi daya setiap malam.",
        },
      ],
    },
  },
};

export default item;
