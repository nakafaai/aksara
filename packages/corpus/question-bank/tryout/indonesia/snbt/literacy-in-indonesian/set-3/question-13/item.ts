import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "plot-function",
  },
  stimulus: "last-angkot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menyiratkan bahwa kebaikan Pak Damar dapat berbenturan dengan aturan bus yang ketat.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa Pak Damar akan segera dipromosikan menjadi kepala pengemudi.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa petugas itu ikut membantu mengangkat keranjang penumpang.",
        },
        {
          correct: false,
          label:
            "Menegaskan bahwa Mak Inah adalah penumpang yang terdaftar resmi di bus koridor.",
        },
        {
          correct: false,
          label:
            "Menandakan bahwa bus koridor akan ditutup seperti trayek angkot 07.",
        },
      ],
    },
  },
};

export default item;
