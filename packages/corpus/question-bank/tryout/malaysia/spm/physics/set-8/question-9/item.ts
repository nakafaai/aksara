import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$m_A=1.1\\times10^{30}\\text{ kg}$$, $$m_B=5.3\\times10^{29}\\text{ kg}$$ and $$1.3\\times10^{4}\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$m_A=5.3\\times10^{29}\\text{ kg}$$, $$m_B=1.1\\times10^{30}\\text{ kg}$$ and $$1.3\\times10^{4}\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$m_A=4.7\\times10^{29}\\text{ kg}$$, $$m_B=5.9\\times10^{28}\\text{ kg}$$ and $$1.3\\times10^{4}\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$m_A=1.1\\times10^{30}\\text{ kg}$$, $$m_B=5.3\\times10^{29}\\text{ kg}$$ and $$6.3\\times10^{3}\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$m_A=1.1\\times10^{30}\\text{ kg}$$, $$m_B=5.3\\times10^{29}\\text{ kg}$$ dan $$1.3\\times10^{4}\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$m_A=5.3\\times10^{29}\\text{ kg}$$, $$m_B=1.1\\times10^{30}\\text{ kg}$$ dan $$1.3\\times10^{4}\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$m_A=4.7\\times10^{29}\\text{ kg}$$, $$m_B=5.9\\times10^{28}\\text{ kg}$$ dan $$1.3\\times10^{4}\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$m_A=1.1\\times10^{30}\\text{ kg}$$, $$m_B=5.3\\times10^{29}\\text{ kg}$$ dan $$6.3\\times10^{3}\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
