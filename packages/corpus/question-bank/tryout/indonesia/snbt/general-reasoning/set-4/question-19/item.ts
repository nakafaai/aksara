import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Naturreis liefert " },
            { display: "block", kind: "math", math: "7" },
            { kind: "text", text: " kcal weniger Energie als weißer Reis" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Naturreis enthält " },
            { display: "block", kind: "math", math: "1{,}2" },
            { kind: "text", text: " g mehr Ballaststoffe als weißer Reis" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Naturreis enthält " },
            { display: "block", kind: "math", math: "27" },
            { kind: "text", text: " mg mehr Magnesium als weißer Reis" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Naturreis enthält " },
            { display: "block", kind: "math", math: "2{,}59" },
            { kind: "text", text: " g mehr Kohlenhydrate als weißer Reis" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Naturreis enthält " },
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " mg mehr Phosphor als weißer Reis" },
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
            { kind: "text", text: "Brown rice provides " },
            { display: "block", kind: "math", math: "7" },
            { kind: "text", text: " kcal less energy than white rice" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Brown rice provides " },
            { display: "block", kind: "math", math: "1.2" },
            { kind: "text", text: " g more fiber than white rice" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Brown rice provides " },
            { display: "block", kind: "math", math: "27" },
            { kind: "text", text: " mg more magnesium than white rice" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Brown rice provides " },
            { display: "block", kind: "math", math: "2.59" },
            { kind: "text", text: " g more carbohydrate than white rice" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Brown rice provides " },
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " mg more phosphorus than white rice" },
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
            { kind: "text", text: "Nasi merah mengandung energi " },
            { display: "block", kind: "math", math: "7" },
            { kind: "text", text: " kkal lebih rendah daripada nasi putih" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nasi merah mengandung serat " },
            { display: "block", kind: "math", math: "1{,}2" },
            { kind: "text", text: " g lebih tinggi daripada nasi putih" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nasi merah mengandung magnesium " },
            { display: "block", kind: "math", math: "27" },
            { kind: "text", text: " mg lebih tinggi daripada nasi putih" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Nasi merah mengandung karbohidrat " },
            { display: "block", kind: "math", math: "2{,}59" },
            { kind: "text", text: " g lebih tinggi daripada nasi putih" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nasi merah mengandung fosfor " },
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " mg lebih tinggi daripada nasi putih" },
          ],
        },
      ],
    },
  },
};

export default item;
