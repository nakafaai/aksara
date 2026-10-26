import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Penghentian tambang timah ilegal pasti akan merusak DAS.",
        },
        {
          correct: false,
          label:
            "Karena penambang ilegal beroperasi secara terbuka, banjir tidak mungkin terjadi pada musim hujan.",
        },
        {
          correct: false,
          label:
            "Kerusakan DAS dan sedimentasi tambang tidak mengancam masyarakat di sekitarnya.",
        },
        {
          correct: false,
          label:
            "Sedimentasi tambang memperbaiki aliran sungai dan mencegah alurnya terganggu.",
        },
        {
          correct: true,
          label:
            "Sedimentasi tambang dan alur yang terganggu dapat mengurangi kapasitas sungai serta meningkatkan risiko banjir pada musim hujan.",
        },
      ],
    },
  },
};

export default item;
