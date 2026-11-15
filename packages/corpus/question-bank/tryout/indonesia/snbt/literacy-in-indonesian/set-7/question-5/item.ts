import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "bat-echolocation",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Spallanzani sudah tahu bahwa kelelawar memakai telinganya lebih dari satu abad sebelum orang tahu bunyi apa yang dipakai kelelawar.",
        },
        {
          column: 2,
          label:
            "Bunyi yang dipancarkan kelelawar pemburu serangga tidak dapat memantul dari benda sekecil nyamuk.",
        },
        {
          column: 1,
          label:
            "Jika selang antara panggilan dan gema makin pendek, benda yang memantulkan gema itu makin dekat.",
        },
        {
          column: 2,
          label:
            "Barbastel dapat mendeteksi ngengat dari jarak yang lebih jauh daripada kelelawar lain yang berburu di udara terbuka.",
        },
        {
          column: 2,
          label:
            "Percobaan Corcoran menunjukkan bahwa sebagian besar ngengat di alam memakai klik untuk mengacaukan sonar kelelawar.",
        },
      ],
    },
  },
};

export default item;
