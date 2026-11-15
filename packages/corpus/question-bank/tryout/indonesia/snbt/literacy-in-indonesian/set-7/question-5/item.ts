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
            "Spallanzani sudah mengetahui bahwa kelelawar memakai telinganya sebelum orang mengetahui bunyi apa yang dipakai kelelawar.",
        },
        {
          column: 2,
          label:
            "Griffin membuktikan bahwa kelelawar dapat melihat dengan matanya dalam gelap.",
        },
        {
          column: 1,
          label:
            "Ngengat yang menangkap panggilan keras berada lebih dekat dengan kelelawar daripada ngengat yang menangkap panggilan samar.",
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
