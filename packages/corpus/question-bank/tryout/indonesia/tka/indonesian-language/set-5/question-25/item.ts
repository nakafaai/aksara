import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "turtle-nest",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "jaring paranet dipasang untuk melindungi telur dari anjing liar",
        },
        {
          correct: true,
          label:
            "jaring paranet dipasang untuk menjaga suhu pasir tidak terlalu tinggi karena suhu memengaruhi jenis kelamin tukik",
        },
        {
          correct: false,
          label:
            "jaring paranet membuat semua tukik yang menetas berjenis kelamin jantan",
        },
        {
          correct: false,
          label: "suhu pasir naik karena jaring paranet menahan panas matahari",
        },
        {
          correct: false,
          label:
            "jaring paranet dipasang agar pengunjung tidak memotret dengan lampu kilat",
        },
      ],
    },
  },
};

export default item;
