import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "boat-race",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ia melarang Ilham ikut lomba lagi karena cuaca tahun depan akan berbahaya",
        },
        {
          correct: true,
          label:
            "ia mendukung Ilham ikut lomba lagi dan sedang menguatkan layarnya",
        },
        {
          correct: false,
          label:
            "ia hanya meramalkan cuaca tahun depan dan tidak memikirkan lomba",
        },
        {
          correct: false,
          label:
            "ia menyindir Ilham yang kalah karena layar perahunya terlalu lemah",
        },
        {
          correct: false,
          label: "ia ingin menjual perahu itu sebelum musim angin kencang tiba",
        },
      ],
    },
  },
};

export default item;
