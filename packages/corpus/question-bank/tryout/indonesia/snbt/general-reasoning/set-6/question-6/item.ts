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
          isCorrect: true,
          label: "Jumlah siswa gemar melukis adalah $$160$$",
        },
        {
          isCorrect: false,
          label: "Jumlah siswa gemar seni peran adalah $$65$$ siswa",
        },
        {
          isCorrect: false,
          label: "Jumlah siswa kelas XII sesuai kegemaran adalah $$306$$",
        },
        {
          isCorrect: false,
          label:
            "Di antara ketiga jenjang, kelas X memiliki peminat seni tari paling sedikit",
        },
      ],
    },
  },
};

export default item;
