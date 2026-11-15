import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "umbrella-stand",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            'The father\'s word "leak" treats the umbrellas as money slowly draining away.',
        },
        {
          column: 2,
          label:
            'Mrs Okonjo\'s remark that she "had all she needed" means only that she now had enough umbrellas.',
        },
        {
          column: 1,
          label:
            'The note "Hope you\'re mending" shows concern for Mrs Okonjo herself.',
        },
        {
          column: 2,
          label:
            'The father\'s remark that the sign "would have worked faster" shows that he understood what the umbrellas were for.',
        },
        {
          column: 1,
          label:
            'The note "Sorry it took so long" shows that the borrower knew the umbrella had been kept too long.',
        },
      ],
    },
  },
};

export default item;
