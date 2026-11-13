import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "rate-comparison",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Tangki pertama kali penuh sebelum menit ke-$$70$$.",
        },
        {
          column: 2,
          label:
            "Selama $$30$$ menit pertama, volume air bertambah rata-rata lebih dari $$12$$ liter per menit.",
        },
        {
          column: 2,
          label:
            "Jika pompa B ikut berhenti setiap kali pompa A beristirahat, tangki pertama kali penuh pada menit yang sama.",
        },
        {
          column: 1,
          label:
            "Volume air pada menit ke-$$40$$ lebih besar daripada volume air pada menit ke-$$45$$.",
        },
      ],
    },
  },
};

export default item;
