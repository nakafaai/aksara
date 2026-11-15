import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "school-meals",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan hampir enam poin itu terlalu kecil untuk dianggap berarti, karena sekolah lain pun naik satu poin pada semester yang sama tanpa program apa pun.",
        },
        {
          correct: false,
          label:
            "Kenaikan hampir enam poin itu dihitung dengan rata-rata biasa keempat sekolah, padahal seharusnya memakai bobot banyak siswa di setiap sekolah.",
        },
        {
          correct: false,
          label:
            "Biaya makan siang di $$40$$ sekolah terlalu mahal untuk anggaran kabupaten, sehingga perkiraan itu tidak realistis untuk dijalankan.",
        },
        {
          correct: true,
          label:
            "Sekolah uji coba dipilih karena kehadirannya terendah, padahal sekolah lain sudah hadir $$93\\%$$, dan kenaikannya belum terpisah dari rute angkutan.",
        },
        {
          correct: false,
          label:
            "Sekolah uji coba dipilih secara acak dari $$40$$ sekolah, sehingga hasilnya hanya berlaku untuk sekolah yang kebetulan terpilih.",
        },
      ],
    },
  },
};

export default item;
