import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kegemaran basket adalah paling banyak diminati",
        },
        {
          isCorrect: false,
          label: "Jumlah siswa gemar seni peran adalah $$65$$ siswa",
        },
        {
          isCorrect: false,
          label:
            "Jumlah siswa kelas $$\\text{XII}$$ sesuai kegemaran adalah $$306$$",
        },
        {
          isCorrect: true,
          label: "Jumlah siswa gemar melukis adalah $$160$$",
        },
        {
          isCorrect: false,
          label:
            "Kegemaran seni tari yang paling sedikit ada di kelas $$\\text{X}$$",
        },
      ],
    },
  },
};

export default item;
