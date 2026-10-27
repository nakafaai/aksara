import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Manfaat pembayaran digital perlu dinilai dengan data yang sebanding dan akses pengguna, sehingga penambahannya tidak otomatis berarti penghapusan tunai.",
        },
        {
          correct: false,
          label:
            "Perbedaan waktu transaksi dapat dipengaruhi jenis barang dan bukan hanya cara pembayaran.",
        },
        {
          correct: true,
          label:
            "Setelah data dipisahkan, keunggulan waktu hampir hilang pada transaksi dengan banyak barang.",
        },
        {
          correct: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
        {
          correct: false,
          label:
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
      ],
    },
  },
};

export default item;
