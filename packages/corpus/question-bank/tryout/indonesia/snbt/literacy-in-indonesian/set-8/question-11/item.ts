import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim mengganti seluruh nilai lama dengan hasil konversi agar catatan sumur terlihat seragam dan mudah dibandingkan.",
        },
        {
          correct: false,
          label:
            "Tim menyimpulkan bahwa satuan meter sudah cukup membuat pengukuran dari musim dan waktu berbeda dapat dibandingkan langsung.",
        },
        {
          correct: true,
          label:
            "Pada formulir baru, lebih banyak pasangan catatan dapat diperiksa tanpa menebak, tetapi tim tetap menyimpan nilai asli dan menyelaraskan waktu pengukuran sebelum penerapan luas.",
        },
        {
          correct: false,
          label:
            "Kenaikan dari $$14$$ menjadi $$27$$ pasangan membuktikan bahwa semua kesalahan pencatatan telah dihilangkan oleh formulir baru.",
        },
        {
          correct: false,
          label:
            "Masukan warga menggantikan kebutuhan akan kelompok pembanding karena pengguna mengetahui kondisi sumur masing-masing.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
