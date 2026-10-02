import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "cara kelelawar mencari makan pada malam hari.",
        },
        {
          isCorrect: true,
          label: "keuntungan bertengger terbalik bagi kelelawar.",
        },
        {
          isCorrect: false,
          label:
            "cara menjatuhkan diri dari tempat bertengger membantu kelelawar terbang.",
        },
        {
          isCorrect: false,
          label: "tempat kelelawar beristirahat pada siang hari.",
        },
        {
          isCorrect: false,
          label:
            "cara tempat bertengger yang tinggi dapat melindungi kelelawar dari predator.",
        },
      ],
    },
  },
};

export default item;
