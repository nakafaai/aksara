import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Benda yang berulang terutama membangun latar dan hanya sedikit berhubungan dengan konflik.",
        },
        {
          isCorrect: true,
          label:
            "Pilihan kecil Galih mengubah makna serpihan cat biru dalam menghadapi konflik di bangunan tua yang sedang dipugar.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir tokoh menghapus ketegangan makna yang sebelumnya dimiliki benda tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan memakai foreshadowing sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Latar menyelesaikan konflik sebelum tindakan akhir tokoh mengubah makna benda.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
