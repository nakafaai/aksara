import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team testete die neuen Symbole, weil die alten Schilder bereits nachweislich unwirksam waren.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte die neuen Symbole dauerhaft ein, während die alte Karte nur im Archiv erhalten blieb.",
        },
        {
          isCorrect: true,
          label:
            "Das Team nutzte in den Versuchsdurchgängen neue Symbole, während in den Vergleichsdurchgängen die bisherige Karte und die alten Schilder bestehen blieben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team nutzte die neuen Symbole und alten Schilder unter derselben Bedingung ohne getrennten Vergleich.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich die Nutzung der neuen Symbole mit Rückmeldungen zur alten Karte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested the new symbols because the old signs had already been proved ineffective.",
        },
        {
          isCorrect: false,
          label:
            "The team adopted the new symbols permanently, while the old map was kept only in the archive.",
        },
        {
          isCorrect: true,
          label:
            "The team used new symbols in trial sessions, while comparison sessions retained the previous map and signs.",
        },
        {
          isCorrect: false,
          label:
            "The team used the new symbols and old signs in the same condition without a separate comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team compared use of the new symbols with participants’ comments about the old map.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji simbol baru karena penanda lama sudah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan simbol baru secara permanen, sedangkan peta lama hanya disimpan dalam arsip.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, tim memakai simbol baru, sedangkan pada sesi pembanding peta dan penanda lama tetap digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Tim memakai simbol baru dan penanda lama dalam kondisi yang sama tanpa pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan penggunaan simbol baru dengan komentar peserta tentang peta lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
