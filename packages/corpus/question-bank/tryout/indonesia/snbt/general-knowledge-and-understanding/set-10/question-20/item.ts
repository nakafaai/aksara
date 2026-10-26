import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pemeriksaan sampel menemukan dokumen relevan pada banyak hasil nol, terutama dalam catatan tangan dengan ejaan lama.",
        },
        {
          correct: false,
          label:
            "Sampel dengan kata pencarian yang diperluas secara manual menemukan lebih banyak naskah relevan, tetapi masih melewatkan catatan dengan ejaan lama.",
        },
        {
          correct: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
        {
          correct: true,
          label:
            "Audit menyeluruh menunjukkan akurasi dan peluang ditemukan identik untuk semua jenis tulisan, ejaan, periode, dan tingkat popularitas koleksi.",
        },
        {
          correct: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
