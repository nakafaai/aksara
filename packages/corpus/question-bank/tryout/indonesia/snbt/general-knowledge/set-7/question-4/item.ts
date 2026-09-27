import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
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
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
      ],
    },
  },
};

export default item;
