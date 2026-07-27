import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import HotelLobby from "../assets/images/HotelLobbyBG.png";

import {
  FaHotel,
  FaAward,
  FaGlobe,
  FaHeart,
  FaStar,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const styles = {
  page: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    color: "#333",
    lineHeight: 1.6,
    margin: 0,
    paddingTop: "10rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  sectionTitle: {
    fontSize: "2.25rem",
    color: "#87723B",
    textAlign: "center",
    marginBottom: "1rem",
  },
  sectionDescription: {
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto 3rem",
    color: "#666",
    fontSize: "1.1rem",
  },
  storySection: {
    backgroundColor: "#ffffff",
    padding: "5rem 2rem",
  },
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  storyContent: {
    padding: "2rem 0",
  },
  storyTitle: {
    fontSize: "2rem",
    color: "#87723B",
    marginBottom: "1.5rem",
    fontWeight: 600,
  },
  storyText: {
    color: "#666",
    fontSize: "1rem",
    lineHeight: "1.8",
    marginBottom: "1.5rem",
  },
  storyImage: {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    objectFit: "cover",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  valuesSection: {
    backgroundColor: "#f8f5f0",
    padding: "5rem 2rem",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  valueCard: {
    backgroundColor: "white",
    padding: "2.5rem 2rem",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
    border: "1px solid #f0f0f0",
  },
  valueIcon: {
    fontSize: "2.75rem",
    color: "#D09500",
    marginBottom: "1.25rem",
  },
  valueTitle: {
    fontSize: "1.25rem",
    color: "#87723B",
    marginBottom: "0.75rem",
    fontWeight: 600,
  },
  valueDescription: {
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  },
  statsSection: {
    backgroundColor: "#87723B",
    color: "white",
    padding: "4rem 2rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  statCard: {
    padding: "1.5rem",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#D09500",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "1rem",
    opacity: "0.9",
  },
  teamSection: {
    backgroundColor: "#ffffff",
    padding: "5rem 2rem",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  teamCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
    border: "1px solid #f0f0f0",
  },
  teamImageWrapper: {
    width: "100%",
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f5f0",
  },
  teamImagePhoto: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  },
  teamContent: {
    padding: "1.75rem",
    textAlign: "center",
  },
  teamName: {
    fontSize: "1.25rem",
    color: "#87723B",
    marginBottom: "0.5rem",
    fontWeight: 600,
  },
  teamPosition: {
    color: "#D09500",
    fontSize: "0.95rem",
    marginBottom: "1rem",
    fontWeight: 500,
  },
  teamBio: {
    color: "#666",
    fontSize: "0.9rem",
    lineHeight: "1.6",
    marginBottom: "1.25rem",
  },
  teamSocial: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
  },
  socialLink: {
    color: "#87723B",
    fontSize: "1.1rem",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  timeline: {
    maxWidth: "800px",
    margin: "0 auto",
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: "119px",
    top: "0.5rem",
    bottom: "0.5rem",
    width: "2px",
    backgroundColor: "#e8ddc8",
  },
  timelineItem: {
    display: "flex",
    marginBottom: "3rem",
    position: "relative",
  },
  timelineMarker: {
    minWidth: "120px",
    paddingRight: "2rem",
    paddingTop: "0.3rem",
    position: "relative",
    boxSizing: "border-box",
  },
  timelineDate: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#87723B",
    letterSpacing: "0.3px",
  },
  timelineDot: {
    position: "absolute",
    right: "-8px",
    top: "0.6rem",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#D09500",
    border: "3px solid #f8f5f0",
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f0f0f0",
  },
  timelineTitle: {
    fontSize: "1.1rem",
    color: "#87723B",
    marginBottom: "0.5rem",
    fontWeight: 600,
  },
  timelineDescription: {
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  },
  awardsSection: {
    backgroundColor: "#ffffff",
    padding: "5rem 2rem",
  },
  awardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  awardCard: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#f8f5f0",
    borderRadius: "12px",
    transition: "transform 0.3s",
  },
  awardIcon: {
    fontSize: "2.5rem",
    color: "#D09500",
    marginBottom: "1rem",
  },
  awardTitle: {
    fontSize: "1.1rem",
    color: "#87723B",
    marginBottom: "0.5rem",
    fontWeight: 600,
  },
  awardYear: {
    color: "#666",
    fontSize: "0.9rem",
  },
  ctaSection: {
    background: "linear-gradient(135deg, #87723B, #D09500)",
    color: "white",
    padding: "5rem 2rem",
    textAlign: "center",
  },
  ctaContainer: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  ctaTitle: {
    color: "white",
    marginBottom: "1.25rem",
    fontSize: "2.5rem",
  },
  ctaDescription: {
    marginBottom: "2.5rem",
    fontSize: "1.25rem",
    opacity: "0.9",
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  primaryButton: {
    display: "inline-block",
    padding: "0.875rem 2rem",
    backgroundColor: "white",
    color: "#D09500",
    fontWeight: 600,
    fontSize: "1.125rem",
    borderRadius: "6px",
    transition: "all 0.2s",
    cursor: "pointer",
    textDecoration: "none",
    border: "1px solid #D09500",
  },
  footer: {
    backgroundColor: "#222",
    color: "#f8f5f0",
    paddingTop: "4rem",
  },
  footerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem 3rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "3rem",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#D09500",
    marginBottom: "1rem",
  },
  footerText: {
    color: "#ccc",
    marginBottom: "0.5rem",
    fontSize: "0.95rem",
  },
  footerTitle: {
    color: "#D09500",
    marginBottom: "1.25rem",
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  footerLink: {
    color: "#ccc",
    transition: "color 0.2s",
    display: "block",
    marginBottom: "0.75rem",
    textDecoration: "none",
  },
  footerBottom: {
    backgroundColor: "#111",
    padding: "1.5rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  copyright: {
    color: "#999",
    fontSize: "0.9rem",
  },
  footerLinks: {
    display: "flex",
    gap: "1.5rem",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "General Manager",
      bio: "...",
      image: "https://i.pravatar.cc/300?img=47",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Michael Chen",
      position: "Executive Chef",
      bio: "...",
      image: "https://i.pravatar.cc/300?img=13",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Emily Rodriguez",
      position: "Guest Relations Director",
      bio: "...",
      image: "https://i.pravatar.cc/300?img=32",
      social: {
        linkedin: "#",
        facebook: "#",
      },
    },
  ];
  const timelineEvents = [
    {
      year: "1995",
      title: "Foundation",
      description:
        "Royal Gold was established with a vision to provide exceptional hospitality experiences in Batam.",
    },
    {
      year: "2001",
      title: "First Expansion",
      description:
        "Added 50 additional rooms and introduced our signature spa services.",
    },
    {
      year: "2008",
      title: "5-Star Recognition",
      description:
        "Achieved 5-star rating and received our first international hospitality award.",
    },
    {
      year: "2015",
      title: "Renovation & Modernization",
      description:
        "Complete property renovation with modern amenities and sustainable practices.",
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description:
        "Launched contactless services and enhanced digital guest experience platform.",
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description:
        "Achieved carbon-neutral certification and launched eco-friendly programs.",
    },
  ];

  const awards = [
    {
      title: "Best Luxury Hotel",
      year: "2023",
      organization: "Travel Excellence Awards",
    },
    {
      title: "Outstanding Service",
      year: "2022",
      organization: "Hospitality Industry Awards",
    },
    {
      title: "Eco-Friendly Hotel",
      year: "2023",
      organization: "Green Tourism Board",
    },
    {
      title: "Guest Choice Award",
      year: "2021-2023",
      organization: "TravelGuide Reviews",
    },
  ];

  return (
    <div style={styles.page}>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <motion.section
        style={styles.storySection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          style={
            isMobile
              ? { ...styles.storyGrid, gridTemplateColumns: "1fr", gap: "2rem" }
              : styles.storyGrid
          }
        >
          <div style={styles.storyContent}>
            <h2 style={styles.storyTitle}>Our Journey Began in 1995</h2>
            <p style={styles.storyText}>
              What started as a small boutique hotel with a big dream has grown
              into one of Batam's most prestigious hospitality destinations. Our
              founders envisioned a place where traditional Indonesian warmth
              meets modern luxury.
            </p>
            <p style={styles.storyText}>
              Today, Royal Gold Batam Hotel stands as a testament to our
              commitment to excellence, having welcomed guests from around the
              world and created countless memorable experiences.
            </p>
            <p style={styles.storyText}>
              Every corner of our hotel tells a story of dedication,
              craftsmanship, and the pursuit of perfection in hospitality
              service.
            </p>
          </div>
          <div>
            <img
              src={HotelLobby || "/placeholder.svg"}
              alt="Hotel Lobby"
              style={styles.storyImage}
            />
          </div>
        </div>
      </motion.section>
      <motion.section
        style={styles.valuesSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Core Values</h2>
          <p style={styles.sectionDescription}>
            The principles that guide everything we do
          </p>

          <div style={styles.valuesGrid}>
            <div
              style={styles.valueCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div style={styles.valueIcon}>
                <FaHeart />
              </div>
              <h3 style={styles.valueTitle}>Genuine Hospitality</h3>
              <p style={styles.valueDescription}>
                We believe in treating every guest like family, providing warm,
                personalized service that creates lasting memories.
              </p>
            </div>

            <div
              style={styles.valueCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div style={styles.valueIcon}>
                <FaStar />
              </div>
              <h3 style={styles.valueTitle}>Excellence</h3>
              <p style={styles.valueDescription}>
                We strive for perfection in every detail, from our luxurious
                accommodations to our exceptional dining experiences.
              </p>
            </div>

            <div
              style={styles.valueCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div style={styles.valueIcon}>
                <FaGlobe />
              </div>
              <h3 style={styles.valueTitle}>Sustainability</h3>
              <p style={styles.valueDescription}>
                We are committed to protecting our beautiful environment through
                eco-friendly practices and sustainable tourism.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        style={styles.statsSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, color: "white" }}>
            Our Achievements
          </h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>25+</div>
              <div style={styles.statLabel}>Years of Excellence</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>50K+</div>
              <div style={styles.statLabel}>Happy Guests</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>15</div>
              <div style={styles.statLabel}>Industry Awards</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Guest Satisfaction</div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        style={styles.teamSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Meet Our Leadership Team</h2>
          <p style={styles.sectionDescription}>
            The passionate professionals behind your exceptional experience
          </p>

          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={styles.teamCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={styles.teamImageWrapper}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={styles.teamImagePhoto}
                  />
                </div>
                <div style={styles.teamContent}>
                  <h3 style={styles.teamName}>{member.name}</h3>
                  <p style={styles.teamPosition}>{member.position}</p>
                  <p style={styles.teamBio}>{member.bio}</p>
                  <div style={styles.teamSocial}>
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        style={styles.socialLink}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#D09500";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#87723B";
                        }}
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        style={styles.socialLink}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#D09500";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#87723B";
                        }}
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        style={styles.socialLink}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#D09500";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#87723B";
                        }}
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {member.social.facebook && (
                      <a
                        href={member.social.facebook}
                        style={styles.socialLink}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#D09500";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#87723B";
                        }}
                      >
                        <FaFacebook />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        style={styles.timelineSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Journey Through Time</h2>
          <p style={styles.sectionDescription}>
            Key milestones in our commitment to hospitality excellence
          </p>

          <div style={styles.timeline}>
            <div style={styles.timelineLine} />
            {timelineEvents.map((event, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineMarker}>
                  <div style={styles.timelineDate}>{event.year}</div>
                  <div style={styles.timelineDot} />
                </div>
                <div style={styles.timelineContent}>
                  <h3 style={styles.timelineTitle}>{event.title}</h3>
                  <p style={styles.timelineDescription}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        style={styles.awardsSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Recognition & Awards</h2>
          <p style={styles.sectionDescription}>
            Honored by industry leaders for our commitment to excellence
          </p>

          <div style={styles.awardsGrid}>
            {awards.map((award, index) => (
              <div
                key={index}
                style={styles.awardCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div style={styles.awardIcon}>
                  <FaAward />
                </div>
                <h3 style={styles.awardTitle}>{award.title}</h3>
                <p style={styles.awardYear}>{award.year}</p>
                <p style={{ ...styles.awardYear, fontSize: "0.8rem" }}>
                  {award.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        style={styles.ctaSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: "some" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Experience Our Story Yourself</h2>
          <p style={styles.ctaDescription}>
            Join thousands of satisfied guests who have made Royal Gold Batam
            Hotel their home away from home
          </p>
          <div style={styles.ctaButtons}>
            <Link
              to="/"
              style={styles.primaryButton}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.transform = "none";
              }}
            >
              Book Your Stay
            </Link>
            <Link
              to="/contact"
              style={styles.primaryButton}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.transform = "none";
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.section>
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div>
            <div style={styles.footerLogo}>
              <FaHotel style={{ marginRight: "0.5rem" }} />
              <span>Royal Gold</span>
            </div>
            <p style={styles.footerText}>
              Experience luxury, comfort, and convenience at its finest. Your
              perfect stay starts here.
            </p>
          </div>

          <div>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <Link to="/home" style={styles.footerLink}>
              Rooms & Suites
            </Link>
            <Link to="/home" style={styles.footerLink}>
              Amenities
            </Link>
            <Link to="/contact" style={styles.footerLink}>
              Location
            </Link>
            <Link to="/contact" style={styles.footerLink}>
              Contact Us
            </Link>
          </div>

          <div>
            <h3 style={styles.footerTitle}>Contact</h3>
            <p style={styles.footerText}>123 Hotel Street</p>
            <p style={styles.footerText}>Batam, Indonesia 29432</p>
            <p style={styles.footerText}>Phone: +62 778 123-4567</p>
            <p style={styles.footerText}>Email: info@royalgold.com</p>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>
            &copy; 2026 Royal Gold. All rights reserved.
          </p>
          <div style={styles.footerLinks}>
            <Link
              to="/privacyPolicy"
              style={{ ...styles.footerLink, marginBottom: 0 }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/termsOfService"
              style={{ ...styles.footerLink, marginBottom: 0 }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
