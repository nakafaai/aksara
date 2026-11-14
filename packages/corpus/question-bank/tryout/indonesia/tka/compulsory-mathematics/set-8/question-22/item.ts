import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "ogif",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Taksiran median lama membaca adalah $$35$$ menit.",
        },
        {
          correct: true,
          label: "Taksiran kuartil bawah lama membaca adalah $$25$$ menit.",
        },
        {
          correct: true,
          label:
            "Taksiran jangkauan antarkuartil lama membaca adalah $$20$$ menit.",
        },
        {
          correct: true,
          label:
            "Taksiran rata-rata lama membaca lebih besar daripada taksiran mediannya.",
        },
        {
          correct: false,
          label:
            "Taksiran persentil ke-$$80$$ lama membaca adalah $$50$$ menit.",
        },
      ],
    },
  },
};

export default item;
