import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Perubahan sosial hanya disebabkan oleh hubungan antarindividu",
        },
        {
          correct: false,
          label:
            "Kontak dari luar merupakan satu-satunya sumber perubahan sosial",
        },
        {
          correct: true,
          label:
            "Setiap masyarakat berubah, dan sumber perubahan sosial dapat berasal dari dalam maupun luar masyarakat",
        },
        {
          correct: false,
          label:
            "Peneliti harus mengkaji semua perubahan tanpa menentukan perubahan utama",
        },
        {
          correct: false,
          label:
            "Masyarakat hanya berubah ketika dipengaruhi oleh masyarakat lain",
        },
      ],
    },
  },
};

export default item;
