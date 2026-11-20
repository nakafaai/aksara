import { courseNode, materialNode, unitNode } from "#corpus/curriculum/schema";
import {
  earthActivityStandards,
  energyStandards,
  evolutionStandards,
  forceStandards,
  mathematicsStandards,
  matterStandards,
} from "#corpus/curriculum/united-states/documents";

export const usHighSchoolScienceCourseNode = courseNode({
  children: [
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-science-physical-measurement",
          level: "lesson",
          materialKeys: ["lesson.physics.measurement"],
          order: 10,
          outcomes: [
            { code: "N-Q Quantities", document: mathematicsStandards },
          ],
        }),
        materialNode({
          key: "us-high-school-science-physical-motion",
          level: "lesson",
          materialKeys: ["lesson.physics.kinematics"],
          order: 20,
          outcomes: [
            { code: "PS2.A Forces and Motion", document: forceStandards },
          ],
        }),
        materialNode({
          key: "us-high-school-science-physical-energy",
          level: "lesson",
          materialKeys: ["lesson.physics.renewable-energy"],
          order: 30,
          outcomes: [
            { code: "PS3.A Definitions of Energy", document: energyStandards },
            {
              code: "PS3.B Conservation of Energy and Energy Transfer",
              document: energyStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-science-physical-matter",
          level: "lesson",
          materialKeys: ["lesson.chemistry.structure-matter"],
          order: 40,
          outcomes: [
            {
              code: "PS1.A Structure and Properties of Matter",
              document: matterStandards,
            },
          ],
        }),
        materialNode({
          key: "us-high-school-science-physical-reactions",
          level: "lesson",
          materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
          order: 50,
          outcomes: [
            { code: "PS1.B Chemical Reactions", document: matterStandards },
          ],
        }),
      ],
      key: "high-school-science-physical-sciences",
      materialCard: {
        de: {
          description: "Verbinde Bewegung, Energie, Stoffe und Reaktionen.",
          title: "Physikalische Wissenschaften",
        },
        en: {
          description: "Connect motion, energy, matter, and reactions.",
          title: "Physical Sciences",
        },
        id: {
          description: "Hubungkan gerak, energi, materi, dan reaksi.",
          title: "Ilmu fisika dan kimia",
        },
        ms: {
          description: "Kaitkan gerakan, tenaga, jirim dan tindak balas.",
          title: "Sains Fizikal",
        },
      },
      order: 10,
      translations: {
        de: {
          routeSlug: "physikalische-wissenschaften",
          title: "Physikalische Wissenschaften",
        },
        en: {
          routeSlug: "physical-sciences",
          title: "Physical Sciences",
        },
        id: {
          routeSlug: "ilmu-fisika-dan-kimia",
          title: "Ilmu fisika dan kimia",
        },
        ms: {
          routeSlug: "sains-fizikal",
          title: "Sains Fizikal",
        },
      },
    }),
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-science-life-biodiversity",
          level: "lesson",
          materialKeys: ["lesson.biology.biodiversity"],
          order: 10,
          outcomes: [
            {
              code: "LS4.A Evidence of Common Ancestry and Diversity",
              document: evolutionStandards,
            },
            {
              code: "LS4.D Biodiversity and Humans",
              document: evolutionStandards,
            },
          ],
        }),
      ],
      key: "high-school-science-life-sciences",
      materialCard: {
        de: {
          description: "Vergleiche Lebewesen und biologische Vielfalt.",
          title: "Lebenswissenschaften",
        },
        en: {
          description: "Compare living systems and the diversity of life.",
          title: "Life Sciences",
        },
        id: {
          description: "Bandingkan sistem hayati dan keragaman makhluk hidup.",
          title: "Ilmu hayati",
        },
        ms: {
          description: "Bandingkan sistem hidupan dan kepelbagaian hidupan.",
          title: "Sains Hayat",
        },
      },
      order: 20,
      translations: {
        de: {
          routeSlug: "lebenswissenschaften",
          title: "Lebenswissenschaften",
        },
        en: {
          routeSlug: "life-sciences",
          title: "Life Sciences",
        },
        id: {
          routeSlug: "ilmu-hayati",
          title: "Ilmu hayati",
        },
        ms: {
          routeSlug: "sains-hayat",
          title: "Sains Hayat",
        },
      },
    }),
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-science-earth-climate",
          level: "lesson",
          materialKeys: ["lesson.biology.climate-change"],
          order: 10,
          outcomes: [
            {
              code: "ESS3.D Global Climate Change",
              document: earthActivityStandards,
            },
          ],
        }),
      ],
      key: "high-school-science-earth-space-sciences",
      materialCard: {
        de: {
          description: "Verfolge den Klimawandel in den Systemen der Erde.",
          title: "Geo- und Weltraumwissenschaften",
        },
        en: {
          description: "Trace climate change through Earth systems.",
          title: "Earth and Space Sciences",
        },
        id: {
          description: "Telusuri perubahan iklim lewat sistem bumi.",
          title: "Ilmu bumi dan antariksa",
        },
        ms: {
          description: "Jejaki perubahan iklim melalui sistem Bumi.",
          title: "Sains Bumi dan Angkasa",
        },
      },
      order: 30,
      translations: {
        de: {
          routeSlug: "geo-und-weltraumwissenschaften",
          title: "Geo- und Weltraumwissenschaften",
        },
        en: {
          routeSlug: "earth-and-space-sciences",
          title: "Earth and Space Sciences",
        },
        id: {
          routeSlug: "ilmu-bumi-dan-antariksa",
          title: "Ilmu bumi dan antariksa",
        },
        ms: {
          routeSlug: "sains-bumi-dan-angkasa",
          title: "Sains Bumi dan Angkasa",
        },
      },
    }),
  ],
  iconKey: "science",
  key: "high-school-science",
  order: 20,
  translations: {
    de: { routeSlug: "naturwissenschaften", title: "Naturwissenschaften" },
    en: {
      routeSlug: "science",
      title: "Science",
    },
    id: {
      routeSlug: "sains",
      title: "Sains",
    },
    ms: {
      routeSlug: "sains",
      title: "Sains",
    },
  },
});
