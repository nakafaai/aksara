import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "antrean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pasien muda lebih sering terlambat daripada pasien lansia.",
        },
        {
          correct: false,
          label:
            "Pasien yang sudah memegang nomor dari aplikasi tidak dilayani loket walaupun ia datang terlambat.",
        },
        {
          correct: false,
          label:
            "Tidak semua nomor yang dipindahkan ke akhir antrean adalah milik pasien lansia.",
        },
        {
          correct: false,
          label:
            "Pasien yang nomornya dipindahkan ke akhir antrean lalu belum terpanggil sampai pukul dua belas siang harus mendaftar ulang untuk hari lain.",
        },
        {
          correct: false,
          label:
            "Perkiraan waktu panggilan yang pertama kali diterima pasien belum tentu sama dengan waktu ia benar-benar dipanggil.",
        },
      ],
    },
  },
};

export default item;
