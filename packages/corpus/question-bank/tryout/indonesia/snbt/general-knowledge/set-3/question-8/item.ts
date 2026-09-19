import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der erste Teil klärt die Handelszeit, der folgende erklärt die Veröffentlichung des gesicherten Ergebnisses.",
        },
        {
          isCorrect: true,
          label:
            "Der anfängliche Widerspruch führt zur Quellenprüfung, deren Ergebnis die transparente Beschriftung bestimmt.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht Digitalisierungspläne, der folgende wählt die am leichtesten zu bewahrende Quelle.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil sammelt Aussagen, der folgende ersetzt schriftliche Belege durch die Mehrheitsversion der Befragten.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil bewertet den Reiz der Erzählung, der folgende entwirft ein Schild mit weniger historischen Einzelheiten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The first part establishes the trading time, and the later part explains how to publicize the settled finding.",
        },
        {
          isCorrect: true,
          label:
            "The initial conflict prompts source checking, and the result of that checking shapes the museum’s transparent label.",
        },
        {
          isCorrect: false,
          label:
            "The first part compares digitization plans, and the later part selects the source that is easiest to preserve.",
        },
        {
          isCorrect: false,
          label:
            "The first part gathers testimony, and the later part replaces written records with the account supported by most witnesses.",
        },
        {
          isCorrect: false,
          label:
            "The first part evaluates storytelling appeal, and the later part designs a label with fewer historical details.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan waktu kegiatan pasar, lalu bagian berikutnya menjelaskan cara menyebarluaskan hasil yang sudah pasti.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan awal mendorong pemeriksaan sumber, lalu hasil pemeriksaan menentukan cara museum menulis label secara transparan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan rencana digitalisasi, lalu bagian berikutnya memilih sumber yang paling mudah disimpan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengumpulkan kesaksian, lalu bagian berikutnya mengganti dokumen tertulis dengan versi mayoritas narasumber.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menilai daya tarik cerita, lalu bagian berikutnya merancang label untuk mengurangi jumlah rincian sejarah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
