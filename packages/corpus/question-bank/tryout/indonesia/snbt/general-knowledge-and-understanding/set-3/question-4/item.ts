import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menyediakan berkas data mentah, tetapi tidak menguraikan dasar keputusannya.",
        },
        {
          isCorrect: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          isCorrect: false,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: true,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
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
