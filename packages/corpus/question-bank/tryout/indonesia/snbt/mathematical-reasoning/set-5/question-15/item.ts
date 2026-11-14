import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "download-quota",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika sisa kuota utama $$5\\text{ GB}$$ dan tidak ada Booster, berkas $$15\\text{ GB}$$ yang mulai diunduh pukul 00.00 selesai lebih dari $$2$$ jam lebih cepat daripada jika mulai diunduh pukul 13.00.",
        },
        {
          column: 2,
          label:
            "Berkas $$120\\text{ GB}$$ yang mulai diunduh pukul 00.00 dapat selesai tanpa memotong kuota utama sama sekali.",
        },
        {
          column: 2,
          label:
            "Jika Booster dibeli saat sisa kuota utama $$10\\text{ GB}$$, lalu dipakai untuk mengunduh $$15\\text{ GB}$$ di luar jam malam, sisa kuota utama sesudahnya $$5\\text{ GB}$$.",
        },
        {
          column: 2,
          label:
            "Jika separuh isi sebuah berkas diunduh dengan kecepatan $$40\\text{ Mbps}$$ dan separuh sisanya dengan $$8\\text{ Mbps}$$, kecepatan rata-rata unduhan berkas itu $$24\\text{ Mbps}$$.",
        },
      ],
    },
  },
};

export default item;
