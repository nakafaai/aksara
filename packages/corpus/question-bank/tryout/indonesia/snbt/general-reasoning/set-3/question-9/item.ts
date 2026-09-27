import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Penghentian tambang timah ilegal pasti akan merusak DAS.",
        },
        {
          isCorrect: false,
          label:
            "Karena penambang ilegal beroperasi secara terbuka, banjir tidak mungkin terjadi pada musim hujan.",
        },
        {
          isCorrect: false,
          label:
            "Kerusakan DAS dan sedimentasi tambang tidak mengancam masyarakat di sekitarnya.",
        },
        {
          isCorrect: false,
          label:
            "Sedimentasi tambang memperbaiki aliran sungai dan mencegah alurnya terganggu.",
        },
        {
          isCorrect: true,
          label:
            "Sedimentasi tambang dan alur yang terganggu dapat mengurangi kapasitas sungai serta meningkatkan risiko banjir pada musim hujan.",
        },
      ],
    },
  },
};

export default item;
