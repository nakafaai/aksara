import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "lost-girl",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Arif membelikan Nisa sandal baru di pasar." },
        {
          correct: true,
          label:
            "Arif menggandeng Nisa ke pos keamanan di dekat pintu masuk pasar.",
        },
        {
          correct: true,
          label: "Arif membagi roti yang tadinya untuk bekalnya sendiri.",
        },
        {
          correct: true,
          label: "Arif tetap menemani Nisa sampai ibunya datang.",
        },
      ],
    },
  },
};

export default item;
