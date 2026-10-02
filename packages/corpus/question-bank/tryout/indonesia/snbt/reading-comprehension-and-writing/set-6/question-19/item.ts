import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
