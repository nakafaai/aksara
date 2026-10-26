import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kegemaran basket adalah paling banyak diminati",
        },
        {
          correct: true,
          label: "Jumlah siswa gemar melukis adalah $$160$$",
        },
        {
          correct: false,
          label: "Jumlah siswa gemar seni peran adalah $$65$$ siswa",
        },
        {
          correct: false,
          label: "Jumlah siswa kelas XII sesuai kegemaran adalah $$306$$",
        },
        {
          correct: false,
          label:
            "Di antara ketiga jenjang, kelas X memiliki peminat seni tari paling sedikit",
        },
      ],
    },
  },
};

export default item;
