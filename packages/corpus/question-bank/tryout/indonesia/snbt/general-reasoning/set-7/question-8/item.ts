import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simpulan itu pasti benar karena tutupan lahan hijau berkurang.",
        },
        {
          correct: true,
          label:
            "Simpulan itu tidak didukung oleh informasi karena memperkenalkan hasil yang tidak diukur dan tidak dihubungkan oleh aturan apa pun.",
        },
        {
          correct: false,
          label:
            "Simpulan itu mungkin benar karena suhu permukaan lahan meningkat.",
        },
        {
          correct: false,
          label:
            "Simpulan itu pasti salah karena proyek tidak mencatat data banjir.",
        },
        {
          correct: false,
          label:
            "Simpulan itu didukung karena partikel di udara dan banjir merupakan hasil yang setara.",
        },
      ],
    },
  },
};

export default item;
