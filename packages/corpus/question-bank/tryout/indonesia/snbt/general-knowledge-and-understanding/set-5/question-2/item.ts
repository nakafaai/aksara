import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          correct: false,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          correct: false,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
        {
          correct: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
        {
          correct: true,
          label:
            "Penilai memakai rubrik yang telah ditetapkan dan menilai tanpa mengetahui identitas peserta atau hasil akhirnya.",
        },
      ],
    },
  },
};

export default item;
