import Socials from './Socials'
import { profile } from '../data/content'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-name grad-text">{profile.name}</p>
        <Socials size="sm" />
        <p className="footer-copy">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
