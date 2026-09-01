import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tiga pengukuran yang berdekatan membuktikan bahwa 4,81 meter adalah kedalaman air yang tepat tanpa ketidakpastian.",
        },
        {
          isCorrect: true,
          label:
            "Pengukuran ulang yang mengelompok di sekitar 4,81 meter memberi alasan untuk tidak memakai 4,35 meter, sedangkan penandaan mempertahankan jejak alasan pengecualiannya.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan; perubahan tokoh terjadi karena orang lain mengambil alih tanggung jawab utama.",
        },
        {
          isCorrect: false,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan; latar tempat menjadi penyebab tunggal perubahan tanpa peran keputusan tokoh.",
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
