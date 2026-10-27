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
          correct: false,
          label: "Jumlah siswa gemar seni peran adalah $$65$$ siswa",
        },
        {
          correct: false,
          label:
            "Jumlah siswa kelas $$\\text{XII}$$ sesuai kegemaran adalah $$306$$",
        },
        {
          correct: true,
          label: "Jumlah siswa gemar melukis adalah $$160$$",
        },
        {
          correct: false,
          label:
            "Kegemaran seni tari yang paling sedikit ada di kelas $$\\text{X}$$",
        },
      ],
    },
  },
};

export default item;
