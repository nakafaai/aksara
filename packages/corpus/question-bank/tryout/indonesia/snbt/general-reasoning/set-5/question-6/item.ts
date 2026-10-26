import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Persentase kenaikan tertinggi dialami oleh Perusahaan B",
        },
        {
          correct: false,
          label:
            "Jumlah pengguna smartphone di setiap perusahaan selalu berfluktuasi",
        },
        {
          correct: false,
          label: "Persentase penurunan terbesar terjadi di Perusahaan B",
        },
        {
          correct: false,
          label: "Perusahaan B memiliki total tiga bulan tertinggi",
        },
        {
          correct: true,
          label: "Perusahaan C memiliki total tiga bulan terendah",
        },
      ],
    },
  },
};

export default item;
