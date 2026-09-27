import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
        {
          isCorrect: true,
          label:
            "Ketertelusuran menghubungkan produk dengan catatan perjalanan yang terus diperbarui, bukan hanya sebuah lokasi.",
        },
        {
          isCorrect: false,
          label:
            "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: false,
          label:
            "Ketertelusuran cukup menghubungkan produk dengan alamat distributor terakhir tanpa catatan tahap sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
