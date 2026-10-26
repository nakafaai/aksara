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
            "Panah dipasang karena rute lama terbukti tidak berguna dalam semua keadaan.",
        },
        {
          correct: false,
          label:
            "Panah diterapkan permanen dan kondisi tanpa panah tidak digunakan lagi.",
        },
        {
          correct: false,
          label:
            "Panah dan kondisi tanpa panah diuji tanpa memisahkan kelompok sesi pembanding.",
        },
        {
          correct: false,
          label:
            "Sesi dengan panah hanya dibandingkan dengan komentar tentang rute lama.",
        },
        {
          correct: true,
          label:
            "Pada sesi uji, panah dipasang di setiap persimpangan, sedangkan sesi pembanding berlangsung tanpa panah tambahan.",
        },
      ],
    },
  },
};

export default item;
