import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Manfaat pembayaran digital perlu dinilai dengan data yang sebanding dan akses pengguna, sehingga penambahannya tidak otomatis berarti penghapusan tunai.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan waktu transaksi dapat dipengaruhi jenis barang dan bukan hanya cara pembayaran.",
        },
        {
          isCorrect: true,
          label:
            "Setelah data dipisahkan, keunggulan waktu hampir hilang pada transaksi dengan banyak barang.",
        },
        {
          isCorrect: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
        {
          isCorrect: false,
          label:
            "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
