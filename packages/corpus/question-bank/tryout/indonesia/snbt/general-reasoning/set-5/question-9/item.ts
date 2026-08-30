import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Verbrauch überschreitet den Grenzwert und der Strom wird unterbrochen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn der Strom nicht unterbrochen wird, hat der Verbrauch den Grenzwert nicht überschritten",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Verbrauch überschreitet den Grenzwert nicht oder der Strom wird unterbrochen",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Verbrauch überschreitet den Grenzwert und der Strom wird nicht unterbrochen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es trifft nicht zu, dass der Verbrauch den Grenzwert überschreitet, während der Strom eingeschaltet bleibt",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Use exceeds the limit and the power is cut",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If the power is not cut, use did not exceed the limit",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Use does not exceed the limit or the power is cut",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Use exceeds the limit and the power is not cut",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is not the case that use exceeds the limit while power remains on",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pemakaian melebihi batas dan aliran listrik terputus",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika aliran listrik tidak terputus, pemakaian tidak melebihi batas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pemakaian tidak melebihi batas atau aliran listrik terputus",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pemakaian melebihi batas dan aliran listrik tidak terputus",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak benar bahwa pemakaian melebihi batas sementara listrik tetap menyala",
            },
          ],
        },
      ],
    },
  },
};

export default item;
