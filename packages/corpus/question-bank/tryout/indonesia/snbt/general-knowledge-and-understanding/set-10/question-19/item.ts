import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pencarian arsip otomatis bermanfaat jika hasil diperlakukan sebagai indeks terbatas yang dapat diperiksa dan dikoreksi.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola dapat menampilkan hanya dokumen yang mudah dibaca mesin agar hasil pencarian tampak bersih.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
        {
          isCorrect: true,
          label:
            "Surat ketikan lebih mudah ditemukan daripada catatan tangan dan ejaan lama sering tidak muncul.",
        },
        {
          isCorrect: false,
          label:
            "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
