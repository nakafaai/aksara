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
            "Penulis menolak sebutan itu, dengan menunjukkan bahwa tiang lapuk dan pasak longgar membuat rumah gadang sama rentannya dengan bangunan lain.",
        },
        {
          correct: false,
          label:
            "Penulis menerima sebutan itu sepenuhnya, dengan menunjukkan bahwa tiang di atas batu sandi dapat bergeser saat tanah berguncang.",
        },
        {
          correct: false,
          label:
            "Penulis menerima dasar sebutan itu tetapi membatasinya, dengan menunjukkan bahwa atap gonjong yang indah tidak ikut membuat rumah lentur.",
        },
        {
          correct: true,
          label:
            "Penulis menerima dasar sebutan itu tetapi membatasinya, dengan menunjukkan bahwa tiang lapuk, pasak longgar, atau tiang yang dicor ke beton menghilangkan kelenturan itu.",
        },
        {
          correct: false,
          label:
            "Penulis tidak menilai sebutan itu dan hanya melaporkan bahwa sebutan itu sering dipakai dalam promosi.",
        },
      ],
    },
  },
};

export default item;
