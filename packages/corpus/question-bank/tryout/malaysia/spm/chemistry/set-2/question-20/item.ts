import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Titrate lead(II) hydroxide with sulfuric acid, using $$20.0\\text{ cm}^3$$ of acid" },
        { correct: false, label: "Mix lead(II) nitrate and sodium sulfate solutions, using $$10.0\\text{ cm}^3$$ of lead(II) nitrate" },
        { correct: false, label: "React lead(II) oxide with sulfuric acid and crystallise, using $$20.0\\text{ cm}^3$$ of acid" },
        { correct: true, label: "Mix lead(II) nitrate and sodium sulfate solutions, using $$20.0\\text{ cm}^3$$ of lead(II) nitrate" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Titratkan plumbum(II) hidroksida dengan asid sulfurik, menggunakan $$20.0\\text{ cm}^3$$ asid" },
        { correct: false, label: "Campurkan larutan plumbum(II) nitrat dan natrium sulfat, menggunakan $$10.0\\text{ cm}^3$$ plumbum(II) nitrat" },
        { correct: false, label: "Tindak balaskan plumbum(II) oksida dengan asid sulfurik dan hablurkan, menggunakan $$20.0\\text{ cm}^3$$ asid" },
        { correct: true, label: "Campurkan larutan plumbum(II) nitrat dan natrium sulfat, menggunakan $$20.0\\text{ cm}^3$$ plumbum(II) nitrat" },
      ],
    },
  },
};

export default item;
