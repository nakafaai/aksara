import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "antrean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa aplikasi antrean telah menyelesaikan masalah ruang tunggu yang digambarkan pada paragraf pertama",
        },
        {
          correct: true,
          label:
            "menilai hasil aplikasi antrean sekaligus menunjukkan bahwa masalah yang muncul justru datang dari kelompok yang tidak dikhawatirkan pada paragraf pertama",
        },
        {
          correct: false,
          label:
            "menguatkan dugaan pada paragraf pertama bahwa pasien lansia paling kesulitan memakai aplikasi antrean",
        },
        {
          correct: false,
          label:
            "menjelaskan aturan aplikasi antrean tentang pasien yang terlambat dan batas waktu layanan poli umum",
        },
        {
          correct: false,
          label:
            "mengusulkan agar loket pendaftaran dipertahankan khusus untuk pasien lansia yang belum memiliki ponsel pintar",
        },
      ],
    },
  },
};

export default item;
