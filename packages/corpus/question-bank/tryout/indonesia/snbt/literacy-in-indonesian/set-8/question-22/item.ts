import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tiga pengukuran yang berdekatan membuktikan bahwa $$4{,}81$$ meter adalah kedalaman air yang tepat tanpa ketidakpastian.",
        },
        {
          correct: true,
          label:
            "Bekas lumpur pada $$4{,}35$$ meter dan pengukuran ulang yang mengelompok di sekitar $$4{,}81$$ meter mendukung pengecualian nilai pertama, sedangkan penandaan mempertahankan alasan yang dapat diperiksa.",
        },
        {
          correct: false,
          label:
            "Dito memilih untuk mengulang pengukuran dari titik acuan yang sama dan menandai catatan yang meragukan. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          correct: false,
          label:
            "Dito memilih untuk mengulang pengukuran dari titik acuan yang sama dan menandai catatan yang meragukan. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          correct: false,
          label:
            "Definisi integritas ilmiah membuat pemeriksaan pita ukur dan pengulangan pengukuran tidak lagi diperlukan.",
        },
      ],
    },
  },
};

export default item;
