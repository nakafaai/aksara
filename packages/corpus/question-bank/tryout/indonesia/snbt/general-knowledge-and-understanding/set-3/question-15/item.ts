import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "bunga",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Pada bunga tunggal, bunga dihitung dari saldo terbaru.",
        },
        {
          column: 1,
          label:
            "Bunga yang tidak dibayar dapat membuat utang kartu kredit bertambah cepat.",
        },
        {
          column: 2,
          label:
            "Selisih hasil bunga tunggal dan bunga majemuk sudah sangat besar sejak tahun pertama.",
        },
        {
          column: 1,
          label:
            "Menabung lebih awal memberi waktu lebih panjang bagi bunga untuk berlipat.",
        },
      ],
    },
  },
};

export default item;
