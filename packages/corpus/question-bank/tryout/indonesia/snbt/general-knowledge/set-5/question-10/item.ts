import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
        {
          isCorrect: true,
          label:
            "Tafsir terbaik saat ini tetap terbuka untuk koreksi karena sumber sejarah tidak merekam masa lalu secara sempurna.",
        },
        {
          isCorrect: false,
          label:
            "Tafsir yang telah dimuat dalam pameran tidak boleh diubah meskipun ditemukan bukti baru.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
