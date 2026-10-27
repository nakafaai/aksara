import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "harbor-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "marah karena Raka menerima lampu baru",
        },
        {
          correct: false,
          label: "datar karena perubahan fungsi lampu hanya bersifat praktis",
        },
        {
          correct: false,
          label:
            "cemas karena keterlibatan warga dapat menggeser makna pribadi kenangan Raka",
        },
        {
          correct: false,
          label: "kecewa karena perahu ayah Raka kembali",
        },
        {
          correct: true,
          label: "lega karena kenangan Raka memperoleh makna baru",
        },
      ],
    },
  },
};

export default item;
