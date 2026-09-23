import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Protokoll zeigt Hindernisse, anschließend sollen Verfahrensänderungen sie verringern und die Repräsentation prüfen.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil belegt die Vertretung aller Gruppen, der folgende beendet die Prüfung der Herkunft der Teilnehmenden.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht Fahrtkosten, der folgende wählt einen Termin anhand des günstigsten Fahrdienstes.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil nimmt alle Vorschläge an, der folgende plant die Umsetzung jedes Wunsches der Bewohner.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil kritisiert offene Einladungen, der folgende beschränkt die Entscheidung auf Bewohner aus der Nähe.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The meeting record reveals barriers, and procedural changes are then designed to reduce them and test representation.",
        },
        {
          isCorrect: false,
          label:
            "The first part proves that every group is represented, and the later part ends checks on participant origins.",
        },
        {
          isCorrect: false,
          label:
            "The first part compares transport costs, and the later part selects a schedule using the cheapest service.",
        },
        {
          isCorrect: false,
          label:
            "The first part accepts all proposals, and the later part plans how to implement every resident’s wish.",
        },
        {
          isCorrect: false,
          label:
            "The first part criticises open invitations, and the later part limits decisions to residents from nearby areas.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Catatan rapat mengungkap hambatan, lalu perubahan prosedur dirancang untuk mengurangi hambatan dan menguji keterwakilan.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membuktikan semua kelompok telah terwakili, lalu bagian berikutnya menghapus pemeriksaan asal peserta.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan biaya angkutan, lalu bagian berikutnya memilih jadwal berdasarkan layanan termurah.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menerima semua usulan, lalu bagian berikutnya menyusun cara menerapkan setiap keinginan warga.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengkritik undangan terbuka, lalu bagian berikutnya membatasi keputusan kepada warga dari wilayah terdekat.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
