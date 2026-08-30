import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Schlussfolgerung ist definitiv wahr" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist möglicherweise wahr",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Die Schlussfolgerung ist definitiv falsch" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist für die bereitgestellten Informationen irrelevant",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung kann aufgrund unzureichender Informationen nicht bewertet werden",
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
          label: [{ kind: "text", text: "The conclusion is definitely true" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The conclusion is possibly true" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "The conclusion is definitely false" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The conclusion is irrelevant to the information provided",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The conclusion cannot be evaluated due to insufficient information",
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
          label: [{ kind: "text", text: "Simpulan tersebut pasti benar" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Simpulan tersebut mungkin benar" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Simpulan tersebut pasti salah" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan tidak relevan dengan informasi yang diberikan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan tidak dapat dinilai karena informasi tidak cukup",
            },
          ],
        },
      ],
    },
  },
};

export default item;
