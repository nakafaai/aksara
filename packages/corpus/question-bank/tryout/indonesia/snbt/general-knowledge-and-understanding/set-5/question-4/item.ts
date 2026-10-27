import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
        {
          correct: false,
          label:
            "Laporan hanya membandingkan biaya total dan manfaat rata-rata tanpa membedakan kebutuhan pengguna.",
        },
        {
          correct: false,
          label:
            "Prosedur direvisi setelah keluhan terverifikasi menunjukkan hambatan yang tidak terdeteksi pada uji awal.",
        },
        {
          correct: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          correct: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
      ],
    },
  },
};

export default item;
