import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si'
import { socials } from '../data/content'
import './Socials.css'

const links = [
  { key: 'linkedin', href: socials.linkedin, label: 'LinkedIn', Icon: FaLinkedin, color: '#0a66c2' },
  { key: 'github', href: socials.github, label: 'GitHub', Icon: FaGithub, color: '#e7e9f0' },
  { key: 'leetcode', href: socials.leetcode, label: 'LeetCode', Icon: SiLeetcode, color: '#ffa116' },
  { key: 'gfg', href: socials.gfg, label: 'GeeksforGeeks', Icon: SiGeeksforgeeks, color: '#2f8d46' },
]

export default function Socials({ size = 'md' }) {
  return (
    <ul className={`socials socials-${size}`}>
      {links.map(({ key, href, label, Icon, color }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            style={{ '--hover': color }}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}
