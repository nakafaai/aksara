import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "plastic-levy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "berat total plastik dari kantong tipis dan kantong sampah sebelum dan sesudah cukai",
        },
        {
          correct: false,
          label:
            "jumlah pengelola supermarket yang menyatakan setuju dengan cukai kantong plastik",
        },
        {
          correct: true,
          label:
            "jumlah kantong plastik di pasar tradisional sebelum dan sesudah cukai",
        },
        {
          correct: false,
          label:
            "harga tas belanja kain di supermarket Bandar Selatan pada 2023",
        },
        {
          correct: true,
          label: "data pemakaian kantong selama beberapa tahun sesudah 2023",
        },
      ],
    },
  },
};

export default item;
