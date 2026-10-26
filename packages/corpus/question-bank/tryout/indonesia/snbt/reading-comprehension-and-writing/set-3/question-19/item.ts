import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim merubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          correct: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          correct: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          correct: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          correct: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
