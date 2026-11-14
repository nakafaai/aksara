import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12$$ pemilik kebun yang menolak paritnya disekat",
        },
        {
          correct: true,
          label:
            "$$6$$ pemilik kebun yang berubah pikiran setelah melihat lahan di sekitar sekat tidak terbakar",
        },
        {
          correct: false,
          label: "$$8$$ pemilik kebun yang sejak awal setuju paritnya disekat",
        },
        {
          correct: false,
          label:
            "$$10$$ pemilik kebun, yaitu separuh dari semua pemilik kebun di tepi hutan",
        },
        {
          correct: false,
          label: "$$14$$ pemilik kebun yang kini setuju paritnya disekat",
        },
      ],
    },
  },
};

export default item;
