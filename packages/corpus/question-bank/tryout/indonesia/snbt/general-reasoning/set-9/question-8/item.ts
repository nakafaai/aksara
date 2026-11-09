import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "kolam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "anak-anak di Kota Tepian akan memanfaatkan kolam renang umum yang dibangun",
        },
        {
          correct: false,
          label: "semua anak di Kota Tepian sudah pandai berenang sejak kecil",
        },
        {
          correct: false,
          label:
            "kolam renang umum yang dibangun harus dapat dipakai tanpa membayar",
        },
        {
          correct: false,
          label:
            "semua sungai di Kota Tepian akan dipagari setelah kolam renang umum selesai dibangun",
        },
        {
          correct: false,
          label: "kasus tenggelam di sungai hanya pernah menimpa anak-anak",
        },
      ],
    },
  },
};

export default item;
