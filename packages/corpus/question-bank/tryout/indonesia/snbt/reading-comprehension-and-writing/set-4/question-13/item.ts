import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "text-structure",
  },
  stimulus: "rain-gauge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "masalah, dugaan penyebab, cara menguji, temuan, lalu usulan",
        },
        {
          correct: false,
          label: "usulan, alasan usulan, lalu contoh pelaksanaan",
        },
        {
          correct: false,
          label: "temuan, masalah, lalu usulan",
        },
        {
          correct: false,
          label: "dugaan penyebab, temuan, lalu masalah",
        },
        {
          correct: false,
          label: "masalah, usulan, lalu dugaan penyebab",
        },
      ],
    },
  },
};

export default item;
