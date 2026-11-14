import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "tambak",
  versions: {
    id: {
      columns: ["Dapat disimpulkan", "Tidak dapat disimpulkan"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada siklus lalu, ketika belum ada kincir, rata-rata kematian seluruh petak yang kemudian dipasangi kincir lebih tinggi daripada rata-rata kematian seluruh petak yang tetap tanpa kincir.",
        },
        {
          column: 2,
          label:
            "Seandainya kelima petak tanpa kincir berpadat tebar tinggi juga dipasangi kincir pada siklus terakhir, rata-rata kematiannya akan berada di bawah $$40\\%$$.",
        },
        {
          column: 2,
          label:
            "Kenaikan rata-rata kematian petak berpadat tebar rendah dari siklus lalu ke siklus terakhir disebabkan oleh musim kemarau.",
        },
        {
          column: 1,
          label:
            "Di antara keempat kelompok petak pada tabel, hanya kelompok tanpa kincir berpadat tebar tinggi yang kenaikan rata-rata kematiannya lebih dari dua kali kenaikan rata-rata kematian kelompok berpadat tebar rendah.",
        },
      ],
    },
  },
};

export default item;
