import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "rain-stage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "para penari lupa gerakan yang sudah mereka latih",
        },
        { correct: false, label: "pentas harus diulang pada malam lain" },
        {
          correct: false,
          label: "Bu Ratih kecewa karena tarian tidak sesuai latihan",
        },
        {
          correct: true,
          label:
            "para penari menyesuaikan tarian dengan keadaan malam itu, dan penyesuaian itu tepat",
        },
        {
          correct: false,
          label: "penonton meminta tarian dibawakan lebih cepat",
        },
      ],
    },
  },
};

export default item;
