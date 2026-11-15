import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bu Sri memberikan nasi uduk itu sebagai tanda persahabatan, dan keduanya menjaga kebiasaan itu tanpa membicarakannya.",
        },
        {
          correct: false,
          label:
            "Bu Sri tidak sadar bahwa Pak Harun menyodorkan uang, karena setiap pagi ia sibuk melayani pembeli di losnya sendiri.",
        },
        {
          correct: false,
          label:
            "Bu Sri menolak uang Pak Harun karena masih marah atas uang receh titipannya yang pernah hilang di lapak itu.",
        },
        {
          correct: false,
          label:
            "Pak Harun sebenarnya tidak ingin membayar, sehingga ia hanya berpura-pura menyodorkan uang.",
        },
        {
          correct: false,
          label:
            "Bu Sri sengaja menahan pembayaran agar Pak Harun terus menyimpan uang recehnya setiap pagi.",
        },
      ],
    },
  },
};

export default item;
