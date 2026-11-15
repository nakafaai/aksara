import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$43\\%$$, sedangkan kelompok yang mengingat tiga kali kehilangan $$10\\%$$",
        },
        {
          correct: false,
          label:
            "sekitar $$48\\%$$, sedangkan kelompok yang mengingat tiga kali kehilangan sekitar $$86\\%$$",
        },
        {
          correct: false,
          label:
            "sekitar $$52\\%$$, sedangkan kelompok yang mengingat tiga kali kehilangan $$10\\%$$",
        },
        {
          correct: false,
          label:
            "sekitar $$108\\%$$, sedangkan kelompok yang mengingat tiga kali kehilangan sekitar $$16\\%$$",
        },
        {
          correct: true,
          label:
            "sekitar $$52\\%$$, sedangkan kelompok yang mengingat tiga kali kehilangan sekitar $$14\\%$$",
        },
      ],
    },
  },
};

export default item;
