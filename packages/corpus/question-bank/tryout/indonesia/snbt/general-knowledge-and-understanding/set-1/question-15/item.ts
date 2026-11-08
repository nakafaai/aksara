import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "bahasa",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Menurut bacaan, jumlah penutur yang sedikit selalu menjadi tanda utama bahwa sebuah bahasa terancam punah.",
        },
        {
          column: 1,
          label: "Kamus membantu merekam kosakata bahasa daerah.",
        },
        {
          column: 1,
          label:
            "Di kelas mendongeng, bahasa daerah dipakai dalam kegiatan seperti bernyanyi dan bercanda.",
        },
        {
          column: 2,
          label:
            "Penulis berpendapat bahwa penyusunan kamus tidak bermanfaat bagi upaya revitalisasi bahasa.",
        },
      ],
    },
  },
};

export default item;
