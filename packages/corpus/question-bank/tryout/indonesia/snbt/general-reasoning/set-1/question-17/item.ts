import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Satu kali pengukuran berat badan cukup untuk membuktikan bahwa seorang anak sepenuhnya sehat.",
        },
        {
          isCorrect: false,
          label:
            "Lingkar kepala saja menentukan status gizi anak pada semua kelompok umur.",
        },
        {
          isCorrect: false,
          label:
            "Setiap kenaikan berat atau tinggi badan otomatis berarti pertumbuhan anak sudah sesuai.",
        },
        {
          isCorrect: true,
          label:
            "Pertumbuhan anak dinilai melalui beberapa pengukuran yang sesuai dengan umur serta polanya dari waktu ke waktu.",
        },
        {
          isCorrect: false,
          label:
            "Kurva pertumbuhan menggantikan seluruh penilaian profesional lain terhadap kesehatan anak.",
        },
      ],
    },
  },
};

export default item;
