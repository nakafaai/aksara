import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Its relative atomic mass is 36.0, and the ion $$^{37}\\text{X}^-$$ has 18 neutrons" },
        { correct: false, label: "Its relative atomic mass is 35.5, and the ion $$^{37}\\text{X}^-$$ has 17 electrons" },
        { correct: true, label: "Its relative atomic mass is 35.5, and the ion $$^{37}\\text{X}^-$$ has 20 neutrons and 18 electrons" },
        { correct: false, label: "Its relative atomic mass is 36.5, and the ion $$^{37}\\text{X}^-$$ has 20 neutrons and 17 electrons" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Jisim atom relatifnya ialah 36.0, dan ion $$^{37}\\text{X}^-$$ mempunyai 18 neutron" },
        { correct: false, label: "Jisim atom relatifnya ialah 35.5, dan ion $$^{37}\\text{X}^-$$ mempunyai 17 elektron" },
        { correct: true, label: "Jisim atom relatifnya ialah 35.5, dan ion $$^{37}\\text{X}^-$$ mempunyai 20 neutron dan 18 elektron" },
        { correct: false, label: "Jisim atom relatifnya ialah 36.5, dan ion $$^{37}\\text{X}^-$$ mempunyai 20 neutron dan 17 elektron" },
      ],
    },
  },
};

export default item;
