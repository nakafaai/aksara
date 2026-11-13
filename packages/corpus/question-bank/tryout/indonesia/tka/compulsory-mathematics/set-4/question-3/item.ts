import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "emas",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Setiap nasabah yang membeli emas pada bulan Februari, lalu menjual seluruh emas itu pada bulan Mei dalam satu transaksi, pasti untung.",
        },
        {
          column: 1,
          label: "Sari membeli emas senilai $$\\text{Rp}2{.}500{.}000$$ pada Januari dan $$\\text{Rp}2{.}400{.}000$$ pada Februari. Jika Sari menjual seluruh emasnya dalam satu transaksi, bulan pertama dari Maret sampai Mei yang membuat Sari tidak rugi adalah Mei.",
        },
        {
          column: 1,
          label: "Untuk berat berapa pun yang dijual dalam satu transaksi, persentase kenaikan uang yang diterima jika dijual pada Mei dibandingkan jika dijual pada April lebih besar daripada persentase kenaikan harga buyback dari April ke Mei.",
        },
      ],
    },
  },
};

export default item;
