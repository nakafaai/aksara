import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dito menghapus angka 4,35 meter agar hasil pengukuran terlihat konsisten dan laporan dapat segera diselesaikan.",
        },
        {
          isCorrect: true,
          label:
            "Dito menelusuri penyebab angka menyimpang, mengulang pengukuran, mempertahankan jejak data, dan melaporkan 4,81 meter sebagai hasil dengan ketidakpastian.",
        },
        {
          isCorrect: false,
          label:
            "Dito merata-ratakan 4,35 dan 4,82 meter karena semua hasil ukur harus memiliki bobot yang sama tanpa melihat cara memperolehnya.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih 4,82 meter sebagai nilai pasti karena hasil temannya sama dengan salah satu pengukuran ulang.",
        },
        {
          isCorrect: false,
          label:
            "Dito menyimpan angka pertama sebagai nilai sah meskipun bukti fisik menunjukkan pemberat mungkin belum mencapai air.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
