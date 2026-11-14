import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "old-uniform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Damar meminta ibunya membelikan seragam baru",
        },
        {
          correct: false,
          label: "Pak Sunu memarahi Damar karena seragamnya bernoda",
        },
        {
          correct: false,
          label: "Galih kembali ke sekolah untuk mengajar fisika",
        },
        {
          correct: true,
          label:
            "rasa malu Damar terhadap seragam bekas berubah menjadi kebanggaan setelah mengetahui kisah kakaknya",
        },
        {
          correct: false,
          label: "teman-teman Damar mengejek seragamnya yang kusam",
        },
      ],
    },
  },
};

export default item;
