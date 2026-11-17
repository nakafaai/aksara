import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6$$ alpha and $$8$$ beta decays, $$22$$ neutrons lost, and $$6.0 \\times 10^{15}$$ helium atoms",
        },
        {
          correct: true,
          label:
            "$$8$$ alpha and $$6$$ beta decays, $$22$$ neutrons lost, and $$8.0 \\times 10^{15}$$ helium atoms",
        },
        {
          correct: false,
          label:
            "$$8$$ alpha and $$6$$ beta decays, $$22$$ neutrons lost, and $$1.4 \\times 10^{16}$$ helium atoms",
        },
        {
          correct: false,
          label:
            "$$8$$ alpha and $$6$$ beta decays, $$16$$ neutrons lost, and $$8.0 \\times 10^{15}$$ helium atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6$$ reputan alfa dan $$8$$ reputan beta, $$22$$ neutron hilang, dan $$6.0 \\times 10^{15}$$ atom helium",
        },
        {
          correct: true,
          label:
            "$$8$$ reputan alfa dan $$6$$ reputan beta, $$22$$ neutron hilang, dan $$8.0 \\times 10^{15}$$ atom helium",
        },
        {
          correct: false,
          label:
            "$$8$$ reputan alfa dan $$6$$ reputan beta, $$22$$ neutron hilang, dan $$1.4 \\times 10^{16}$$ atom helium",
        },
        {
          correct: false,
          label:
            "$$8$$ reputan alfa dan $$6$$ reputan beta, $$16$$ neutron hilang, dan $$8.0 \\times 10^{15}$$ atom helium",
        },
      ],
    },
  },
};

export default item;
