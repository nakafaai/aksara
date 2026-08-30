import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nudel A in " },
            { display: "block", kind: "math", math: "2019\\text{-}2020" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nudel B in " },
            { display: "block", kind: "math", math: "2017\\text{-}2018" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nudel B in " },
            { display: "block", kind: "math", math: "2018\\text{-}2019" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nudel C in " },
            { display: "block", kind: "math", math: "2019\\text{-}2020" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Nudel A in " },
            { display: "block", kind: "math", math: "2017\\text{-}2018" },
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
            { kind: "text", text: "Noodle A in " },
            { display: "block", kind: "math", math: "2019\\text{-}2020" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Noodle B in " },
            { display: "block", kind: "math", math: "2017\\text{-}2018" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Noodle B in " },
            { display: "block", kind: "math", math: "2018\\text{-}2019" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Noodle C in " },
            { display: "block", kind: "math", math: "2019\\text{-}2020" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Noodle A in " },
            { display: "block", kind: "math", math: "2017\\text{-}2018" },
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
            { kind: "text", text: "Mie A pada tahun " },
            { display: "block", kind: "math", math: "2019\\text{-}2020" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mie B pada tahun " },
            { display: "block", kind: "math", math: "2017\\text{-}2018" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mie B pada tahun " },
            { display: "block", kind: "math", math: "2018\\text{-}2019" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mie C pada tahun " },
            { display: "block", kind: "math", math: "2019\\text{-}2020" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Mie A pada tahun " },
            { display: "block", kind: "math", math: "2017\\text{-}2018" },
          ],
        },
      ],
    },
  },
};

export default item;
