import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "ein Wort mit identischer Schreibung und Position in zwei Sprachen",
        },
        {
          isCorrect: false,
          label:
            "eine Zusammenfassung ohne Gefahrenstufe und Handlungsaufforderung",
        },
        {
          isCorrect: false,
          label: "eine zusätzliche Warnung, die in der Ausgangsnachricht fehlt",
        },
        {
          isCorrect: true,
          label:
            "ein Ausdruck in der Zielsprache mit vergleichbarer Bedeutung und Funktion",
        },
        {
          isCorrect: false,
          label:
            "eine Aussprachehilfe ohne Übertragung der kommunikativen Bedeutung",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "a word whose spelling and position must be identical in two languages",
        },
        {
          isCorrect: false,
          label: "a summary that removes the danger level and required action",
        },
        {
          isCorrect: false,
          label: "an extra warning that does not occur in the source message",
        },
        {
          isCorrect: true,
          label:
            "an expression in the target language that carries a comparable meaning and function",
        },
        {
          isCorrect: false,
          label:
            "a pronunciation guide without transfer of communicative meaning",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "kata yang ejaan dan urutannya harus sama persis dalam dua bahasa",
        },
        {
          isCorrect: false,
          label:
            "ringkasan yang menghapus tingkat bahaya dan tindakan yang diminta",
        },
        {
          isCorrect: false,
          label: "peringatan tambahan yang tidak terdapat dalam pesan sumber",
        },
        {
          isCorrect: true,
          label:
            "ungkapan dalam bahasa sasaran yang membawa fungsi makna yang sebanding",
        },
        {
          isCorrect: false,
          label: "panduan pelafalan tanpa pemindahan fungsi makna",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
