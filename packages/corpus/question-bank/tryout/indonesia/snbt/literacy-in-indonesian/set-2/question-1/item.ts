import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Di bagian sungai yang deras dekat tambang, karena merkuri anorganik di sana paling banyak dan langsung diserap tubuh ikan.",
        },
        {
          correct: true,
          label:
            "Di waduk yang tenang, karena lumpur dasarnya yang miskin oksigen memungkinkan bakteri mengubah merkuri menjadi metilmerkuri.",
        },
        {
          correct: false,
          label:
            "Di waduk yang tenang, karena kadar merkuri total dalam airnya paling tinggi di antara ketiga tempat itu.",
        },
        {
          correct: false,
          label:
            "Di danau berair jernih, karena air yang tenang selalu menghasilkan metilmerkuri paling banyak, dari mana pun merkurinya berasal.",
        },
        {
          correct: false,
          label:
            "Di waduk yang tenang, karena ikan pemakan tumbuhan di sana tentu lebih tua dan lebih besar daripada ikan di sungai.",
        },
      ],
    },
  },
};

export default item;
