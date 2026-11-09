import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "bank-queue",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rata-rata waktu tunggu lebih besar daripada median waktu tunggu.",
        },
        {
          correct: false,
          label: "Rata-rata waktu tunggu adalah $$7$$ menit.",
        },
        {
          correct: false,
          label: "Lebih dari separuh nasabah menunggu lebih dari $$8$$ menit.",
        },
        {
          correct: true,
          label: "Modus waktu tunggu adalah $$5$$ menit.",
        },
        {
          correct: true,
          label: "Jangkauan waktu tunggu adalah $$31$$ menit.",
        },
      ],
    },
  },
};

export default item;
