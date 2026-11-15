import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "science-language",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika separuh dari $$400$$ artikel itu berbahasa Inggris, rata-rata sitasi seluruh artikel dalam lima tahun adalah $$7{,}5$$ kali.",
        },
        {
          column: 2,
          label:
            "Data Teks A menunjukkan bahwa jika seorang dosen menerjemahkan artikel berbahasa Indonesianya ke bahasa Inggris, sitasinya akan menjadi empat kali.",
        },
        {
          column: 2,
          label:
            "Data Teks A cukup untuk menghitung jumlah seluruh sitasi ke-$$400$$ artikel itu dalam lima tahun.",
        },
        {
          column: 1,
          label:
            "Menurut rata-rata dalam Teks A, empat artikel berbahasa Indonesia bersama-sama dikutip sama banyak dengan satu artikel berbahasa Inggris.",
        },
        {
          column: 2,
          label:
            "Teks B memakai undang-undang untuk menunjukkan bahwa artikel berbahasa Indonesia lebih banyak dibaca.",
        },
      ],
    },
  },
};

export default item;
