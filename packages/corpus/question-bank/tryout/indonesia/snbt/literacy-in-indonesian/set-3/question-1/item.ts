import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rancangannya kuat karena membandingkan dua kelompok pada periode yang sama, angka efikasinya lebih mungkin terlalu rendah, dan hasilnya belum tentu berlaku di kota lain.",
        },
        {
          correct: false,
          label:
            "Rancangannya kuat karena membandingkan dua kelompok pada periode yang sama, angka efikasinya lebih mungkin terlalu tinggi, dan hasilnya belum tentu berlaku di kota lain.",
        },
        {
          correct: false,
          label:
            "Rancangannya kuat karena menghitung jumlah kasus di setiap klaster, angka efikasinya lebih mungkin terlalu rendah, dan hasilnya belum tentu berlaku di kota lain.",
        },
        {
          correct: false,
          label:
            "Rancangannya kuat karena membandingkan dua kelompok pada periode yang sama, angka efikasinya lebih mungkin terlalu rendah, dan hasilnya membuktikan bahwa Wolbachia dapat menggantikan pemberantasan sarang.",
        },
        {
          correct: false,
          label:
            "Rancangannya kuat karena membandingkan kasus sebelum dan sesudah pelepasan, angka efikasinya lebih mungkin terlalu rendah, dan hasilnya belum tentu berlaku di kota lain.",
        },
      ],
    },
  },
};

export default item;
