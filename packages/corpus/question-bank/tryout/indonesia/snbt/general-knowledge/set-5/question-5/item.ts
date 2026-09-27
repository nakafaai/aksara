import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rekonstruksi sejarah yang bertanggung jawab membandingkan sumber, menjelaskan sudut pandang, dan mempertahankan bahan asli untuk penilaian ulang.",
        },
        {
          isCorrect: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
        {
          isCorrect: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Arsip harus memilih narasumber yang paling yakin dan menghapus rekaman yang tidak sesuai.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
