import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim akan memperpanjang uji label baki, mencakup berbagai kondisi pasang, dan mempertahankan aturan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji sambil mengubah aturan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya hari dengan nilai kedatangan bibit tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan label permanen sebagai pengganti uji lanjutan.",
        },
        {
          isCorrect: false,
          label: "Tim akan memperpanjang uji hanya pada satu kondisi pasang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
