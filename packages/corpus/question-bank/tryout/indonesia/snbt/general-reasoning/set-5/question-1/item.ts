import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "rumpon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rumpon menambah jumlah ikan yang hidup di perairan kabupaten itu.",
        },
        {
          correct: false,
          label:
            "Semua ikan yang tertangkap di sekitar rumpon berukuran lebih kecil daripada ikan dari perairan lain.",
        },
        {
          correct: false,
          label:
            "Perahu yang menangkap ikan di sekitar rumpon menghabiskan bahan bakar lebih sedikit daripada perahu lain.",
        },
        {
          correct: true,
          label:
            "Rumpon lebih banyak memindahkan tempat ikan berkumpul daripada menambah ikan yang dapat ditangkap.",
        },
        {
          correct: false,
          label:
            "Memasang rumpon di lebih banyak titik akan melipatgandakan hasil tangkapan seluruh nelayan kabupaten.",
        },
      ],
    },
  },
};

export default item;
