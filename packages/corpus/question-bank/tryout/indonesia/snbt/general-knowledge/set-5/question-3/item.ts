import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Stichprobengröße und Ressourcen werden im Verhältnis zur Reichweite der beabsichtigten Aussage erhöht.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten werden nach einer geplanten Schrittfolge erhoben, die mit denselben Regeln wiederholt wird.",
        },
        {
          isCorrect: true,
          label:
            "Das Team erzielt bei gleicher Qualität ein gleichwertiges Ergebnis mit weniger Zeit und Energie.",
        },
        {
          isCorrect: false,
          label:
            "Das Feldverfahren wird bei verändertem Wetter angepasst, ohne das Hauptziel oder die zentralen Messregeln zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Die Auswirkung ist groß genug, um das Hauptergebnis zu verändern, und nicht nur eine kleine Randabweichung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sample size and resources are increased in proportion to the scope of the intended claim.",
        },
        {
          isCorrect: false,
          label:
            "Data are collected through a planned sequence of steps repeated under the same rules.",
        },
        {
          isCorrect: true,
          label:
            "The team obtains an equivalent output with less time and energy without reducing quality.",
        },
        {
          isCorrect: false,
          label:
            "The field procedure is adjusted when the weather changes without altering the main objective or measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The effect is large enough to change the main outcome rather than merely adding a small edge variation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
        {
          isCorrect: false,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
      ],
    },
  },
};

export default item;
