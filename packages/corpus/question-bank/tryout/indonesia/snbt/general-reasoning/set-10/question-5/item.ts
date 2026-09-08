import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nia wird sich sicher nicht infizieren, weil die Exposition kein Infektionsrisiko schafft.",
        },
        {
          isCorrect: true,
          label:
            "Nia könnte sich nicht infizieren. Sowohl eine Infektion als auch ihr Ausbleiben sind mit den Angaben vereinbar.",
        },
        {
          isCorrect: false,
          label:
            "Nia wird sich sicher infizieren, weil jede Exposition eine Infektion verursacht.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung ist irrelevant, weil der Text keine Influenzaübertragung behandelt.",
        },
        {
          isCorrect: false,
          label:
            "Es ist nicht bekannt, ob Nia Partikeln einer an Influenza erkrankten Person ausgesetzt war.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nia certainly will not catch influenza because exposure creates no infection risk.",
        },
        {
          isCorrect: true,
          label:
            "Nia may remain uninfected, but both infection and no infection are compatible with the information.",
        },
        {
          isCorrect: false,
          label:
            "Nia certainly will catch influenza because every exposure causes infection.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion is irrelevant because the passage does not discuss influenza transmission.",
        },
        {
          isCorrect: false,
          label:
            "There is no information about whether Nia was exposed to particles from a person with influenza.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nia pasti tidak tertular karena paparan tidak menimbulkan risiko infeksi.",
        },
        {
          isCorrect: true,
          label:
            "Nia mungkin tidak tertular, tetapi tertular maupun tidak tertular masih sesuai dengan informasi.",
        },
        {
          isCorrect: false,
          label:
            "Nia pasti tertular karena setiap paparan selalu menyebabkan infeksi.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tidak relevan karena bacaan tidak membahas penularan influenza.",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada informasi tentang apakah Nia terpapar partikel dari orang yang flu.",
        },
      ],
    },
  },
};

export default item;
