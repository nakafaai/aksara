import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Satu kali pengukuran berat badan cukup untuk membuktikan bahwa seorang anak sepenuhnya sehat.",
        },
        {
          correct: false,
          label:
            "Lingkar kepala saja menentukan status gizi anak pada semua kelompok umur.",
        },
        {
          correct: false,
          label:
            "Setiap kenaikan berat atau tinggi badan otomatis berarti pertumbuhan anak sudah sesuai.",
        },
        {
          correct: true,
          label:
            "Pertumbuhan anak dinilai melalui beberapa pengukuran yang sesuai dengan umur serta polanya dari waktu ke waktu.",
        },
        {
          correct: false,
          label:
            "Kurva pertumbuhan menggantikan seluruh penilaian profesional lain terhadap kesehatan anak.",
        },
      ],
    },
  },
};

export default item;
