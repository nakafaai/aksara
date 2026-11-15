import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis menolak sebutan itu, karena menurutnya rumah gadang sama rentannya dengan bangunan lain dalam keadaan apa pun.",
        },
        {
          correct: false,
          label:
            "Penulis menerima sebutan itu sepenuhnya, karena tiang di atas batu sandi pasti mencegah kerusakan.",
        },
        {
          correct: false,
          label:
            "Penulis tidak menilai sebutan itu dan hanya melaporkan bahwa sebutan itu sering dipakai dalam promosi.",
        },
        {
          correct: true,
          label:
            "Penulis menerima dasar sebutan itu, tetapi membatasinya pada rumah gadang yang kayunya sehat dan cara berdirinya masih asli.",
        },
        {
          correct: false,
          label:
            "Penulis menilai sebutan itu tepat hanya untuk rumah gadang baru yang tiangnya dicor ke fondasi beton dan disambung paku.",
        },
      ],
    },
  },
};

export default item;
