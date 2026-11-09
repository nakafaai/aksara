import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "mango-tree",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ayu diam-diam memakan mangga milik tetangganya",
        },
        {
          correct: false,
          label: "Pak Darmo menebang pohon mangga yang tumbuh miring",
        },
        {
          correct: false,
          label: "anak-anak di gang dilarang memanjat pagar rumah warga",
        },
        {
          correct: false,
          label: "ibu Ayu bertengkar dengan Pak Darmo karena pagar rumah",
        },
        {
          correct: true,
          label:
            "kejujuran Ayu mengembalikan mangga membuka hubungan hangat dengan tetangga yang dianggap galak",
        },
      ],
    },
  },
};

export default item;
