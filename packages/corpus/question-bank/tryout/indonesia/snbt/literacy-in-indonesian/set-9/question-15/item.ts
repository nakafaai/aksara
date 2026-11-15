import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "street-vendors",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Teks B menerima tujuan Teks A agar trotoar dapat dilalui pejalan kaki dengan aman.",
        },
        {
          column: 2,
          label:
            "Teks B menilai bahwa pemindahan pedagang pasti gagal dalam keadaan apa pun.",
        },
        {
          column: 1,
          label:
            "Kedua teks sama-sama menyebut jarak $$400$$ meter, tetapi untuk tujuan yang berbeda.",
        },
        {
          column: 2,
          label: "Teks B meragukan angka kecelakaan yang dipakai Teks A.",
        },
        {
          column: 1,
          label:
            "Jika usul trotoar bersama dalam Teks B dijalankan di Jalan Merdeka, ruang bagi pejalan kaki lebih lebar daripada sekarang.",
        },
      ],
    },
  },
};

export default item;
