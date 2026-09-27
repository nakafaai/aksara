import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jumlah peminat basket meningkat pada setiap jenjang kelas",
        },
        {
          isCorrect: false,
          label:
            "Peminat seni tari lebih sedikit daripada menyanyi di setiap kelas",
        },
        {
          isCorrect: false,
          label: "Jumlah peminat melukis meningkat pada setiap jenjang kelas",
        },
        {
          isCorrect: true,
          label:
            "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
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
