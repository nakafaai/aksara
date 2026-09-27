import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Evaluasi melibatkan kelompok terdampak dengan kebutuhan mobilitas, bahasa, dan akses yang berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
        {
          isCorrect: false,
          label:
            "Model mempertimbangkan interaksi cuaca, perilaku pengguna, dan jadwal layanan alih-alih mencari satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
      ],
    },
  },
};

export default item;
