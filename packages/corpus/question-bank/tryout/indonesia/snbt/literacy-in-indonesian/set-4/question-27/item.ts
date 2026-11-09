import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "tin-roof",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tamu yang datang mengetuk pintu rumah pada malam hari.",
        },
        {
          correct: true,
          label: "Bunyi hujan yang keras dan bertubi-tubi di atap seng.",
        },
        {
          correct: false,
          label: "Anak-anak yang tidak sabar menunggu hujan reda.",
        },
        {
          correct: false,
          label: "Air bocor yang jatuh perlahan ke dalam baskom.",
        },
        {
          correct: false,
          label: "Angin kencang yang membuat pintu rumah terbuka.",
        },
      ],
    },
  },
};

export default item;
