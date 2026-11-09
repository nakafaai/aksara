import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "tempe",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Ragi tempe mengandung spora kapang.",
        },
        {
          column: 2,
          label:
            "Kedelai dibungkus rapat tanpa celah agar kapang tidak terkena udara.",
        },
        {
          column: 1,
          label:
            "Benang-benang kapang membuat biji kedelai menyatu menjadi bongkahan.",
        },
        {
          column: 2,
          label: "Bercak hitam pada tempe menandakan tempe baru setengah jadi.",
        },
      ],
    },
  },
};

export default item;
