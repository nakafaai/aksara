import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "crossing-guard",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rani ingin menjadi penjaga seperti ayahnya, dan maknanya tetap sama, yaitu bahwa kereta selalu tepat waktu.",
        },
        {
          correct: false,
          label:
            "Rani menyindir penjaga muda yang terlalu memperhatikan jam tangannya, dan kalimat itu kini menjadi ejekan.",
        },
        {
          correct: true,
          label:
            "Rani mengenang ayahnya, dan kalimat itu kini membawa pengertian bahwa keterlambatan ayah pada hari ulang tahunnya datang dari orang yang membutuhkan pertolongan.",
        },
        {
          correct: false,
          label:
            "Rani mengenang ayahnya, dan kalimat itu kini berarti bahwa ayahnya sering terlambat karena lalai.",
        },
        {
          correct: false,
          label:
            "Rani menyesal karena dulu marah kepada ayahnya, dan kalimat itu kini berarti bahwa ia sendiri sering terlambat.",
        },
      ],
    },
  },
};

export default item;
