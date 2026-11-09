import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "mangrove-carbon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pohon mangrove menyerap karbon dioksida jauh lebih cepat daripada tumbuhan lain.",
        },
        {
          correct: true,
          label:
            "Genangan yang hampir tanpa oksigen membuat sisa tumbuhan sangat lambat terurai dan menumpuk.",
        },
        {
          correct: false,
          label:
            "Air laut membawa karbon dari daratan dan mengendapkannya di sela-sela akar mangrove.",
        },
        {
          correct: false,
          label:
            "Akar napas mangrove memompa karbon dioksida dari udara ke dalam lapisan tanah.",
        },
        {
          correct: false,
          label:
            "Ombak yang tertahan akar mangrove perlahan mengubah lumpur menjadi karbon.",
        },
      ],
    },
  },
};

export default item;
