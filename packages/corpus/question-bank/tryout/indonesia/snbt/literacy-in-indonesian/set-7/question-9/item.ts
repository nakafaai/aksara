import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "tone-attitude",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            'Dari kekaguman kanak-kanak pada kemampuan ayah membaca laut menjadi kesadaran bahwa ia sendiri belum mampu membaca "pasang" hidupnya, ditandai jawaban ayah di telepon.',
        },
        {
          correct: false,
          label:
            "Dari kekaguman pada ayah menjadi kekecewaan karena ayah tidak lagi melaut, ditandai baris tentang lutut ayah yang berkarat.",
        },
        {
          correct: false,
          label:
            "Dari kebosanan pada jadwal pasang menjadi kerinduan pada kampung, ditandai jam ponsel yang tepat sampai detik.",
        },
        {
          correct: false,
          label:
            'Dari kekaguman pada ayah menjadi keraguan pada nasihatnya, ditandai jawaban aku, "tidak ada laut di sini, Yah".',
        },
        {
          correct: false,
          label:
            "Sikap aku tidak berkembang sama sekali, karena sejak awal ia sudah memahami arti pasang dalam hidupnya.",
        },
      ],
    },
  },
};

export default item;
