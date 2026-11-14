import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "naungan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Baik di lereng landai maupun di lereng curam, rata-rata hasil kebun tanpa naungan lebih tinggi daripada rata-rata hasil kebun bernaungan.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil seluruh kebun bernaungan adalah $$850$$ kilogram per hektare, sehingga lebih tinggi daripada rata-rata hasil seluruh kebun tanpa naungan.",
        },
        {
          correct: false,
          label:
            "Pohon naungan menaikkan hasil setiap kebun kopi sebanyak $$100$$ kilogram per hektare, di lereng mana pun kebun itu berada.",
        },
        {
          correct: true,
          label:
            "Seandainya kebun bernaungan juga terdiri atas $$40$$ kebun di lereng landai dan $$10$$ kebun di lereng curam, dengan rata-rata tiap kelompok tetap, rata-rata hasilnya akan melampaui rata-rata kebun tanpa naungan.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil kebun di lereng curam lebih rendah daripada di lereng landai karena sebagian besar kebun di lereng curam ditanami pohon naungan.",
        },
      ],
    },
  },
};

export default item;
