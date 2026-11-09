import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "atap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harga cat putih reflektif dua kali lipat harga cat atap biasa.",
        },
        {
          correct: false,
          label:
            "Sebagian penghuni rumah yang tidak dicat juga jarang menyalakan kipas angin.",
        },
        {
          correct: false,
          label:
            "Sebelum pengecatan dilakukan, rata-rata suhu ruang utama di kedua kelompok rumah tercatat hampir sama, baik pada rumah berplafon maupun pada rumah tanpa plafon.",
        },
        {
          correct: false,
          label:
            "Pada hari cerah, selisih suhu antara kedua kelompok rumah lebih besar daripada pada hari berawan.",
        },
        {
          correct: true,
          label:
            "Tiga puluh dari $$40$$ rumah beratap putih ternyata berada di bawah naungan pohon besar, sedangkan hanya delapan dari $$40$$ rumah lainnya yang demikian.",
        },
      ],
    },
  },
};

export default item;
