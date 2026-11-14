import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "braille-signs",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "kegunaan atau peran ubin itu bagi penumpang" },
        { correct: false, label: "hubungan antara dua himpunan bilangan" },
        { correct: false, label: "harga pembelian ubin itu" },
        { correct: false, label: "warna dan bentuk ubin itu" },
        { correct: false, label: "jadwal pemasangan ubin itu" },
      ],
    },
  },
};

export default item;
