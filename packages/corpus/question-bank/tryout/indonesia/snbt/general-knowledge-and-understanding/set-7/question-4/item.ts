import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
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
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
        {
          correct: true,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          correct: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
      ],
    },
  },
};

export default item;
