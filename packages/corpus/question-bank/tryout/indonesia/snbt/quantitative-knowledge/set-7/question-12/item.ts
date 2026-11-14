import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika nilai seorang siswa yang tercatat $$9$$ ternyata seharusnya $$5$$, rata-rata turun $$0{,}2$$ dan median tidak berubah.",
        },
        {
          column: 2,
          label:
            "Ada nilai bulat untuk seorang siswa tambahan yang membuat median menjadi $$6{,}5$$.",
        },
        {
          column: 2,
          label:
            "Jika dua siswa baru yang masing-masing bernilai $$6$$ bergabung, modus dan median data itu keduanya berubah.",
        },
        {
          column: 2,
          label:
            "Jika $$k$$ siswa baru yang masing-masing bernilai $$8$$ bergabung, median tetap $$7$$ hanya untuk $$k\\le6$$.",
        },
      ],
    },
  },
};

export default item;
