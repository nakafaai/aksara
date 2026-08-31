import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum sollte die spannendste Geschichte wählen und störende Angaben entfernen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird Korrekturen mit einer überprüfbaren Quellenangabe annehmen.",
        },
        {
          isCorrect: true,
          label:
            "Offenheit über widersprüchliche Quellen kann ein Archiv glaubwürdiger machen, wenn der Status jeder Aussage erklärt wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Written records are always correct, whereas all oral testimony must be rejected.",
        },
        {
          isCorrect: false,
          label:
            "The museum should choose the most engaging story and remove details that disrupt the narrative.",
        },
        {
          isCorrect: false,
          label:
            "The museum will display the exhibition label's revision history.",
        },
        {
          isCorrect: false,
          label:
            "The museum will accept corrections that include a verifiable source trail.",
        },
        {
          isCorrect: true,
          label:
            "Openness about conflicting sources can make an archive more trustworthy when the status of each claim is explained.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
        {
          isCorrect: false,
          label:
            "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita.",
        },
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Keterbukaan terhadap perbedaan sumber dapat membuat arsip lebih dapat dipercaya selama status setiap klaim dijelaskan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
