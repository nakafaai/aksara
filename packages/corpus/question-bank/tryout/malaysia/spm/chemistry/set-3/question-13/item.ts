import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{H}_2\\text{S}$$ boils above $$\\text{H}_2\\text{O}$$, because its molecules are heavier" },
        { correct: false, label: "$$\\text{CH}_4$$ boils lowest, because its carbon-hydrogen bonds are the weakest and break first" },
        { correct: true, label: "$$\\text{H}_2\\text{O}$$, $$\\text{NH}_3$$ and $$\\text{HF}$$ form hydrogen bonds between molecules while $$\\text{H}_2\\text{S}$$ does not, so $$\\text{H}_2\\text{S}$$ boils below $$\\text{H}_2\\text{O}$$ although its molecules are heavier" },
        { correct: false, label: "$$\\text{NH}_3$$ boils below $$\\text{CH}_4$$, because nitrogen is less electronegative than carbon" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{H}_2\\text{S}$$ mendidih di atas $$\\text{H}_2\\text{O}$$, kerana molekulnya lebih berat" },
        { correct: false, label: "$$\\text{CH}_4$$ mendidih paling rendah, kerana ikatan karbon-hidrogennya paling lemah dan putus dahulu" },
        { correct: true, label: "$$\\text{H}_2\\text{O}$$, $$\\text{NH}_3$$ dan $$\\text{HF}$$ membentuk ikatan hidrogen antara molekul manakala $$\\text{H}_2\\text{S}$$ tidak, jadi $$\\text{H}_2\\text{S}$$ mendidih di bawah $$\\text{H}_2\\text{O}$$ walaupun molekulnya lebih berat" },
        { correct: false, label: "$$\\text{NH}_3$$ mendidih di bawah $$\\text{CH}_4$$, kerana nitrogen kurang elektronegatif daripada karbon" },
      ],
    },
  },
};

export default item;
