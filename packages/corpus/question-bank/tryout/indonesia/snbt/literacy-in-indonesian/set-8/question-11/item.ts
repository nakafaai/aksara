import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "jamu-seller",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "dari bangga menjadi kecewa karena bakul jamunya ternyata terlalu berat",
        },
        {
          correct: false,
          label: "dari marah menjadi takut karena para pelanggan menunggu",
        },
        {
          correct: false,
          label: "dari acuh tak acuh menjadi ingin berhenti kuliah farmasi",
        },
        {
          correct: true,
          label:
            "dari malu menjadi menghargai pengetahuan dan kepedulian ibunya",
        },
        {
          correct: false,
          label: "dari kasihan menjadi ingin menjual jamu di kota",
        },
      ],
    },
  },
};

export default item;
