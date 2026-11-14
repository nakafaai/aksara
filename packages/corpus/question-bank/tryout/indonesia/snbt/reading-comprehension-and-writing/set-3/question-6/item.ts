import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Menyewakan* tidak perlu diganti karena kalimat (1) hanya membebaskan biaya kelas, bukan biaya alat yang dibawa pulang.",
        },
        {
          correct: false,
          label:
            "*Meminjam* tepat karena kalimat (14) menyebut alat itu dikembalikan setiap akhir bulan.",
        },
        {
          correct: false,
          label:
            "*Menghibahkan* tepat karena kalimat (1) menyebut sanggar tidak memungut biaya apa pun dari pesertanya.",
        },
        {
          correct: false,
          label:
            "*Meminjami* tepat karena kalimat (1) dan (14) menunjukkan alat itu dipakai sementara tanpa bayaran.",
        },
        {
          correct: true,
          label:
            "*Meminjamkan* tepat karena kalimat (1) dan (14) menunjukkan alat itu dipakai sementara tanpa bayaran.",
        },
      ],
    },
  },
};

export default item;
