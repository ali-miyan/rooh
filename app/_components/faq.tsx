"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is an abaya?",
    answer:
      "An abaya is a loose-fitting, full-length robe worn by women, traditionally in black. It's designed to provide modest coverage and is commonly worn in Middle Eastern and Islamic cultures. Modern abayas come in various colors, styles, and fabrics while maintaining their modest and elegant design.",
  },
  {
    id: "2",
    question: "Why buy abayas from ROOH vs. other abaya shops?",
    answer:
      "ROOH offers premium quality abayas crafted with attention to detail and authentic designs. We use high-quality fabrics, provide excellent customer service, offer a wide range of styles from traditional to contemporary, and ensure proper sizing. Our abayas are designed for comfort, durability, and elegance.",
  },
  {
    id: "3",
    question: "What materials are your abayas made from?",
    answer:
      "Our abayas are made from premium materials including high-quality crepe, chiffon, georgette, jersey, and cotton blends. We also offer luxury options in silk, organza, and embellished fabrics. All materials are carefully selected for comfort, breathability, and durability while maintaining the elegant drape of the garment.",
  },
  {
    id: "4",
    question: "Are your abayas available in different colours?",
    answer:
      "Yes! While traditional black abayas remain popular, we offer a beautiful range of colors including navy, burgundy, emerald, dusty rose, beige, grey, and seasonal colors. Our collection includes both solid colors and subtle patterns to suit different preferences and occasions.",
  },
  {
    id: "5",
    question: "Can non-Muslims wear abayas?",
    answer:
      "Abayas are beautiful, modest garments that can be worn by anyone who appreciates their elegant style and comfortable fit. Many non-Muslim women choose abayas for their versatility, comfort, and sophisticated appearance. They're perfect for various occasions and cultural settings.",
  },
  {
    id: "6",
    question: "Are abayas suitable for any occasion?",
    answer:
      "Yes, abayas are incredibly versatile! We offer different styles for various occasions: casual everyday abayas for daily wear, elegant embellished abayas for special events, prayer abayas for religious occasions, and formal abayas for professional settings. The key is choosing the right style and fabric for each occasion.",
  },
  {
    id: "7",
    question: "How should I care for my abaya?",
    answer:
      "Care instructions vary by fabric, but generally: hand wash or use gentle machine cycle with cold water, use mild detergent, avoid bleach, hang dry away from direct sunlight, and iron on low heat if needed. For embellished or delicate abayas, we recommend dry cleaning. Always check the care label for specific instructions.",
  },
  {
    id: "8",
    question: "How do I choose the right size abaya?",
    answer:
      "Abayas should fit comfortably with room for movement. Measure your height, bust, and shoulder width. The abaya should reach your ankles, have comfortable shoulder fit, and allow easy arm movement. Refer to our detailed size chart, and contact our customer service for personalized sizing assistance if needed.",
  },
  {
    id: "9",
    question: "Are abayas seasonal?",
    answer:
      "Abayas can be worn year-round, but fabric choice matters for comfort. Lightweight fabrics like chiffon and georgette are perfect for summer, while heavier crepes and jersey work well in cooler weather. We offer seasonal collections with appropriate fabrics and colors to ensure comfort in different climates.",
  },
  {
    id: "10",
    question: "What is the difference between an abaya and a jilbab?",
    answer:
      "While both are modest garments, abayas are typically loose-fitting robes that open in the front and are worn over regular clothes. Jilbabs are usually pullover-style garments that are worn as complete outfits. Abayas tend to be more flowing and elegant, while jilbabs are often more fitted and practical for daily activities.",
  },
]

interface FAQItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItemComponent({ item, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-neutral-200 last:border-b-0"
    >
      <motion.button
        whileHover={{ backgroundColor: "rgba(245, 245, 245, 0.5)" }}
        onClick={onToggle}
        className="w-full py-6 px-0 flex items-center justify-between text-left transition-colors duration-200 group"
      >
        <motion.h3
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
          className="text-base md:text-lg font-medium text-neutral-800 pr-4 group-hover:text-neutral-900 transition-colors duration-200"
        >
          {item.question}
        </motion.h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-neutral-600 group-hover:text-neutral-800 transition-colors duration-200" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pb-6 pr-10"
            >
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">{item.answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function AbayaFAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  return (
    <section className="w-full bg-white py-20 px-4 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white opacity-70 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Decorative Divider */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mb-6" />

        {/* Elegant Text */}
        <p className="text-xl md:text-1xl italic font-light text-neutral-600 leading-relaxed tracking-wide px-4">
          “Rooted in love, stitched with purpose — Rooh by Reja was born from the
          shared dream of two sisters who believed that modest fashion could be
          both soulful and statement-making. What began as a small, passion-fueled
          idea between us has grown into a community — a movement — where
          individuality is embraced, and elegance is redefined.”
        </p>

        {/* Decorative Flourish (optional) */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-400 text-2xl font-serif">
            ✦
          </div>
        </div>
      </div>
    </section>
  )
}