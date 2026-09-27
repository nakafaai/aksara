import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pencatat memakai contoh foto karena deskripsi lama telah terbukti tidak berguna dalam semua keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto diterapkan secara permanen dan deskripsi lama tidak dipakai lagi.",
        },
        {
          isCorrect: false,
          label:
            "Pencatat memakai foto dan deskripsi lama tanpa memisahkan kondisi uji dan pembanding.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, pencatat memakai contoh foto tambahan, sedangkan pada sesi pembanding mereka hanya memakai deskripsi tertulis lama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan sesi yang memakai contoh foto hanya dengan komentar tentang deskripsi lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
