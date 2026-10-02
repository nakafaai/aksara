import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas tanda genre di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas tanda genre dalam kontek pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
