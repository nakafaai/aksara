import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "membaca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua siswa di sekolah itu membaca judul buku yang sama selama waktu membaca pagi.",
        },
        {
          correct: false,
          label:
            "Nilai tes membaca para siswa pada akhir semester berikutnya pasti akan naik lagi.",
        },
        {
          correct: true,
          label:
            "Siswa benar-benar membaca selama lima belas menit itu, bukan melakukan kegiatan lain.",
        },
        {
          correct: false,
          label:
            "Beberapa sekolah lain di kota itu sudah lebih dulu menjalankan program membaca serupa.",
        },
        {
          correct: false,
          label:
            "Waktu membaca setiap pagi harus diperpanjang menjadi tiga puluh menit agar berhasil.",
        },
      ],
    },
  },
};

export default item;
