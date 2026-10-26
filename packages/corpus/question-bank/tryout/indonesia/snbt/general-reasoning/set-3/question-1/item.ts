import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Peminat bola basket meningkat pada setiap jenjang kelas",
        },
        {
          correct: true,
          label:
            "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
        },
        {
          correct: false,
          label:
            "Seni tari memiliki prospek paling baik karena peminatnya selalu meningkat",
        },
        {
          correct: false,
          label:
            "Seni lukis memiliki prospek paling baik karena peminatnya selalu meningkat",
        },
        {
          correct: false,
          label:
            "Di setiap jenjang kelas, menyanyi menjadi kegemaran yang paling sedikit peminatnya",
        },
      ],
    },
  },
};

export default item;
