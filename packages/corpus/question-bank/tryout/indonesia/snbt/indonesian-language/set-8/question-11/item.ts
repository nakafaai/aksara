import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengganti seluruh nilai lama dengan hasil konversi agar catatan sumur terlihat seragam dan mudah dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Tim menyimpulkan bahwa satuan meter sudah cukup membuat pengukuran dari musim dan waktu berbeda dapat dibandingkan langsung.",
        },
        {
          isCorrect: true,
          label:
            "Berkat formulir baru, lebih banyak pasangan catatan bisa diperiksa tanpa menebak, tetapi tim tetap menyimpan nilai asli dan menyelaraskan waktu pengukuran sebelum penerapan luas.",
        },
        {
          isCorrect: false,
          label:
            "Kenaikan dari 14 menjadi 27 pasangan membuktikan bahwa semua kesalahan pencatatan telah dihilangkan oleh formulir baru.",
        },
        {
          isCorrect: false,
          label:
            "Masukan warga menggantikan kebutuhan akan kelompok pembanding karena pengguna mengetahui kondisi sumur masing-masing.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
