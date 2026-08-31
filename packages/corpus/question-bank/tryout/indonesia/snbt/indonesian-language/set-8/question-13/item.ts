import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai 25 membuktikan bahwa format satuan seragam menghasilkan catatan kedalaman yang benar pada semua musim.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan kedalaman air menurut musim tidak relevan karena tujuan format hanya menyeragamkan penulisan satuan.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pembanding 14 dapat diabaikan sebab nilai uji sudah hampir dua kali nilai dasar 13.",
        },
        {
          isCorrect: false,
          label:
            "Kesepakatan warga dan petugas desa cukup untuk menyatakan bahwa data dari waktu pengukuran berbeda langsung dapat dibandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 25 dibandingkan 14 mendukung pemakaian format satuan seragam, tetapi perbandingan kedalaman tetap harus mengendalikan musim dan waktu pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
