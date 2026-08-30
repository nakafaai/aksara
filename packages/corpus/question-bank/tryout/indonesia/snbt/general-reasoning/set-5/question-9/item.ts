import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Verbrauch überschreitet den Grenzwert und der Strom wird unterbrochen",
        },
        {
          isCorrect: false,
          label:
            "Wenn der Strom nicht unterbrochen wird, hat der Verbrauch den Grenzwert nicht überschritten",
        },
        {
          isCorrect: false,
          label:
            "Der Verbrauch überschreitet den Grenzwert nicht oder der Strom wird unterbrochen",
        },
        {
          isCorrect: true,
          label:
            "Der Verbrauch überschreitet den Grenzwert und der Strom wird nicht unterbrochen",
        },
        {
          isCorrect: false,
          label:
            "Es trifft nicht zu, dass der Verbrauch den Grenzwert überschreitet, während der Strom eingeschaltet bleibt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Use exceeds the limit and the power is cut",
        },
        {
          isCorrect: false,
          label: "If the power is not cut, use did not exceed the limit",
        },
        {
          isCorrect: false,
          label: "Use does not exceed the limit or the power is cut",
        },
        {
          isCorrect: true,
          label: "Use exceeds the limit and the power is not cut",
        },
        {
          isCorrect: false,
          label:
            "It is not the case that use exceeds the limit while power remains on",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pemakaian melebihi batas dan aliran listrik terputus",
        },
        {
          isCorrect: false,
          label:
            "Jika aliran listrik tidak terputus, pemakaian tidak melebihi batas",
        },
        {
          isCorrect: false,
          label: "Pemakaian tidak melebihi batas atau aliran listrik terputus",
        },
        {
          isCorrect: true,
          label: "Pemakaian melebihi batas dan aliran listrik tidak terputus",
        },
        {
          isCorrect: false,
          label:
            "Tidak benar bahwa pemakaian melebihi batas sementara listrik tetap menyala",
        },
      ],
    },
  },
};

export default item;
