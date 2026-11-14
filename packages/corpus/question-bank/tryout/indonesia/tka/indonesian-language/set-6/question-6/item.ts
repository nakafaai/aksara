import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "training-wheels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Raras meminta Arga memasang kembali roda bantu pada sepedanya",
        },
        {
          correct: false,
          label: "ayah melarang Raras bersepeda karena lututnya lecet",
        },
        {
          correct: false,
          label:
            "Raras kembali berjalan kaki karena malu dilihat teman-temannya",
        },
        {
          correct: true,
          label: "Raras bersepeda ke sekolah tanpa diantar ayahnya",
        },
        {
          correct: false,
          label: "Arga menjual sepeda biru karena sudah tidak dipakai",
        },
      ],
    },
  },
};

export default item;
