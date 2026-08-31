import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "warga lebih memilih meja konsultasi daripada menggunakan kartu riwayat saat memilih benih",
        },
        {
          isCorrect: false,
          label:
            "kebun sekolah menjadi tujuan utama karena jadwal panennya paling mudah dicatat",
        },
        {
          isCorrect: true,
          label: "kartu riwayat membantu pemilihan dan pengujian benih",
        },
        {
          isCorrect: false,
          label:
            "petugas memisahkan benih belum teruji sampai hasil satu sampel dianggap cukup mewakili varietasnya",
        },
        {
          isCorrect: false,
          label: "rumah berhalaman sempit tidak dapat ikut program",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
