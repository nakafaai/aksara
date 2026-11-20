import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.00700\\text{ mol VO}^{2+}$$ and $$0.00300\\text{ mol VO}_2^+$$, $$1.95\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.00600\\text{ mol VO}^{2+}$$ and $$0.00400\\text{ mol V}^{3+}$$, $$0.975\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.00600\\text{ mol VO}^{2+}$$ and $$0.00400\\text{ mol V}^{3+}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.00700\\text{ mol V}^{3+}$$ and $$0.00300\\text{ mol VO}_2^+$$, $$0.975\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.00700\\text{ mol VO}^{2+}$$ dan $$0.00300\\text{ mol VO}_2^+$$, $$1.95\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.00600\\text{ mol VO}^{2+}$$ dan $$0.00400\\text{ mol V}^{3+}$$, $$0.975\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.00600\\text{ mol VO}^{2+}$$ dan $$0.00400\\text{ mol V}^{3+}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.00700\\text{ mol V}^{3+}$$ dan $$0.00300\\text{ mol VO}_2^+$$, $$0.975\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
