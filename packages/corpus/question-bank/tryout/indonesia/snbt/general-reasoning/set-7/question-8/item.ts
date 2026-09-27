import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simpulan itu pasti benar karena tutupan lahan hijau berkurang.",
        },
        {
          isCorrect: true,
          label:
            "Simpulan itu tidak didukung oleh informasi karena memperkenalkan hasil yang tidak diukur dan tidak dihubungkan oleh aturan apa pun.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan itu mungkin benar karena suhu permukaan lahan meningkat.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan itu pasti salah karena proyek tidak mencatat data banjir.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan itu didukung karena partikel di udara dan banjir merupakan hasil yang setara.",
        },
      ],
    },
  },
};

export default item;
