import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "inference",
  },
  stimulus: "garam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lapisan luar yang sudah asin tidak menjamin bahwa garam sudah sampai ke bagian tengah daging.",
        },
        {
          correct: false,
          label:
            "Makin jauh bagian tengah daging dari permukaan, makin lama garam sampai ke sana.",
        },
        {
          correct: false,
          label:
            "Membelah ikan besar membuat garam lebih cepat mencapai seluruh bagian daging.",
        },
        {
          correct: true,
          label:
            "Bagian tengah ikan tebal dapat membusuk karena garam bergerak lebih lambat di dalam daging ikan besar daripada di dalam daging ikan kecil.",
        },
        {
          correct: false,
          label:
            "Penggaraman yang dilakukan dengan benar pun belum tentu berhasil jika waktunya tidak cukup.",
        },
      ],
    },
  },
};

export default item;
