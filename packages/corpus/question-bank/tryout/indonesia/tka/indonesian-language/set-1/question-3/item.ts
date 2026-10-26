import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "warga lebih memilih meja konsultasi daripada menggunakan kartu riwayat saat memilih benih",
        },
        {
          correct: false,
          label:
            "kebun sekolah menjadi tujuan utama karena jadwal panennya paling mudah dicatat",
        },
        {
          correct: true,
          label: "kartu riwayat membantu pemilihan dan pengujian benih",
        },
        {
          correct: false,
          label:
            "petugas memisahkan benih belum teruji sampai hasil satu sampel dianggap cukup mewakili varietasnya",
        },
        {
          correct: false,
          label: "rumah berhalaman sempit tidak dapat ikut program",
        },
      ],
    },
  },
  stimulus: "seed-library",
};

export default item;
