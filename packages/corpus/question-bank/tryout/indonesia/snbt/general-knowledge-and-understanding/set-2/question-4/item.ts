import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "cara kelelawar mencari makan pada malam hari.",
        },
        {
          correct: true,
          label: "keuntungan bertengger terbalik bagi kelelawar.",
        },
        {
          correct: false,
          label:
            "cara menjatuhkan diri dari tempat bertengger membantu kelelawar terbang.",
        },
        {
          correct: false,
          label: "tempat kelelawar beristirahat pada siang hari.",
        },
        {
          correct: false,
          label:
            "cara tempat bertengger yang tinggi dapat melindungi kelelawar dari predator.",
        },
      ],
    },
  },
};

export default item;
