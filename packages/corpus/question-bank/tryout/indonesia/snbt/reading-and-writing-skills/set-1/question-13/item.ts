import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Das Wort _untersuchten_ in Satz $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "Das Wort _begünstigen_ in Satz $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "Das Wort _lässt_ in Satz $$(4)$$.",
        },
        {
          isCorrect: true,
          label: "Das Wort _erzeugen_ in Satz $$(8)$$.",
        },
        {
          isCorrect: false,
          label: "Das Wort _bedrohen_ in Satz $$(9)$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The word _tested_ in sentence $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "The word _facilitate_ in sentence $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "The word _allows_ in sentence $$(4)$$.",
        },
        {
          isCorrect: true,
          label: "The word _produce_ in sentence $$(8)$$.",
        },
        {
          isCorrect: false,
          label: "The word _threaten_ in sentence $$(9)$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kata _diuji_ pada kalimat $$(2)$$.",
        },
        {
          isCorrect: false,
          label: "Kata _membantu_ pada kalimat $$(3)$$.",
        },
        {
          isCorrect: false,
          label: "Kata _memungkinkan_ pada kalimat $$(4)$$.",
        },
        {
          isCorrect: true,
          label: "Kata _menghasilkan_ pada kalimat $$(8)$$.",
        },
        {
          isCorrect: false,
          label: "Kata _mengancam_ pada kalimat $$(9)$$.",
        },
      ],
    },
  },
};

export default item;
