import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "market-survey",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada setiap kelompok usia persentase pemilih QRIS di Pasar X lebih tinggi daripada di Pasar Y, tetapi secara keseluruhan persentase pemilih QRIS di Pasar Y lebih tinggi.",
        },
        {
          column: 2,
          label:
            "Hasil survei ini membuktikan bahwa berbelanja di Pasar Y membuat pembeli lebih memilih QRIS.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh responden yang memilih tunai berasal dari Pasar X.",
        },
        {
          column: 1,
          label:
            "Jika semua responden berusia di bawah $$30\\text{ tahun}$$ di Pasar X memilih QRIS, persentase keseluruhan pemilih QRIS di Pasar X tetap kurang dari $$45\\%$$.",
        },
      ],
    },
  },
};

export default item;
