import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\\\text{KMnO}_4$$, $$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{MnO}_2$$, $$\\\\text{MnCl}_2$$, so $$\\\\text{K}_2\\\\text{MnO}_4$$ is potassium manganate(VI)" },
        { correct: false, label: "$$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{KMnO}_4$$, $$\\\\text{MnO}_2$$, $$\\\\text{MnCl}_2$$, so $$\\\\text{K}_2\\\\text{MnO}_4$$ is potassium manganate(VII)" },
        { correct: false, label: "$$\\\\text{KMnO}_4$$, $$\\\\text{MnO}_2$$, $$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{MnCl}_2$$, so $$\\\\text{MnO}_2$$ is manganese(VI) oxide" },
        { correct: false, label: "$$\\\\text{MnCl}_2$$, $$\\\\text{MnO}_2$$, $$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{KMnO}_4$$, so $$\\\\text{MnCl}_2$$ is manganese(VII) chloride" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\\\text{KMnO}_4$$, $$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{MnO}_2$$, $$\\\\text{MnCl}_2$$, jadi $$\\\\text{K}_2\\\\text{MnO}_4$$ ialah kalium manganat(VI)" },
        { correct: false, label: "$$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{KMnO}_4$$, $$\\\\text{MnO}_2$$, $$\\\\text{MnCl}_2$$, jadi $$\\\\text{K}_2\\\\text{MnO}_4$$ ialah kalium manganat(VII)" },
        { correct: false, label: "$$\\\\text{KMnO}_4$$, $$\\\\text{MnO}_2$$, $$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{MnCl}_2$$, jadi $$\\\\text{MnO}_2$$ ialah mangan(VI) oksida" },
        { correct: false, label: "$$\\\\text{MnCl}_2$$, $$\\\\text{MnO}_2$$, $$\\\\text{K}_2\\\\text{MnO}_4$$, $$\\\\text{KMnO}_4$$, jadi $$\\\\text{MnCl}_2$$ ialah mangan(VII) klorida" },
      ],
    },
  },
};

export default item;
