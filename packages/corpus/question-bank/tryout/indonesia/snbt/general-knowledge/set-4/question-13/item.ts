import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Der Konflikt zwischen Einfachheit und lokaler Erinnerung wird durch Quellenprüfung und unterschiedliche Namensfunktionen gelöst.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil findet drei verschiedene Quellen, der folgende gibt ihnen denselben Verwaltungsnamen.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht die Beliebtheit der Namen, der folgende wählt anhand der Zahl der Befürworter einen aus.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil stellt alle Namen für amtliche Dokumente gleich, der folgende entfernt widersprechende Belege.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil schlägt die Bewahrung örtlicher Namen vor, der folgende lehnt sie zugunsten eines einzigen Suchnamens ab.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The conflict between simplicity and local memory is answered through evidence checking and differentiated name functions.",
        },
        {
          isCorrect: false,
          label:
            "The first part identifies three different springs, and the later part gives all of them the same administrative name.",
        },
        {
          isCorrect: false,
          label:
            "The first part compares name popularity, and the later part selects one name by counting its supporters.",
        },
        {
          isCorrect: false,
          label:
            "The first part grants all names equal standing in official documents, and the later part removes conflicting evidence.",
        },
        {
          isCorrect: false,
          label:
            "The first part proposes preserving local names, and the later part rejects this to allow searches under only one name.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Konflik antara kesederhanaan dan ingatan lokal dijawab dengan pemeriksaan bukti serta pembagian fungsi nama.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menemukan tiga mata air berbeda, lalu bagian berikutnya memberi nama administrasi yang sama kepada ketiganya.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menimbang nama yang paling populer, lalu bagian berikutnya memilih satu nama berdasarkan jumlah pendukung.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan semua nama setara untuk dokumen resmi, lalu bagian berikutnya menghapus bukti yang bertentangan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengusulkan pelestarian nama lokal, lalu bagian berikutnya menolaknya agar pencarian memakai satu nama saja.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
