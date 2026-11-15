import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "bat-echolocation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bunyi bernada tinggi merambat paling jauh, tetapi kelelawar sengaja memendekkan jangkauannya agar tidak didengar ngengat.",
        },
        {
          correct: false,
          label:
            "Bunyi bernada rendah memantul jelas dari serangga, tetapi kelelawar tidak dapat mendengar nada serendah itu.",
        },
        {
          correct: false,
          label:
            "Telinga kelelawar hanya peka terhadap gema dari jarak dekat, berapa pun frekuensi bunyi yang dipancarkannya.",
        },
        {
          correct: true,
          label:
            "Serangga terlalu kecil untuk memantulkan nada rendah, sedangkan nada tinggi yang dibutuhkan cepat melemah di udara.",
        },
        {
          correct: false,
          label:
            "Nada tinggi cepat usang karena mangsa terus berbelok, sehingga kelelawar harus menunggu mangsa mendekat.",
        },
      ],
    },
  },
};

export default item;
