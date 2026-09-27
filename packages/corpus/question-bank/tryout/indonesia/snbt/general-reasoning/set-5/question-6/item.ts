import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Persentase kenaikan tertinggi dialami oleh Perusahaan B",
        },
        {
          isCorrect: false,
          label:
            "Jumlah pengguna smartphone di setiap perusahaan selalu berfluktuasi",
        },
        {
          isCorrect: false,
          label: "Persentase penurunan terbesar terjadi di Perusahaan B",
        },
        {
          isCorrect: false,
          label: "Perusahaan B memiliki total tiga bulan tertinggi",
        },
        {
          isCorrect: true,
          label: "Perusahaan C memiliki total tiga bulan terendah",
        },
      ],
    },
  },
};

export default item;
