import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "conflict",
  },
  stimulus: "waste-meeting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "cara menangani sampah yang menumpuk sambil menunggu truk",
        },
        {
          correct: false,
          label: "jadwal ronda malam yang tidak disepakati oleh para warga",
        },
        {
          correct: false,
          label: "siapa yang harus menggantikan Pak Karto sebagai ketua RT",
        },
        {
          correct: false,
          label: "harga ember kompos yang dianggap terlalu mahal oleh warga",
        },
        {
          correct: false,
          label: "kemungkinan Dina pindah ke sekolah lain yang lebih jauh",
        },
      ],
    },
  },
};

export default item;
