import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Peminat bola basket meningkat pada setiap jenjang kelas",
        },
        {
          isCorrect: true,
          label:
            "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
        },
        {
          isCorrect: false,
          label:
            "Seni tari memiliki prospek paling baik karena peminatnya selalu meningkat",
        },
        {
          isCorrect: false,
          label:
            "Seni lukis memiliki prospek paling baik karena peminatnya selalu meningkat",
        },
        {
          isCorrect: false,
          label:
            "Di setiap jenjang kelas, menyanyi menjadi kegemaran yang paling sedikit peminatnya",
        },
      ],
    },
  },
};

export default item;
