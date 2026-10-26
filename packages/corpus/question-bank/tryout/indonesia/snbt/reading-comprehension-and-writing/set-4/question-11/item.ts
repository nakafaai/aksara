import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "analisa efektivitas tanda genre di pasar tukar buku",
        },
        {
          correct: true,
          label: "analisis efektivitas tanda genre di pasar tukar buku",
        },
        {
          correct: false,
          label: "analisis efektifitas tanda genre di pasar tukar buku",
        },
        {
          correct: false,
          label: "analisa efektifitas tanda genre di pasar tukar buku",
        },
        {
          correct: false,
          label:
            "analisis efektivitas tanda genre dalam kontek pasar tukar buku",
        },
      ],
    },
  },
};

export default item;
