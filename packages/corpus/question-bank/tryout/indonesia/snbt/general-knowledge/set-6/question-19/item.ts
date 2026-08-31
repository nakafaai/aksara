import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Authentische Restaurierung verbindet Sicherheit, materielle Belege und sichtbare Veränderungen, statt ein Gebäude nur neu oder alt erscheinen zu lassen.",
        },
        {
          isCorrect: false,
          label:
            "Einige Beteiligte glauben, ein sauberes neues Erscheinungsbild ziehe mehr Besucher an.",
        },
        {
          isCorrect: false,
          label:
            "Jedes neue Teil wird dokumentiert, damit Veränderungen erkennbar bleiben.",
        },
        {
          isCorrect: true,
          label:
            "Kartierung und Proben zeigen, dass ein Teil des Holzes ersetzt werden muss, vieles aber verstärkt werden kann.",
        },
        {
          isCorrect: false,
          label:
            "Jedes alte Material muss erhalten bleiben, selbst wenn es Besucher gefährdet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Authentic restoration balances safety, material evidence, and visible change rather than merely making a building look new or old.",
        },
        {
          isCorrect: false,
          label:
            "Some parties believe a clean new appearance would attract more visitors.",
        },
        {
          isCorrect: false,
          label: "Every new part will be recorded so changes remain legible.",
        },
        {
          isCorrect: true,
          label:
            "Mapping and samples show that some timber requires replacement while much can be strengthened.",
        },
        {
          isCorrect: false,
          label:
            "Every old material must be retained even when it endangers visitors.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemugaran yang autentik menyeimbangkan keselamatan, bukti material, dan keterbacaan perubahan, bukan sekadar membuat bangunan tampak baru atau tua.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pihak menganggap tampilan baru yang bersih akan lebih menarik bagi pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
        {
          isCorrect: true,
          label:
            "Pemetaan dan sampel menunjukkan sebagian kayu perlu diganti, sedangkan banyak bagian lain dapat diperkuat.",
        },
        {
          isCorrect: false,
          label:
            "Semua bahan lama harus dipertahankan meskipun membahayakan pengunjung.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
