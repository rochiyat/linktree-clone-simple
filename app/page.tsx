"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Twitter, Github, Mail, Globe, Youtube, Settings, Check } from "lucide-react"
import styles from "./linktree.module.css"

export default function LinktreePage() {
  const [isEditMode, setIsEditMode] = useState(false)

  const [linkColors, setLinkColors] = useState({
    0: "purple",
    1: "blue",
    2: "red",
    3: "green",
  })

  const colorOptions = [
    { name: "purple" },
    { name: "blue" },
    { name: "green" },
    { name: "red" },
    { name: "orange" },
    { name: "pink" },
  ]

  const links = [
    {
      title: "Portfolio Website",
      url: "https://rochiyat.my.id",
      icon: <Globe className="w-5 h-5" />,
      description: "Check out my latest projects",
    },
    {
      title: "GitHub",
      url: "https://github.com/rochiyat",
      icon: <Github className="w-5 h-5" />,
      description: "View my code repositories",
    },
    {
      title: "YouTube Channel",
      url: "https://www.youtube.com/@rochiyatdev7040",
      icon: <Youtube className="w-5 h-5" />,
      description: "Subscribe for tech tutorials",
    },
    {
      title: "Contact Me",
      url: "mailto:rochiyat@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      description: "Let's work together",
    },
  ]

  const socialLinks = [
    { icon: <Instagram className="w-6 h-6" />, url: "https://instagram.com/rochiyat" },
    { icon: <Twitter className="w-6 h-6" />, url: "https://twitter.com/12ochiyat" },
    { icon: <Github className="w-6 h-6" />, url: "https://github.com/rochiyat" },
  ]

  const updateLinkColor = (linkIndex: number, colorName: string) => {
    setLinkColors((prev) => ({
      ...prev,
      [linkIndex]: colorName,
    }))
  }

  const getLinkColor = (linkIndex: number) => {
    return linkColors[linkIndex] || "purple"
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <button
            className={`${styles.customizeButton} ${isEditMode ? styles.active : styles.inactive}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            {isEditMode ? "Done" : "Customize"}
          </button>
        </div>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <Avatar className={styles.avatar}>
            <AvatarImage src="https://github.com/rochiyat.png?height=96&width=96" alt="Profile" />
            <AvatarFallback className={styles.avatarFallback}>JD</AvatarFallback>
          </Avatar>

          <h1 className={styles.profileName}>John Doe</h1>

          <p className={styles.profileDescription}>
            Full Stack Developer & Content Creator
            <br />
            Building amazing web experiences ✨
          </p>

          {/* Social Links */}
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className={styles.linksSection}>
          {links.map((link, index) => {
            const colorName = getLinkColor(index)
            return (
              <div key={index} className={styles.linkItem}>
                <div className={styles.linkCard}>
                  {isEditMode ? (
                    <div className={styles.linkButton}>
                      <div className={styles.linkContent}>
                        <div className={`${styles.linkIcon} ${styles[colorName]}`}>{link.icon}</div>
                        <div className={styles.linkText}>
                          <h3 className={styles.linkTitle}>{link.title}</h3>
                          <p className={styles.linkDescription}>{link.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <div className={styles.linkButton}>
                        <div className={styles.linkContent}>
                          <div className={`${styles.linkIcon} ${styles[colorName]}`}>{link.icon}</div>
                          <div className={styles.linkText}>
                            <h3 className={styles.linkTitle}>{link.title}</h3>
                            <p className={styles.linkDescription}>{link.description}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                </div>

                {isEditMode && (
                  <div className={styles.colorPicker}>
                    {colorOptions.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => updateLinkColor(index, color.name)}
                        className={`${styles.colorOption} ${styles[color.name]} ${
                          linkColors[index] === color.name ? styles.selected : ""
                        }`}
                        title={`Set ${color.name} color`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>Made with ❤️</p>
        </div>
      </div>
    </div>
  )
}
