import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Program A dan program C memberi hasil yang sama jika dinyatakan dalam banyak orang yang selamat.",
        },
        {
          column: 1,
          label:
            "Di kelompok pertama, sebagian besar peserta memilih program yang hasilnya pasti.",
        },
        {
          column: 2,
          label:
            "Di kelompok kedua, sebagian besar peserta memilih program yang hasilnya pasti.",
        },
        {
          column: 1,
          label:
            "Secara rata-rata, program B menyelamatkan orang sebanyak program A.",
        },
        {
          column: 2,
          label:
            "Percobaan itu menunjukkan bahwa para mahasiswa tidak dapat menghitung peluang dengan benar.",
        },
      ],
    },
  },
};

export default item;
