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
        { correct: false, label: "bagian sungai yang deras tepat di bawah tambang, karena kadar merkuri total di airnya paling tinggi" },
        { correct: true, label: "waduk tenang berdasar miskin oksigen di hilir, walaupun kadar merkuri total airnya lebih rendah" },
        { correct: false, label: "danau berair jernih yang tidak menerima air dari sungai tambang, karena airnya paling tenang" },
        { correct: false, label: "bagian sungai yang deras tepat di bawah tambang, karena ikan di sana paling dekat dengan sumber merkuri" },
        { correct: false, label: "waduk yang tenang sekitar $$30$$ km di hilir, karena ikan pemakan tumbuhan di sana memakan ikan lain" },
      ],
    },
  },
};

export default item;
