import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jumlah peminat basket meningkat pada setiap jenjang kelas",
        },
        {
          correct: false,
          label:
            "Peminat seni tari lebih sedikit daripada menyanyi di setiap kelas",
        },
        {
          correct: false,
          label: "Jumlah peminat melukis meningkat pada setiap jenjang kelas",
        },
        {
          correct: true,
          label:
            "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
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
