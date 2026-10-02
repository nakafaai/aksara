import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Panah dipasang karena rute lama terbukti tidak berguna dalam semua keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Panah diterapkan permanen dan kondisi tanpa panah tidak digunakan lagi.",
        },
        {
          isCorrect: false,
          label:
            "Panah dan kondisi tanpa panah diuji tanpa memisahkan kelompok sesi pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Sesi dengan panah hanya dibandingkan dengan komentar tentang rute lama.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, panah dipasang di setiap persimpangan, sedangkan sesi pembanding berlangsung tanpa panah tambahan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
