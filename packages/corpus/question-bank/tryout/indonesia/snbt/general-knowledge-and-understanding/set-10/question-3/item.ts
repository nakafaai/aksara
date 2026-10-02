import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aturan pengodean yang sama diterapkan pada setiap kelompok dan setiap waktu pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Catatan disusun dari kejadian paling awal hingga paling akhir agar urutan perubahan dapat ditelusuri.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          isCorrect: false,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
      ],
    },
  },
};

export default item;
