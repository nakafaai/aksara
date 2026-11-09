import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua kelompok selalu mempunyai tujuan yang sama",
        },
        {
          correct: false,
          label: "Perang tidak pernah menghasilkan perubahan politik",
        },
        {
          correct: false,
          label: "Kelompok yang bertikai selalu memiliki informasi lengkap",
        },
        {
          correct: true,
          label:
            "Biaya perang memberi kedua pihak dorongan kuat untuk mencari kesepakatan",
        },
        {
          correct: false,
          label: "Lembaga internasional menyelesaikan setiap perselisihan",
        },
      ],
    },
  },
};

export default item;
