import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "tin-roof",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sedih dan putus asa menghadapi kemiskinan",
        },
        {
          correct: false,
          label: "tegang dan menakutkan karena badai besar",
        },
        {
          correct: true,
          label: "hangat dan tabah dalam kesederhanaan",
        },
        {
          correct: false,
          label: "marah terhadap keadaan rumah yang rusak",
        },
        {
          correct: false,
          label: "riang karena hujan menyenangkan anak-anak",
        },
      ],
    },
  },
};

export default item;
