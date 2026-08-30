import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "GPS Collar" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kamera jebak" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kompas" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Radio genggam" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Penerima satelit" }],
        },
      ],
    },
  },
};

export default item;
