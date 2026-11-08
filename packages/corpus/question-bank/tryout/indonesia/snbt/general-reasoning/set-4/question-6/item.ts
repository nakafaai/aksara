import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "cabai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pasokan cabai pada minggu ke-$$5$$ turun tajam.",
        },
        {
          correct: false,
          label:
            "Pedagang menurunkan harga untuk menarik pembeli menjelang hari raya.",
        },
        {
          correct: false,
          label: "Harga pupuk turun pada minggu ke-$$5$$.",
        },
        {
          correct: false,
          label:
            "Cuaca pada minggu ke-$$5$$ cerah sehingga panen cabai di daerah pemasok berjalan lancar dan hasilnya langsung dikirim ke pasar induk.",
        },
        {
          correct: true,
          label:
            "Permintaan cabai meningkat tajam menjelang hari raya karena banyak rumah tangga memasak dalam jumlah besar.",
        },
      ],
    },
  },
};

export default item;
