import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
