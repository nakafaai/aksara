import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: true,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          isCorrect: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
        {
          isCorrect: false,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
      ],
    },
  },
};

export default item;
