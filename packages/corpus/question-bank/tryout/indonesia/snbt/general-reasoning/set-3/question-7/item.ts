import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "denda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Di antara pinjaman oleh anggota yang menerima pesan pengingat, persentase pinjaman yang terlambat turun dari $$9\\%$$ menjadi $$3\\%$$.",
        },
        {
          correct: false,
          label:
            "Di perpustakaan kota tetangga, yang tidak mengubah aturan apa pun pada bulan Juli, persentase pinjaman yang terlambat tidak berubah.",
        },
        {
          correct: true,
          label:
            "Di antara pinjaman oleh anggota yang tidak mendaftarkan nomor ponsel sehingga tidak pernah menerima pesan pengingat, persentase pinjaman yang terlambat juga turun dari $$10\\%$$ menjadi $$5\\%$$.",
        },
        {
          correct: false,
          label:
            "Perpustakaan lain yang pada bulan yang sama menghapus denda dan mulai mengirim pesan pengingat juga mengalami penurunan serupa.",
        },
        {
          correct: false,
          label:
            "Dalam wawancara, banyak penunggak lama mengaku dulu enggan datang karena malu harus membayar denda yang sudah menumpuk.",
        },
      ],
    },
  },
};

export default item;
