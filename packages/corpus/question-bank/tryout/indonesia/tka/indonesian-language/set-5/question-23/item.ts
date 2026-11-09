import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "turtle-nest",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "*Embrio* berarti calon makhluk hidup yang sedang berkembang di dalam telur.",
        },
        {
          correct: false,
          label: "*Area* berarti waktu yang dibutuhkan telur untuk menetas.",
        },
        {
          correct: true,
          label: "*Termometer* berarti alat untuk mengukur suhu.",
        },
        {
          correct: true,
          label:
            "*Patroli* berarti kegiatan berkeliling untuk mengawasi atau mencari sesuatu.",
        },
      ],
    },
  },
};

export default item;
