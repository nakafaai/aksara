import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          correct: true,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          correct: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          correct: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
        {
          correct: false,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
      ],
    },
  },
};

export default item;
