import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan.",
        },
        {
          correct: true,
          label:
            "Ketertelusuran menghubungkan produk dengan catatan perjalanan yang terus diperbarui, bukan hanya sebuah lokasi.",
        },
        {
          correct: false,
          label:
            "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui.",
        },
        {
          correct: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          correct: false,
          label:
            "Ketertelusuran cukup menghubungkan produk dengan alamat distributor terakhir tanpa catatan tahap sebelumnya.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
