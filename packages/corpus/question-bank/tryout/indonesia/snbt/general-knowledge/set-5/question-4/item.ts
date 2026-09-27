import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Laporan hanya membandingkan biaya total dan manfaat rata-rata tanpa membedakan kebutuhan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Prosedur direvisi setelah keluhan terverifikasi menunjukkan hambatan yang tidak terdeteksi pada uji awal.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
      ],
    },
  },
};

export default item;
