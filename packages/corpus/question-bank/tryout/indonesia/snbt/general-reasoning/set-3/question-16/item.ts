import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jicama liefert " },
            { display: "block", kind: "math", math: "14" },
            { kind: "text", text: " Kilokalorien weniger als der Apfel." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jicama enthält " },
            { display: "block", kind: "math", math: "0{,}46" },
            { kind: "text", text: " g mehr Eiweiß als der Apfel." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Apfel enthält weniger Fett als Jicama.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Beide Lebensmittel enthalten weniger als " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " g Eiweiß pro " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " g." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Beide Lebensmittel enthalten weniger als " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " g Fett pro " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " g." },
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
            { kind: "text", text: "Jicama provides " },
            { display: "block", kind: "math", math: "14" },
            { kind: "text", text: " fewer kilocalories than apple." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jicama provides " },
            { display: "block", kind: "math", math: "0.46" },
            { kind: "text", text: " g more protein than apple." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Apple provides less fat than jicama." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Both foods provide less than " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " g of protein per " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " g." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Both foods provide less than " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " g of fat per " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " g." },
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
            { kind: "text", text: "Bengkuang memberikan energi " },
            { display: "block", kind: "math", math: "14" },
            { kind: "text", text: " kkal lebih sedikit daripada apel." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Bengkuang mengandung protein " },
            { display: "block", kind: "math", math: "0{,}46" },
            { kind: "text", text: " g lebih banyak daripada apel." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Apel mengandung lemak lebih sedikit daripada bengkuang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kedua pangan mengandung protein kurang dari ",
            },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " g per " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " g." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kedua pangan mengandung lemak kurang dari ",
            },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " g per " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " g." },
          ],
        },
      ],
    },
  },
};

export default item;
