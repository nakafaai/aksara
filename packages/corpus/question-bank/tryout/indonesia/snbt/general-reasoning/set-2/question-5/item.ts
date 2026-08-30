import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Hemden in " },
            { display: "block", kind: "math", math: "2011\\text{-}2012" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Anzüge in " },
            { display: "block", kind: "math", math: "2014\\text{-}2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Hemden in " },
            { display: "block", kind: "math", math: "2012\\text{-}2013" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Anzüge in " },
            { display: "block", kind: "math", math: "2012\\text{-}2013" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Hosen in " },
            { display: "block", kind: "math", math: "2013\\text{-}2014" },
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
            { kind: "text", text: "Shirts in " },
            { display: "block", kind: "math", math: "2011\\text{-}2012" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Suits in " },
            { display: "block", kind: "math", math: "2014\\text{-}2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Shirts in " },
            { display: "block", kind: "math", math: "2012\\text{-}2013" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Suits in " },
            { display: "block", kind: "math", math: "2012\\text{-}2013" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pants in " },
            { display: "block", kind: "math", math: "2013\\text{-}2014" },
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
            { kind: "text", text: "Baju pada tahun " },
            { display: "block", kind: "math", math: "2011\\text{-}2012" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Jas pada tahun " },
            { display: "block", kind: "math", math: "2014\\text{-}2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Baju pada tahun " },
            { display: "block", kind: "math", math: "2012\\text{-}2013" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jas pada tahun " },
            { display: "block", kind: "math", math: "2012\\text{-}2013" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Celana pada tahun " },
            { display: "block", kind: "math", math: "2013\\text{-}2014" },
          ],
        },
      ],
    },
  },
};

export default item;
