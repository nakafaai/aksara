import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam penelitian ini, apel utuh menghasilkan rasa kenyang paling tinggi dan total asupan energi yang lebih rendah daripada kondisi tanpa sajian pendahuluan.",
        },
        {
          correct: false,
          label:
            "Makan apel utuh sebelum makan siang selalu mencegah obesitas.",
        },
        {
          correct: false,
          label:
            "Keempat olahan apel menghasilkan tingkat rasa kenyang yang sama.",
        },
        {
          correct: false,
          label:
            "Jus apel menghasilkan total asupan energi yang lebih rendah daripada apel utuh.",
        },
        {
          correct: false,
          label:
            "Penelitian ini membuktikan bahwa serat saja menyebabkan seluruh perbedaan di antara olahan apel.",
        },
      ],
    },
  },
};

export default item;
