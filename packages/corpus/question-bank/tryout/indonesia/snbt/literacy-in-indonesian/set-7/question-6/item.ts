import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Di bait pertama "membaca" berarti memakai tabel pasang, dan di akhir puisi maknanya berubah menjadi mengenali irama naik turun dalam hidup.',
        },
        {
          correct: false,
          label:
            'Di bait pertama "membaca" berarti melihat jam dinding, dan di akhir puisi maknanya tetap sama karena ayah menyuruh aku memperhatikan jam ponselnya.',
        },
        {
          correct: true,
          label:
            'Di bait pertama "membaca" berarti mengenali tanda alam untuk tahu kapan harus bertindak, dan di akhir puisi maknanya diperluas menjadi mengenali irama naik turun dalam hidup.',
        },
        {
          correct: false,
          label:
            'Di bait pertama "membaca" berarti mengenali tanda alam, dan di akhir puisi maknanya dipersempit menjadi mengenali pasang laut di kota tempat aku tinggal.',
        },
        {
          correct: false,
          label:
            'Di bait pertama "membaca" berarti menebak tanpa dasar, dan di akhir puisi ayah mengakui bahwa tebakannya tentang laut sering keliru.',
        },
      ],
    },
  },
};

export default item;
