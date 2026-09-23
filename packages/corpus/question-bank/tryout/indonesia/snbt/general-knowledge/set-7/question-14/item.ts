import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Anfang erklärt das schriftliche Stück zum Original, der spätere Teil entfernt mündliche Varianten aus der Aufführung.",
        },
        {
          isCorrect: true,
          label:
            "Vielfältige Quellen prägen die Inszenierung, danach verbessert eine Publikumsprobe die Darstellung und das Programm erklärt Änderungen.",
        },
        {
          isCorrect: false,
          label:
            "Der Anfang vermischt Fassungen ohne Erklärung, der spätere Teil verbirgt Quellen zugunsten freier Deutung.",
        },
        {
          isCorrect: false,
          label:
            "Der Anfang lehnt Änderungen der Geschichte ab, der spätere Teil misst Treue an wortgetreuer Übereinstimmung.",
        },
        {
          isCorrect: false,
          label:
            "Der Anfang prüft Publikumsreaktionen, der spätere Teil wählt die älteste Fassung durch Mehrheitsentscheidung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The opening establishes the written script as original, and the later part removes oral variants from the performance.",
        },
        {
          isCorrect: true,
          label:
            "Diverse sources shape the staging, then audience testing refines its presentation and programme notes explain the changes.",
        },
        {
          isCorrect: false,
          label:
            "The opening blends versions without explanation, and the later part hides sources to leave interpretation open.",
        },
        {
          isCorrect: false,
          label:
            "The opening rejects changes to the story, and the later part measures faithfulness through identical wording.",
        },
        {
          isCorrect: false,
          label:
            "The opening tests audience responses, and the later part selects the oldest version by majority vote.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan naskah tertulis sebagai versi asli, lalu bagian berikutnya menghapus variasi lisan dari pertunjukan.",
        },
        {
          isCorrect: true,
          label:
            "Keragaman sumber mendorong rancangan panggung, lalu uji penonton memperbaiki penyajian dan catatan program menjelaskan perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menggabungkan versi tanpa penjelasan, lalu bagian berikutnya menyembunyikan sumber agar penonton bebas menafsirkan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menolak perubahan cerita, lalu bagian berikutnya mengukur kesetiaan melalui kesamaan setiap kata dengan naskah.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menguji tanggapan penonton, lalu bagian berikutnya memilih versi tertua berdasarkan suara terbanyak.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
