import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tim akan memperpanjang uji label baki, mencakup berbagai kondisi pasang, dan mempertahankan aturan pengukuran.",
        },
        {
          correct: false,
          label:
            "Tim akan memperpanjang uji sambil mengubah aturan pengukuran.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang hanya hari dengan nilai kedatangan bibit tertinggi.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan label permanen sebagai pengganti uji lanjutan.",
        },
        {
          correct: false,
          label: "Tim akan memperpanjang uji hanya pada satu kondisi pasang.",
        },
      ],
    },
  },
};

export default item;
