import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Total iuran naik dari $$2{,}4\\%$$ menjadi $$3{,}15\\%$$ dari seluruh gaji, dan rata-rata iuran peserta juga naik." },
        { correct: false, label: "Total iuran turun dari $$6\\%$$ menjadi $$3{,}5\\%$$ dari seluruh gaji, karena sebagian besar peserta kini memakai iuran bawaan $$3\\%$$." },
        { correct: false, label: "Total iuran naik dari $$2{,}4\\%$$ menjadi $$4{,}05\\%$$ dari seluruh gaji, sedangkan rata-rata iuran peserta turun dari $$6\\%$$ menjadi $$3{,}5\\%$$." },
        { correct: false, label: "Total iuran tidak berubah, karena kenaikan banyak peserta tepat diimbangi turunnya iuran per peserta." },
        { correct: true, label: "Total iuran naik dari $$2{,}4\\%$$ menjadi $$3{,}15\\%$$ dari seluruh gaji, sedangkan rata-rata iuran peserta turun dari $$6\\%$$ menjadi $$3{,}5\\%$$." },
      ],
    },
  },
};

export default item;
