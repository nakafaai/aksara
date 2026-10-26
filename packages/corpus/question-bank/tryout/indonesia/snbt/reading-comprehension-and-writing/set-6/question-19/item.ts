import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          correct: false,
          label:
            "Tim merubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          correct: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          correct: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          correct: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
      ],
    },
  },
};

export default item;
