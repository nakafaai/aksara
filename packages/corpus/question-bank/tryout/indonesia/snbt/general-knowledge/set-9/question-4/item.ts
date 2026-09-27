import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          isCorrect: false,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
        {
          isCorrect: true,
          label:
            "Satu asumsi dasar diperiksa lebih dahulu karena seluruh simpulan berikutnya bergantung padanya.",
        },
        {
          isCorrect: false,
          label:
            "Tim menolak grafik yang menarik karena grafik itu tidak menjawab pertanyaan penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
      ],
    },
  },
};

export default item;
