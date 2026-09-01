import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Air yang keluar dari bawah kolom langsung menunjukkan jumlah air yang masuk dari permukaan, sehingga penyimpanan di dalam tanah tidak perlu dihitung.",
        },
        {
          isCorrect: false,
          label:
            "Campuran organik memiliki infiltrasi terendah karena hanya 62 mililiter air yang keluar dari bawah selama 15 menit.",
        },
        {
          isCorrect: false,
          label:
            "Kolom pasir merupakan model terbaik untuk semua lahan karena seluruh air sudah masuk sebelum lima menit.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan retensi membuktikan campuran organik selalu mencegah air mencapai lapisan tanah yang lebih dalam.",
        },
        {
          isCorrect: true,
          label:
            "Model membedakan infiltrasi, perkolasi, dan penyimpanan air, tetapi tanah yang dikemas ulang belum mewakili struktur lahan alami.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
