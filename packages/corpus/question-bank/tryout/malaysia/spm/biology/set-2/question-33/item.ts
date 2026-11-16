import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "variation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Blood group is controlled by genes alone, while body mass is strongly affected by the environment" },
        { correct: false, label: "Height is controlled by the environment alone, because the identical twins differ in height" },
        { correct: false, label: "Blood group shows continuous variation, because it differs between the non-identical twins" },
        { correct: false, label: "The differences between the identical twins are caused by mutations" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Kumpulan darah dikawal oleh gen sahaja, manakala jisim badan sangat dipengaruhi oleh persekitaran" },
        { correct: false, label: "Ketinggian dikawal oleh persekitaran sahaja, kerana kembar seiras berbeza ketinggian" },
        { correct: false, label: "Kumpulan darah menunjukkan variasi selanjar, kerana kumpulan darah kembar tak seiras berbeza" },
        { correct: false, label: "Perbezaan antara kembar seiras disebabkan oleh mutasi" },
      ],
    },
  },
};

export default item;
