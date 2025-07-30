<template>
  <div class="about-page">
    <AppHeader active-link="About Us" />

    <!-- Hero Section - Full Width -->
    <section class="about-hero">
      <div class="about-hero-content">
        <h1 class="about-hero-title">MORE ABOUT US</h1>
        <p class="about-hero-subtitle">Everything you need to know about us</p>
      </div>
    </section>

    <!-- Main Content Container -->
    <div class="about-main-content">
      <!-- About Us Intro Section -->
      <section class="about-intro">
        <div class="about-intro-image">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6efb51b2fa22a435a8282ed11439b6fe508f35f?width=1830"
            alt="HelloGIT club members at Greenwich University Vietnam"
          />
        </div>
        <div class="about-intro-content">
          <p class="about-intro-year">Since 2021</p>
          <h2 class="about-intro-title">HELLOGIT</h2>
          <p class="about-intro-description">
            HelloGIT is the IT club of Greenwich University Vietnam, Ho Chi Minh
            campus. The club always wants to create a connecting environment for
            IT students in particular and students at Greenwich University in
            Vietnam.
          </p>
        </div>
      </section>

      <!-- Team Section -->
      <section class="about-team">
        <div class="about-team-grid">
          <AboutUsCard
            v-for="member in teamMembers"
            :key="member.id"
            :member="member"
          />
        </div>
      </section>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { AppHeader, AppFooter, AboutUsCard } from "../components";

export default {
  name: "AboutUs",
  components: {
    AppHeader,
    AppFooter,
    AboutUsCard,
  },
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Leader",
          description:
            "Passionate about technology and leading innovative projects. Has been driving the club's vision since its inception and mentors new members.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/42f35469d1af2cb8af6bdba1c4cc1306a4955d64?width=660",
        },
        {
          id: 2,
          name: "Sarah Chen",
          role: "Member",
          description:
            "Full-stack developer with expertise in modern web technologies. Specializes in React and Node.js development.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/f0e3a5253a3008bc0f9b3447c2369c1c022c349a?width=700",
        },
        {
          id: 3,
          name: "Michael Rodriguez",
          role: "Member",
          description:
            "UI/UX designer and frontend developer. Creates beautiful and functional user interfaces for club projects.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/060d60ebd1202444670dfeda4a16b96e918c8224?width=640",
        },
        {
          id: 4,
          name: "Dang Tan Kiet",
          role: "Member",
          description:
            "An energetic and inspirational person who has been participating in the club for 2.5 days and has great potential for multi-level business.\n\nExperience: 1.000.000 hours of banana and CS2.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/ba37158cab66c96c42b93e831b9792d9238820f6?width=700",
        },
        {
          id: 5,
          name: "Emily Wang",
          role: "Member",
          description:
            "Data scientist and machine learning enthusiast. Works on AI projects and helps organize technical workshops.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 6,
          name: "David Kim",
          role: "Member",
          description:
            "Cybersecurity specialist and ethical hacker. Conducts security audits and teaches safe coding practices.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 7,
          name: "Lisa Thompson",
          role: "Member",
          description:
            "Mobile app developer specializing in React Native and Flutter. Has published several apps on both platforms.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 8,
          name: "James Wilson",
          role: "Member",
          description:
            "DevOps engineer and cloud infrastructure specialist. Manages the club's deployment pipelines and server infrastructure.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 9,
          name: "Maria Garcia",
          role: "Member",
          description:
            "Game developer and 3D artist. Creates interactive experiences and leads game development workshops.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 10,
          name: "Robert Anderson",
          role: "Member",
          description:
            "Backend developer specializing in microservices architecture. Builds scalable APIs and database systems.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 11,
          name: "Anna Martinez",
          role: "Member",
          description:
            "Technical writer and documentation specialist. Creates clear guides and tutorials for club projects.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
        {
          id: 12,
          name: "Kevin Zhang",
          role: "Member",
          description:
            "Blockchain developer and cryptocurrency enthusiast. Researches decentralized technologies and smart contracts.",
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/857b383af66c37b677aefb9a990bd972017bcf32?width=700",
        },
      ],
    };
  },
};
</script>
