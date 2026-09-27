import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dalam penelitian ini, apel utuh menghasilkan rasa kenyang paling tinggi dan total asupan energi yang lebih rendah daripada kondisi tanpa sajian pendahuluan.",
        },
        {
          isCorrect: false,
          label:
            "Makan apel utuh sebelum makan siang selalu mencegah obesitas.",
        },
        {
          isCorrect: false,
          label:
            "Keempat olahan apel menghasilkan tingkat rasa kenyang yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Jus apel menghasilkan total asupan energi yang lebih rendah daripada apel utuh.",
        },
        {
          isCorrect: false,
          label:
            "Penelitian ini membuktikan bahwa serat saja menyebabkan seluruh perbedaan di antara olahan apel.",
        },
      ],
    },
  },
};

export default item;
