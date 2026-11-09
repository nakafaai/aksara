import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "cracked-voice",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kesal karena anak itu meremehkan kemampuan Gilang",
        },
        {
          correct: false,
          label: "kasihan karena Gilang masih menjadi bahan tertawaan",
        },
        { correct: false, label: "cemas karena Gilang akan dimarahi pelatih" },
        {
          correct: false,
          label: "geli karena tepukan itu tanda Gilang salah masuk",
        },
        {
          correct: true,
          label:
            "ikut merasa hangat karena dukungan kecil itu membuat Gilang diterima di barisan baru",
        },
      ],
    },
  },
};

export default item;
