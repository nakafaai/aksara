import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pencatat memakai contoh foto karena deskripsi lama telah terbukti tidak berguna dalam semua keadaan.",
        },
        {
          correct: false,
          label:
            "Contoh foto diterapkan secara permanen dan deskripsi lama tidak dipakai lagi.",
        },
        {
          correct: false,
          label:
            "Pencatat memakai foto dan deskripsi lama tanpa memisahkan kondisi uji dan pembanding.",
        },
        {
          correct: true,
          label:
            "Pada sesi uji, pencatat memakai contoh foto tambahan, sedangkan pada sesi pembanding mereka hanya memakai deskripsi tertulis lama.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan sesi yang memakai contoh foto hanya dengan komentar tentang deskripsi lama.",
        },
      ],
    },
  },
};

export default item;
