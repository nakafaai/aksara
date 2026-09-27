import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan sosial hanya disebabkan oleh hubungan antarindividu",
        },
        {
          isCorrect: false,
          label:
            "Kontak dari luar merupakan satu-satunya sumber perubahan sosial",
        },
        {
          isCorrect: true,
          label:
            "Setiap masyarakat berubah, dan sumber perubahan sosial dapat berasal dari dalam maupun luar masyarakat",
        },
        {
          isCorrect: false,
          label:
            "Peneliti harus mengkaji semua perubahan tanpa menentukan perubahan utama",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat hanya berubah ketika dipengaruhi oleh masyarakat lain",
        },
      ],
    },
  },
};

export default item;
