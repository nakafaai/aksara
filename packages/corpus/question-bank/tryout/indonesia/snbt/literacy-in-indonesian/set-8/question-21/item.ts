import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dito menghapus angka $$4{,}35$$ meter agar hasil pengukuran terlihat konsisten dan laporan dapat segera diselesaikan.",
        },
        {
          correct: true,
          label:
            "Dito menelusuri penyebab angka menyimpang, mengulang pengukuran, mempertahankan jejak data, dan melaporkan $$4{,}81$$ meter sebagai hasil dengan ketidakpastian.",
        },
        {
          correct: false,
          label:
            "Dito merata-ratakan $$4{,}35$$ dan $$4{,}82$$ meter karena semua hasil ukur harus memiliki bobot yang sama tanpa melihat cara memperolehnya.",
        },
        {
          correct: false,
          label:
            "Dito memilih $$4{,}82$$ meter sebagai nilai pasti karena hasil temannya sama dengan salah satu pengukuran ulang.",
        },
        {
          correct: false,
          label:
            "Dito menyimpan angka pertama sebagai nilai sah meskipun bukti fisik menunjukkan pemberat mungkin belum mencapai air.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
