import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <nav>
        <a href="/">
          <h1>Wonderland</h1>
        </a>
        <div className="connect-button">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
