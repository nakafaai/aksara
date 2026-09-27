import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Laporan Mira tidak lulus pemeriksaan kelengkapan.",
        },
        {
          isCorrect: false,
          label: "Pengajuan Mira sudah disetujui.",
        },
        {
          isCorrect: false,
          label: "Penelaahan analis dilewati untuk laporan Mira.",
        },
        {
          isCorrect: false,
          label:
            "Setiap laporan dalam antrean akhir disetujui secara otomatis.",
        },
        {
          isCorrect: true,
          label: "Laporan Mira masuk ke antrean keputusan akhir.",
        },
      ],
    },
  },
};

export default item;
