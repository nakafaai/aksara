import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "rumpon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harga ikan di pasar kabupaten itu tidak berubah selama enam bulan setelah rumpon dipasang.",
        },
        {
          correct: false,
          label:
            "Sebagian besar ikan dari sekitar rumpon adalah jenis yang sebelumnya tidak pernah tertangkap di perairan kabupaten itu.",
        },
        {
          correct: true,
          label:
            "Hasil tangkapan per melaut di perairan yang jauh dari rumpon turun dibandingkan periode yang sama tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Daun kelapa pada rumpon perlu diganti setiap tiga bulan agar tetap menarik ikan.",
        },
        {
          correct: false,
          label:
            "Rumpon di ketiga titik itu dipasang pada kedalaman laut yang berbeda-beda.",
        },
      ],
    },
  },
};

export default item;
