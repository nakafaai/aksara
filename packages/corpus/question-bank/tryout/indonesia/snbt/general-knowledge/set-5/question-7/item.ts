import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rekonstruksi sejarah yang bertanggung jawab membandingkan sumber, menjelaskan sudut pandang, dan mempertahankan bahan asli untuk penilaian ulang.",
        },
        {
          isCorrect: true,
          label:
            "Jadwal, foto, surat penggunaan ruang, dan wawancara tambahan menunjukkan perpindahan berlangsung bertahap.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan ingatan dapat muncul karena setiap narasumber menyaksikan bagian peristiwa yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
