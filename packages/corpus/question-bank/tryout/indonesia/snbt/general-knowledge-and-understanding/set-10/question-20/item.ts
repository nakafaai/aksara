import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemeriksaan sampel menemukan dokumen relevan pada banyak hasil nol, terutama dalam catatan tangan dengan ejaan lama.",
        },
        {
          isCorrect: false,
          label:
            "Sampel dengan kata pencarian yang diperluas secara manual menemukan lebih banyak naskah relevan, tetapi masih melewatkan catatan dengan ejaan lama.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
        {
          isCorrect: true,
          label:
            "Audit menyeluruh menunjukkan akurasi dan peluang ditemukan identik untuk semua jenis tulisan, ejaan, periode, dan tingkat popularitas koleksi.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
