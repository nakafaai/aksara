import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tiga pengukuran yang berdekatan membuktikan bahwa $$4{,}81$$ meter adalah kedalaman air yang tepat tanpa ketidakpastian.",
        },
        {
          isCorrect: true,
          label:
            "Bekas lumpur pada $$4{,}35$$ meter dan pengukuran ulang yang mengelompok di sekitar $$4{,}81$$ meter mendukung pengecualian nilai pertama, sedangkan penandaan mempertahankan alasan yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran dari titik acuan yang sama dan menandai catatan yang meragukan. Perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran dari titik acuan yang sama dan menandai catatan yang meragukan. Latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Definisi integritas ilmiah membuat pemeriksaan pita ukur dan pengulangan pengukuran tidak lagi diperlukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
